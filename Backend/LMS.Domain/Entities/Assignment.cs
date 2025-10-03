using LMS.Domain.Common;

namespace LMS.Domain.Entities;

public class Assignment : BaseEntity
{
    public int CourseId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int TotalMarks { get; set; }
    public DateTime DueDate { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}

