using System;
using System.Collections.Generic;

namespace AppSolidarIT_Angular.Server.Entities;

public partial class Theme
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? DescriptionShort { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
