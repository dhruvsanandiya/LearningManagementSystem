using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Assignment : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int TotalMarks { get; set; }
    public DateTime DueDate { get; set; }
    public string? AttachmentUrls { get; set; } // JSON array of URLs
    public bool AllowLateSubmission { get; set; }
    public int? LatePenaltyPercentage { get; set; }
    
    // Foreign key
    public int CourseId { get; set; }
    
    // Navigation properties
    public Course Course { get; set; } = null!;
    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}
