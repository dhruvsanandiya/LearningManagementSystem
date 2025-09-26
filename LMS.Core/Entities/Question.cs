using System.ComponentModel.DataAnnotations;

namespace LMS.Core.Entities;

public class Question : BaseEntity
{
    public int QuizId { get; set; }
    
    [Required]
    [MaxLength(1000)]
    public string QuestionText { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(500)]
    public string OptionA { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(500)]
    public string OptionB { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(500)]
    public string OptionC { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(500)]
    public string OptionD { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(1)]
    public string CorrectAnswer { get; set; } = string.Empty; // A, B, C, or D
    
    public int Points { get; set; } = 1;
    
    [MaxLength(500)]
    public string? Explanation { get; set; }
    
    // Navigation properties
    public virtual Quiz Quiz { get; set; } = null!;
}