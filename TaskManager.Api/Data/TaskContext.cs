using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Models;

namespace TaskManager.Api.Data
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options)
        {
        }

        public DbSet<TaskDto> TaskDtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskDto>()
                .HasKey(t => t.Id);

            modelBuilder.Entity<TaskDto>()
                .Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(100);
            modelBuilder.Entity<TaskDto>()
                .Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(300);
            modelBuilder.Entity<TaskDto>()
                .Property(t => t.DueDate)
                .IsRequired();
            modelBuilder.Entity<TaskDto>()
                .Property(t => t.IsCompleted)
                .IsRequired()
                .HasDefaultValue(false);
        }
    }
}
