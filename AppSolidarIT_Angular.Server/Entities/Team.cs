using System;
using System.Collections.Generic;

namespace AppSolidarIT_Angular.Server.Entities;

public partial class Team
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int UserId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
