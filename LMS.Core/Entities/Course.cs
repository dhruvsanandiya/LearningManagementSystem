using System.ComponentModel.DataAnnotations;
using LMS.Core.Enums;

namespace LMS.Core.Entities;

public class Course : BaseEntity
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    public string TeacherId { get; set; } = string.Empty;
    
    public int CategoryId { get; set; }
    
    [MaxLength(500)]
    public string? ThumbnailUrl { get; set; }
    
    public decimal Price { get; set; }
    
    public CourseStatus Status { get; set; } = CourseStatus.Draft;
    
    public DifficultyLevel DifficultyLevel { get; set; } = DifficultyLevel.Beginner;
    
    public int EstimatedHours { get; set; }
    
    [MaxLength(1000)]
    public string? Requirements { get; set; }
    
    [MaxLength(1000)]
    public string? WhatYouWillLearn { get; set; }
    
    // Navigation properties
    public virtual ApplicationUser Teacher { get; set; } = null!;
    public virtual Category Category { get; set; } = null!;
    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    public virtual ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public virtual ICollection<Discussion> Discussions { get; set; } = new List<Discussion>();
    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
}