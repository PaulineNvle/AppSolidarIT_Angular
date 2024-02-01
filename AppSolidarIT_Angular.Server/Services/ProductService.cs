using AppSolidarIT_Angular.Server.Entities;
using FirebirdSql.Data.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace AppSolidarIT_Angular.Server.Services
{
    public class ProductService : IProductService

    {
        private readonly PortfolioDbfirstContext _context;

        public ProductService(PortfolioDbfirstContext context)
        {
            _context = context;
        }


        



    }
}


//mdp a ne pas afficher clair