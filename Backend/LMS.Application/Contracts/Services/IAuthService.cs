using LMS.Application.DTOs.Auth;
using LMS.Application.DTOs.Common;

namespace LMS.Application.Contracts.Services;

public interface IAuthService
{
    Task<ResponseDto<AuthResponseDto>> RegisterAsync(RegisterDto registerDto);
    Task<ResponseDto<AuthResponseDto>> LoginAsync(LoginDto loginDto);
    Task<ResponseDto<bool>> AssignRoleAsync(string userId, string role);
}

