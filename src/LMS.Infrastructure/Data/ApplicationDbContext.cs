using System.Reflection;
using LMS.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // DbSets
    public new DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<CourseTag> CourseTags { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<QuizAttempt> QuizAttempts { get; set; }
    public DbSet<Assignment> Assignments { get; set; }
    public DbSet<Submission> Submissions { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<LessonProgress> LessonProgresses { get; set; }
    public DbSet<Certificate> Certificates { get; set; }
    public DbSet<Discussion> Discussions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply configurations from assembly
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        // Configure CourseTag (Many-to-Many)
        modelBuilder.Entity<CourseTag>()
            .HasKey(ct => new { ct.CourseId, ct.TagId });

        modelBuilder.Entity<CourseTag>()
            .HasOne(ct => ct.Course)
            .WithMany(c => c.CourseTags)
            .HasForeignKey(ct => ct.CourseId);

        modelBuilder.Entity<CourseTag>()
            .HasOne(ct => ct.Tag)
            .WithMany(t => t.CourseTags)
            .HasForeignKey(ct => ct.TagId);

        // Configure Discussion self-referencing relationship
        modelBuilder.Entity<Discussion>()
            .HasOne(d => d.Parent)
            .WithMany(d => d.Replies)
            .HasForeignKey(d => d.ParentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure Submission relationship to avoid multiple cascade paths
        modelBuilder.Entity<Submission>()
            .HasOne(s => s.Student)
            .WithMany(u => u.Submissions)
            .HasForeignKey(s => s.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure QuizAttempt relationship
        modelBuilder.Entity<QuizAttempt>()
            .HasOne(qa => qa.Student)
            .WithMany(u => u.QuizAttempts)
            .HasForeignKey(qa => qa.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure Enrollment relationship
        modelBuilder.Entity<Enrollment>()
            .HasOne(e => e.Student)
            .WithMany(u => u.Enrollments)
            .HasForeignKey(e => e.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure Certificate relationship
        modelBuilder.Entity<Certificate>()
            .HasOne(c => c.Student)
            .WithMany(u => u.Certificates)
            .HasForeignKey(c => c.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure Discussion relationship
        modelBuilder.Entity<Discussion>()
            .HasOne(d => d.User)
            .WithMany(u => u.Discussions)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure Course-Teacher relationship
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Teacher)
            .WithMany(u => u.CoursesCreated)
            .HasForeignKey(c => c.TeacherId)
            .OnDelete(DeleteBehavior.Restrict);

        // Add indexes
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Course>()
            .HasIndex(c => c.Status);

        modelBuilder.Entity<Enrollment>()
            .HasIndex(e => new { e.CourseId, e.StudentId })
            .IsUnique();

        // Global query filters for soft delete
        modelBuilder.Entity<User>().HasQueryFilter(u => !u.IsDeleted);
        modelBuilder.Entity<Course>().HasQueryFilter(c => !c.IsDeleted);
        modelBuilder.Entity<Lesson>().HasQueryFilter(l => !l.IsDeleted);
        modelBuilder.Entity<Quiz>().HasQueryFilter(q => !q.IsDeleted);
        modelBuilder.Entity<Assignment>().HasQueryFilter(a => !a.IsDeleted);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.Entity is Domain.Common.BaseEntity baseEntity)
            {
                if (entry.State == EntityState.Added)
                {
                    baseEntity.CreatedAt = DateTime.UtcNow;
                }
                else
                {
                    baseEntity.UpdatedAt = DateTime.UtcNow;
                }
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
