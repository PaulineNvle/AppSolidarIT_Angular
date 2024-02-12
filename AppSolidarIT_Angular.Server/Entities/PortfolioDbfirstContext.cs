using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AppSolidarIT_Angular.Server.Entities;

public partial class PortfolioDbfirstContext : DbContext
{
    public PortfolioDbfirstContext()
    {
    }

    public PortfolioDbfirstContext(DbContextOptions<PortfolioDbfirstContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Team> Teams { get; set; }

    public virtual DbSet<Theme> Themes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //    => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDb;Database=PortfolioDBFirst;Trusted_Connection=True;encrypt=false;TrustServerCertificate=true");

    }
      

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Product");

            entity.Property(e => e.DescriptionLong).IsUnicode(false);
            entity.Property(e => e.DescriptionShort)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Label)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Theme)
                .HasMaxLength(256)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Team>(entity =>
        {
            entity.ToTable("Team");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.Product).WithMany(p => p.Teams)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Team_Product");

            entity.HasOne(d => d.User).WithMany(p => p.Teams)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Team_User");
        });

        modelBuilder.Entity<Theme>(entity =>
        {
            entity.ToTable("Theme");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.DescriptionShort)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Name).IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Avatar).HasColumnType("image");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
