using System;
using System.Collections.Generic;

namespace AppSolidarIT_Angular.Server.Entities;

public partial class Product
{
    public int Id { get; set; }

    public string Label { get; set; } = null!;

    public string? Description { get; set; }

    public string? Theme { get; set; }

    public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
}
