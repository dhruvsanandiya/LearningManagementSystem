using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LMS.Application.Contracts.Services;
using LMS.Application.DTOs.Auth;
using LMS.Application.DTOs.Common;
using LMS.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace LMS.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }

    public async Task<ResponseDto<AuthResponseDto>> RegisterAsync(RegisterDto registerDto)
    {
        var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
        if (existingUser != null)
        {
            return ResponseDto<AuthResponseDto>.FailureResponse("User already exists");
        }

        var user = new ApplicationUser
        {
            Email = registerDto.Email,
            UserName = registerDto.Email,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            EmailConfirmed = true
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
        {
            return ResponseDto<AuthResponseDto>.FailureResponse(
                "Registration failed",
                result.Errors.Select(e => e.Description).ToList());
        }

        // Ensure role exists
        if (!await _roleManager.RoleExistsAsync(registerDto.Role))
        {
            await _roleManager.CreateAsync(new IdentityRole(registerDto.Role));
        }

        await _userManager.AddToRoleAsync(user, registerDto.Role);

        var token = await GenerateJwtToken(user);
        var roles = await _userManager.GetRolesAsync(user);

        var authResponse = new AuthResponseDto
        {
            UserId = user.Id,
            Email = user.Email!,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Token = token,
            Roles = roles.ToList()
        };

        return ResponseDto<AuthResponseDto>.SuccessResponse(authResponse, "Registration successful");
    }

    public async Task<ResponseDto<AuthResponseDto>> LoginAsync(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user == null)
        {
            return ResponseDto<AuthResponseDto>.FailureResponse("Invalid credentials");
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
        if (!isPasswordValid)
        {
            return ResponseDto<AuthResponseDto>.FailureResponse("Invalid credentials");
        }

        if (!user.IsActive)
        {
            return ResponseDto<AuthResponseDto>.FailureResponse("Account is inactive");
        }

        var token = await GenerateJwtToken(user);
        var roles = await _userManager.GetRolesAsync(user);

        var authResponse = new AuthResponseDto
        {
            UserId = user.Id,
            Email = user.Email!,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Token = token,
            Roles = roles.ToList()
        };

        return ResponseDto<AuthResponseDto>.SuccessResponse(authResponse, "Login successful");
    }

    public async Task<ResponseDto<bool>> AssignRoleAsync(string userId, string role)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return ResponseDto<bool>.FailureResponse("User not found");
        }

        if (!await _roleManager.RoleExistsAsync(role))
        {
            await _roleManager.CreateAsync(new IdentityRole(role));
        }

        var result = await _userManager.AddToRoleAsync(user, role);
        if (!result.Succeeded)
        {
            return ResponseDto<bool>.FailureResponse(
                "Role assignment failed",
                result.Errors.Select(e => e.Description).ToList());
        }

        return ResponseDto<bool>.SuccessResponse(true, "Role assigned successfully");
    }

    private async Task<string> GenerateJwtToken(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("uid", user.Id),
            new Claim("firstName", user.FirstName),
            new Claim("lastName", user.LastName)
        };

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"] ?? "YourSuperSecretKeyHere123456789"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

