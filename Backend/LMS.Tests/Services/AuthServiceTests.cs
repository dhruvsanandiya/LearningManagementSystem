using LMS.Application.DTOs.Auth;
using LMS.Domain.Entities;
using LMS.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;
using FluentAssertions;

namespace LMS.Tests.Services;

public class AuthServiceTests
{
    private readonly Mock<UserManager<ApplicationUser>> _userManagerMock;
    private readonly Mock<RoleManager<IdentityRole>> _roleManagerMock;
    private readonly Mock<IConfiguration> _configurationMock;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        var userStore = new Mock<IUserStore<ApplicationUser>>();
        _userManagerMock = new Mock<UserManager<ApplicationUser>>(
            userStore.Object, null!, null!, null!, null!, null!, null!, null!, null!);

        var roleStore = new Mock<IRoleStore<IdentityRole>>();
        _roleManagerMock = new Mock<RoleManager<IdentityRole>>(
            roleStore.Object, null!, null!, null!, null!);

        _configurationMock = new Mock<IConfiguration>();
        _configurationMock.Setup(c => c["JWT:Secret"]).Returns("YourSuperSecretKeyForJWTTokenGeneration123456789");
        _configurationMock.Setup(c => c["JWT:ValidIssuer"]).Returns("LMS_API");
        _configurationMock.Setup(c => c["JWT:ValidAudience"]).Returns("LMS_Client");

        _authService = new AuthService(_userManagerMock.Object, _roleManagerMock.Object, _configurationMock.Object);
    }

    [Fact]
    public async Task RegisterAsync_WithValidData_ShouldReturnSuccess()
    {
        // Arrange
        var registerDto = new RegisterDto
        {
            Email = "test@example.com",
            Password = "Test@123",
            FirstName = "John",
            LastName = "Doe",
            Role = "Student"
        };

        _userManagerMock.Setup(x => x.FindByEmailAsync(registerDto.Email))
            .ReturnsAsync((ApplicationUser?)null);

        _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), registerDto.Password))
            .ReturnsAsync(IdentityResult.Success);

        _roleManagerMock.Setup(x => x.RoleExistsAsync(registerDto.Role))
            .ReturnsAsync(true);

        _userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), registerDto.Role))
            .ReturnsAsync(IdentityResult.Success);

        _userManagerMock.Setup(x => x.GetRolesAsync(It.IsAny<ApplicationUser>()))
            .ReturnsAsync(new List<string> { registerDto.Role });

        // Act
        var result = await _authService.RegisterAsync(registerDto);

        // Assert
        result.Success.Should().BeTrue();
        result.Data.Should().NotBeNull();
        result.Data!.Email.Should().Be(registerDto.Email);
    }

    [Fact]
    public async Task RegisterAsync_WithExistingUser_ShouldReturnFailure()
    {
        // Arrange
        var registerDto = new RegisterDto
        {
            Email = "existing@example.com",
            Password = "Test@123",
            FirstName = "John",
            LastName = "Doe",
            Role = "Student"
        };

        var existingUser = new ApplicationUser { Email = registerDto.Email };

        _userManagerMock.Setup(x => x.FindByEmailAsync(registerDto.Email))
            .ReturnsAsync(existingUser);

        // Act
        var result = await _authService.RegisterAsync(registerDto);

        // Assert
        result.Success.Should().BeFalse();
        result.Message.Should().Be("User already exists");
    }

    [Fact]
    public async Task LoginAsync_WithValidCredentials_ShouldReturnSuccess()
    {
        // Arrange
        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = "Test@123"
        };

        var user = new ApplicationUser
        {
            Id = "123",
            Email = loginDto.Email,
            FirstName = "John",
            LastName = "Doe",
            IsActive = true
        };

        _userManagerMock.Setup(x => x.FindByEmailAsync(loginDto.Email))
            .ReturnsAsync(user);

        _userManagerMock.Setup(x => x.CheckPasswordAsync(user, loginDto.Password))
            .ReturnsAsync(true);

        _userManagerMock.Setup(x => x.GetRolesAsync(user))
            .ReturnsAsync(new List<string> { "Student" });

        // Act
        var result = await _authService.LoginAsync(loginDto);

        // Assert
        result.Success.Should().BeTrue();
        result.Data.Should().NotBeNull();
        result.Data!.Email.Should().Be(loginDto.Email);
        result.Data.Token.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task LoginAsync_WithInvalidCredentials_ShouldReturnFailure()
    {
        // Arrange
        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = "WrongPassword"
        };

        _userManagerMock.Setup(x => x.FindByEmailAsync(loginDto.Email))
            .ReturnsAsync((ApplicationUser?)null);

        // Act
        var result = await _authService.LoginAsync(loginDto);

        // Assert
        result.Success.Should().BeFalse();
        result.Message.Should().Be("Invalid credentials");
    }
}

