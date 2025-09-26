namespace LMS.Core.Entities;

public class Enrollment : BaseEntity
{
    public int CourseId { get; set; }
    
    public string StudentId { get; set; } = string.Empty;
    
    public DateTime EnrolledDate { get; set; } = DateTime.UtcNow;
    
    public decimal Progress { get; set; } = 0; // Percentage 0-100
    
    public DateTime? CompletedDate { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public EnrollmentStatus Status { get; set; } = EnrollmentStatus.Active;
    
    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ApplicationUser Student { get; set; } = null!;
}