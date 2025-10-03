using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LMS.Application.DTOs.Auth;
using LMS.Application.Interfaces;
using LMS.Domain.Entities;
using LMS.Domain.Enums;
using LMS.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace LMS.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IRepository<User> _userRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _configuration;

    public AuthService(
        IRepository<User> userRepository,
        IUnitOfWork unitOfWork,
        IConfiguration configuration)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        // Check if user exists
        var existingUsers = await _userRepository.FindAsync(u => u.Email == registerDto.Email);
        if (existingUsers.Any())
        {
            throw new Exception("User with this email already exists");
        }

        // Create password hash
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

        // Create user
        var user = new User
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Email = registerDto.Email,
            PasswordHash = passwordHash,
            Role = (UserRole)registerDto.Role,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        await _userRepository.AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        // Generate JWT token
        var token = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken();

        return new AuthResponseDto
        {
            Token = token,
            RefreshToken = refreshToken,
            Expiration = DateTime.UtcNow.AddDays(7),
            User = new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role.ToString(),
                ProfilePictureUrl = user.ProfilePictureUrl
            }
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        var users = await _userRepository.FindAsync(u => u.Email == loginDto.Email);
        var user = users.FirstOrDefault();

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        {
            throw new Exception("Invalid email or password");
        }

        if (!user.IsActive)
        {
            throw new Exception("User account is inactive");
        }

        user.LastLoginAt = DateTime.UtcNow;
        await _userRepository.UpdateAsync(user);
        await _unitOfWork.SaveChangesAsync();

        var token = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken();

        return new AuthResponseDto
        {
            Token = token,
            RefreshToken = refreshToken,
            Expiration = DateTime.UtcNow.AddDays(7),
            User = new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role.ToString(),
                ProfilePictureUrl = user.ProfilePictureUrl
            }
        };
    }

    public Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
    {
        // TODO: Implement refresh token logic
        throw new NotImplementedException();
    }

    public Task<bool> RevokeTokenAsync(string token)
    {
        // TODO: Implement token revocation
        throw new NotImplementedException();
    }

    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"] ?? throw new Exception("JWT Secret not configured"));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private string GenerateRefreshToken()
    {
        return Guid.NewGuid().ToString();
    }
}
