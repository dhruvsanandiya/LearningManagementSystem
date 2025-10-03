using LMS.Application.DTOs.Common;
using LMS.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userId = User.FindFirstValue("uid");
        var user = await _userManager.FindByIdAsync(userId!);

        if (user == null)
        {
            return NotFound(ResponseDto<object>.FailureResponse("User not found"));
        }

        var roles = await _userManager.GetRolesAsync(user);

        var profileDto = new
        {
            user.Id,
            user.FirstName,
            user.LastName,
            user.Email,
            user.ProfileImageUrl,
            user.CreatedAt,
            user.IsActive,
            Roles = roles
        };

        return Ok(ResponseDto<object>.SuccessResponse(profileDto));
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updateDto)
    {
        var userId = User.FindFirstValue("uid");
        var user = await _userManager.FindByIdAsync(userId!);

        if (user == null)
        {
            return NotFound(ResponseDto<bool>.FailureResponse("User not found"));
        }

        user.FirstName = updateDto.FirstName;
        user.LastName = updateDto.LastName;
        user.ProfileImageUrl = updateDto.ProfileImageUrl;
        user.UpdatedAt = DateTime.UtcNow;

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            return BadRequest(ResponseDto<bool>.FailureResponse(
                "Update failed",
                result.Errors.Select(e => e.Description).ToList()));
        }

        return Ok(ResponseDto<bool>.SuccessResponse(true, "Profile updated successfully"));
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetUserStats()
    {
        // TODO: Implement comprehensive stats
        // This is a placeholder for future statistics
        return Ok(ResponseDto<object>.SuccessResponse(new
        {
            TotalEnrollments = 0,
            CompletedCourses = 0,
            TotalCertificates = 0,
            AverageProgress = 0
        }));
    }
}

public class UpdateProfileDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? ProfileImageUrl { get; set; }
}


