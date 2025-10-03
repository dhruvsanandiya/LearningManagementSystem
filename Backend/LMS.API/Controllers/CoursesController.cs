using LMS.Application.Contracts.Persistence;
using LMS.Application.DTOs.Common;
using LMS.Application.DTOs.Course;
using LMS.Domain.Entities;
using LMS.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CoursesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CoursesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllCourses()
    {
        var courses = await _unitOfWork.Courses.GetPublishedCoursesAsync();
        
        var courseDtos = courses.Select(c => new CourseDto
        {
            Id = c.Id,
            Title = c.Title,
            Description = c.Description,
            ThumbnailUrl = c.ThumbnailUrl,
            DifficultyLevel = c.DifficultyLevel,
            Price = c.Price,
            Status = c.Status,
            CategoryId = c.CategoryId,
            CategoryName = c.Category?.Name ?? "",
            TeacherId = c.TeacherId,
            TeacherName = $"{c.Teacher?.FirstName} {c.Teacher?.LastName}",
            Duration = c.Duration,
            Tags = c.Tags,
            TotalLessons = c.Lessons?.Count ?? 0,
            TotalEnrollments = c.Enrollments?.Count ?? 0,
            CreatedAt = c.CreatedAt
        }).ToList();

        return Ok(ResponseDto<List<CourseDto>>.SuccessResponse(courseDtos));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourseById(int id)
    {
        var course = await _unitOfWork.Courses.GetCourseWithDetailsAsync(id);
        
        if (course == null)
            return NotFound(ResponseDto<CourseDto>.FailureResponse("Course not found"));

        var courseDto = new CourseDto
        {
            Id = course.Id,
            Title = course.Title,
            Description = course.Description,
            ThumbnailUrl = course.ThumbnailUrl,
            DifficultyLevel = course.DifficultyLevel,
            Price = course.Price,
            Status = course.Status,
            CategoryId = course.CategoryId,
            CategoryName = course.Category?.Name ?? "",
            TeacherId = course.TeacherId,
            TeacherName = $"{course.Teacher?.FirstName} {course.Teacher?.LastName}",
            Duration = course.Duration,
            Tags = course.Tags,
            TotalLessons = course.Lessons?.Count ?? 0,
            TotalEnrollments = course.Enrollments?.Count ?? 0,
            CreatedAt = course.CreatedAt
        };

        return Ok(ResponseDto<CourseDto>.SuccessResponse(courseDto));
    }

    [HttpPost]
    [Authorize(Roles = "Teacher,Admin")]
    public async Task<IActionResult> CreateCourse([FromBody] CreateCourseDto createCourseDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = User.FindFirstValue("uid");
        
        var course = new Course
        {
            Title = createCourseDto.Title,
            Description = createCourseDto.Description,
            ThumbnailUrl = createCourseDto.ThumbnailUrl,
            DifficultyLevel = createCourseDto.DifficultyLevel,
            Price = createCourseDto.Price,
            CategoryId = createCourseDto.CategoryId,
            TeacherId = userId!,
            Duration = createCourseDto.Duration,
            Tags = createCourseDto.Tags,
            Status = CourseStatus.Draft
        };

        await _unitOfWork.Courses.AddAsync(course);
        await _unitOfWork.SaveAsync();

        return CreatedAtAction(nameof(GetCourseById), new { id = course.Id }, 
            ResponseDto<int>.SuccessResponse(course.Id, "Course created successfully"));
    }

    [HttpGet("my-courses")]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> GetMyCourses()
    {
        var userId = User.FindFirstValue("uid");
        var courses = await _unitOfWork.Courses.GetCoursesByTeacherAsync(userId!);

        var courseDtos = courses.Select(c => new CourseDto
        {
            Id = c.Id,
            Title = c.Title,
            Description = c.Description,
            ThumbnailUrl = c.ThumbnailUrl,
            DifficultyLevel = c.DifficultyLevel,
            Price = c.Price,
            Status = c.Status,
            CategoryId = c.CategoryId,
            CategoryName = c.Category?.Name ?? "",
            TeacherId = c.TeacherId,
            Duration = c.Duration,
            Tags = c.Tags,
            TotalLessons = c.Lessons?.Count ?? 0,
            CreatedAt = c.CreatedAt
        }).ToList();

        return Ok(ResponseDto<List<CourseDto>>.SuccessResponse(courseDtos));
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateCourseStatus(int id, [FromQuery] CourseStatus status)
    {
        var course = await _unitOfWork.Courses.GetByIdAsync(id);
        
        if (course == null)
            return NotFound(ResponseDto<bool>.FailureResponse("Course not found"));

        course.Status = status;
        course.UpdatedAt = DateTime.UtcNow;
        
        await _unitOfWork.Courses.UpdateAsync(course);
        await _unitOfWork.SaveAsync();

        return Ok(ResponseDto<bool>.SuccessResponse(true, "Course status updated successfully"));
    }
}

