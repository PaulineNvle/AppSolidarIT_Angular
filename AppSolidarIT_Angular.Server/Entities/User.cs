using System;
using System.Collections.Generic;

namespace AppSolidarIT_Angular.Server.Entities;

public partial class User
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public byte[] Avatar { get; set; } = null!;

    public string? Email { get; set; }

    public string? Role { get; set; }

    public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
}
