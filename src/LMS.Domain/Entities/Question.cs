using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Question : BaseEntity
{
    public string QuestionText { get; set; } = string.Empty;
    public string OptionA { get; set; } = string.Empty;
    public string OptionB { get; set; } = string.Empty;
    public string OptionC { get; set; } = string.Empty;
    public string OptionD { get; set; } = string.Empty;
    public string CorrectAnswer { get; set; } = string.Empty; // A, B, C, or D
    public int Marks { get; set; }
    public string? Explanation { get; set; }
    
    // Foreign key
    public int QuizId { get; set; }
    
    // Navigation properties
    public Quiz Quiz { get; set; } = null!;
}
