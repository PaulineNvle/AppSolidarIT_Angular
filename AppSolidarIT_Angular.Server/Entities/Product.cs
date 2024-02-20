using System;
using System.Collections.Generic;

namespace AppSolidarIT_Angular.Server.Entities;

public partial class Product
{
    public int Id { get; set; }

    public string Label { get; set; } = null!;

    public int? ThemeId { get; set; }

    public string? DescriptionShort { get; set; }

    public string? DescriptionLong { get; set; }

    public virtual Theme? Theme { get; set; }
}
