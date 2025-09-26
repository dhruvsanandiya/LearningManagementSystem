namespace LMS.Core.Entities;

public enum SubmissionStatus
{
    Submitted = 0,
    Graded = 1,
    Returned = 2,
    Late = 3
}

public enum EnrollmentStatus
{
    Active = 0,
    Completed = 1,
    Dropped = 2,
    Suspended = 3
}