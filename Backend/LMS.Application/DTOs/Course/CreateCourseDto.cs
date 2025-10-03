using System.ComponentModel.DataAnnotations;
using LMS.Domain.Enums;

namespace LMS.Application.DTOs.Course;

public class CreateCourseDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    public string? ThumbnailUrl { get; set; }

    public DifficultyLevel DifficultyLevel { get; set; } = DifficultyLevel.Beginner;

    public decimal Price { get; set; } = 0;

    [Required]
    public int CategoryId { get; set; }

    public int Duration { get; set; }

    public string? Tags { get; set; }
}

