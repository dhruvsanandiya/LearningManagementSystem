namespace LMS.Application.DTOs.Courses;

public class CourseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string DifficultyLevel { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Duration { get; set; }
    public bool IsFeatured { get; set; }
    public string TeacherName { get; set; } = string.Empty;
    public string CategoryName { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new();
    public int EnrollmentCount { get; set; }
    public decimal? AverageRating { get; set; }
}

public class CreateCourseDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public int DifficultyLevel { get; set; }
    public decimal Price { get; set; }
    public int Duration { get; set; }
    public string? Prerequisites { get; set; }
    public string? LearningObjectives { get; set; }
    public int CategoryId { get; set; }
    public List<int> TagIds { get; set; } = new();
}

public class UpdateCourseDto : CreateCourseDto
{
    public int Id { get; set; }
}
