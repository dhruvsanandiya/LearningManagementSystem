using LMS.Domain.Common;
using LMS.Domain.Enums;

namespace LMS.Domain.Entities;

public class User : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string? Bio { get; set; }
    public UserRole Role { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? LastLoginAt { get; set; }
    
    // Navigation properties
    public ICollection<Course> CoursesCreated { get; set; } = new List<Course>();
    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    public ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
    public ICollection<Discussion> Discussions { get; set; } = new List<Discussion>();
    public ICollection<QuizAttempt> QuizAttempts { get; set; } = new List<QuizAttempt>();
}
