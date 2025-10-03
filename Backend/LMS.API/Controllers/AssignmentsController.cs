using LMS.Application.Contracts.Persistence;
using LMS.Application.DTOs.Common;
using LMS.Domain.Entities;
using LMS.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AssignmentsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public AssignmentsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("my-assignments")]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> GetMyAssignments()
    {
        var userId = User.FindFirstValue("uid");
        var submissions = await _unitOfWork.Submissions.GetSubmissionsByStudentAsync(userId!);

        var assignmentDtos = submissions.Select(s => new
        {
            s.Id,
            s.AssignmentId,
            Assignment = new
            {
                s.Assignment.Title,
                s.Assignment.Description,
                s.Assignment.TotalMarks,
                s.Assignment.DueDate,
                CourseName = s.Assignment.Course.Title
            },
            s.SubmittedDate,
            s.Grade,
            s.Feedback,
            s.Status
        }).ToList();

        return Ok(ResponseDto<object>.SuccessResponse(assignmentDtos));
    }

    [HttpPost("{assignmentId}/submit")]
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> SubmitAssignment(int assignmentId, [FromBody] SubmissionDto submissionDto)
    {
        var userId = User.FindFirstValue("uid");

        // Check if already submitted
        var existingSubmission = await _unitOfWork.Submissions
            .GetSubmissionByStudentAndAssignmentAsync(userId!, assignmentId);

        if (existingSubmission != null)
        {
            return BadRequest(ResponseDto<bool>.FailureResponse("Assignment already submitted"));
        }

        var assignment = await _unitOfWork.Assignments.GetByIdAsync(assignmentId);
        if (assignment == null)
        {
            return NotFound(ResponseDto<bool>.FailureResponse("Assignment not found"));
        }

        var submission = new Submission
        {
            AssignmentId = assignmentId,
            StudentId = userId!,
            FileUrl = submissionDto.FileUrl,
            Content = submissionDto.Content,
            SubmittedDate = DateTime.UtcNow,
            Status = SubmissionStatus.Submitted
        };

        await _unitOfWork.Submissions.AddAsync(submission);
        await _unitOfWork.SaveAsync();

        return Ok(ResponseDto<int>.SuccessResponse(submission.Id, "Assignment submitted successfully"));
    }
}

public class SubmissionDto
{
    public string? FileUrl { get; set; }
    public string? Content { get; set; }
}


