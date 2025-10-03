using LMS.Application.DTOs.Auth;
using LMS.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            if (registerDto.Password != registerDto.ConfirmPassword)
            {
                return BadRequest(new { message = "Passwords do not match" });
            }

            var result = await _authService.RegisterAsync(registerDto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during registration");
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
    {
        try
        {
            var result = await _authService.LoginAsync(loginDto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login");
            return Unauthorized(new { message = ex.Message });
        }
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<AuthResponseDto>> RefreshToken([FromBody] string refreshToken)
    {
        try
        {
            var result = await _authService.RefreshTokenAsync(refreshToken);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing token");
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("revoke-token")]
    public async Task<ActionResult<bool>> RevokeToken([FromBody] string token)
    {
        try
        {
            var result = await _authService.RevokeTokenAsync(token);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking token");
            return BadRequest(new { message = ex.Message });
        }
    }
}
