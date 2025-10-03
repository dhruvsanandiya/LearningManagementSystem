using LMS.Application.Contracts.Persistence;
using LMS.Application.DTOs.Common;
using LMS.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EnrollmentsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public EnrollmentsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("my-enrollments")]
    public async Task<IActionResult> GetMyEnrollments()
    {
        var userId = User.FindFirstValue("uid");
        var enrollments = await _unitOfWork.Enrollments.GetEnrollmentsByStudentAsync(userId!);

        var enrollmentDtos = enrollments.Select(e => new
        {
            e.Id,
            e.CourseId,
            e.Progress,
            e.IsCompleted,
            e.EnrolledDate,
            e.CompletedDate,
            Course = new
            {
                e.Course.Id,
                e.Course.Title,
                e.Course.Description,
                e.Course.ThumbnailUrl,
                e.Course.Duration,
                TeacherName = $"{e.Course.Teacher.FirstName} {e.Course.Teacher.LastName}",
                TotalLessons = e.Course.Lessons.Count,
                CategoryName = e.Course.Category.Name
            }
        }).ToList();

        return Ok(ResponseDto<object>.SuccessResponse(enrollmentDtos));
    }

    [HttpPost("enroll/{courseId}")]
    public async Task<IActionResult> EnrollInCourse(int courseId)
    {
        var userId = User.FindFirstValue("uid");

        // Check if already enrolled
        var existingEnrollment = await _unitOfWork.Enrollments
            .GetEnrollmentByStudentAndCourseAsync(userId!, courseId);

        if (existingEnrollment != null)
        {
            return BadRequest(ResponseDto<bool>.FailureResponse("Already enrolled in this course"));
        }

        // Check if course exists and is published
        var course = await _unitOfWork.Courses.GetByIdAsync(courseId);
        if (course == null)
        {
            return NotFound(ResponseDto<bool>.FailureResponse("Course not found"));
        }

        var enrollment = new Enrollment
        {
            CourseId = courseId,
            StudentId = userId!,
            EnrolledDate = DateTime.UtcNow,
            Progress = 0,
            IsCompleted = false
        };

        await _unitOfWork.Enrollments.AddAsync(enrollment);
        await _unitOfWork.SaveAsync();

        return Ok(ResponseDto<int>.SuccessResponse(enrollment.Id, "Successfully enrolled in course"));
    }

    [HttpGet("{enrollmentId}/progress")]
    public async Task<IActionResult> GetEnrollmentProgress(int enrollmentId)
    {
        var userId = User.FindFirstValue("uid");
        var enrollment = await _unitOfWork.Enrollments.GetByIdAsync(enrollmentId);

        if (enrollment == null || enrollment.StudentId != userId)
        {
            return NotFound(ResponseDto<object>.FailureResponse("Enrollment not found"));
        }

        var lessonProgresses = await _unitOfWork.LessonProgresses.GetProgressByEnrollmentAsync(enrollmentId);

        return Ok(ResponseDto<object>.SuccessResponse(new
        {
            enrollment.Progress,
            enrollment.IsCompleted,
            LessonProgresses = lessonProgresses
        }));
    }

    [HttpPost("{enrollmentId}/lessons/{lessonId}/complete")]
    public async Task<IActionResult> MarkLessonComplete(int enrollmentId, int lessonId)
    {
        var userId = User.FindFirstValue("uid");
        var enrollment = await _unitOfWork.Enrollments.GetByIdAsync(enrollmentId);

        if (enrollment == null || enrollment.StudentId != userId)
        {
            return NotFound(ResponseDto<bool>.FailureResponse("Enrollment not found"));
        }

        // Check if lesson progress already exists
        var existingProgress = (await _unitOfWork.LessonProgresses.GetProgressByEnrollmentAsync(enrollmentId))
            .FirstOrDefault(lp => lp.LessonId == lessonId);

        if (existingProgress == null)
        {
            var lessonProgress = new LessonProgress
            {
                EnrollmentId = enrollmentId,
                LessonId = lessonId,
                IsCompleted = true,
                CompletedDate = DateTime.UtcNow
            };

            await _unitOfWork.LessonProgresses.AddAsync(lessonProgress);
        }
        else if (!existingProgress.IsCompleted)
        {
            existingProgress.IsCompleted = true;
            existingProgress.CompletedDate = DateTime.UtcNow;
            await _unitOfWork.LessonProgresses.UpdateAsync(existingProgress);
        }

        // Recalculate enrollment progress
        var allLessons = await _unitOfWork.Lessons.GetLessonsByCourseAsync(enrollment.CourseId);
        var completedLessons = (await _unitOfWork.LessonProgresses.GetProgressByEnrollmentAsync(enrollmentId))
            .Count(lp => lp.IsCompleted);

        enrollment.Progress = allLessons.Count > 0 
            ? (decimal)completedLessons / allLessons.Count * 100 
            : 0;

        if (enrollment.Progress >= 100)
        {
            enrollment.IsCompleted = true;
            enrollment.CompletedDate = DateTime.UtcNow;
        }

        enrollment.UpdatedAt = DateTime.UtcNow;
        await _unitOfWork.Enrollments.UpdateAsync(enrollment);
        await _unitOfWork.SaveAsync();

        return Ok(ResponseDto<bool>.SuccessResponse(true, "Lesson marked as complete"));
    }
}


