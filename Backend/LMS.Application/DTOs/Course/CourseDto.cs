using LMS.Domain.Enums;

namespace LMS.Application.DTOs.Course;

public class CourseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public DifficultyLevel DifficultyLevel { get; set; }
    public decimal Price { get; set; }
    public CourseStatus Status { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string TeacherId { get; set; } = string.Empty;
    public string TeacherName { get; set; } = string.Empty;
    public int Duration { get; set; }
    public string? Tags { get; set; }
    public int TotalLessons { get; set; }
    public int TotalEnrollments { get; set; }
    public DateTime CreatedAt { get; set; }
}

