using AppSolidarIT_Angular.Server.Entities;
using FirebirdSql.Data.Services;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace AppSolidarIT_Angular.Server.Services
{
    public class ProductService : IProductService

    {
    // HttpClient lifecycle management best practices:
    // https://learn.microsoft.com/dotnet/fundamentals/networking/http/httpclient-guidelines#recommended-use
    private static HttpClient sharedClient = new()
    {
        BaseAddress = new Uri("https://jsonplaceholder.typicode.com"),
    };
        private readonly PortfolioDbfirstContext _context;

        public ProductService(PortfolioDbfirstContext context)
        {
            _context = context;
        }


        



    }
}


//mdp a ne pas afficher clair