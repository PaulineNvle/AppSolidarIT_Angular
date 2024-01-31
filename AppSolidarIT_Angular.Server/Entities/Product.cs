using System;
using System.Collections.Generic;

namespace AppSolidarIT_Angular.Server.Entities;

public partial class Product
{
    public int Id { get; set; }

    public string Label { get; set; } = null!;

    public string? Theme { get; set; }

    public string? DescriptionShort { get; set; }

    public string? DescriptionLong { get; set; }

    public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
}
