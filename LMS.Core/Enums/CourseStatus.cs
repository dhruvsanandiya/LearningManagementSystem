namespace LMS.Core.Enums;

public enum CourseStatus
{
    Draft = 0,
    PendingApproval = 1,
    Approved = 2,
    Rejected = 3,
    Archived = 4
}

public enum DifficultyLevel
{
    Beginner = 0,
    Intermediate = 1,
    Advanced = 2,
    Expert = 3
}

public enum LessonType
{
    Video = 0,
    Document = 1,
    Audio = 2,
    Text = 3,
    Interactive = 4
}