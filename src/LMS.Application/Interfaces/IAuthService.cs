using LMS.Application.DTOs.Auth;

namespace LMS.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
    Task<bool> RevokeTokenAsync(string token);
}
