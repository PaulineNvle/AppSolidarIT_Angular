using ConsoleAppDatabase;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var configurationBuilder = new ConfigurationBuilder()
    .SetBasePath (Directory.GetCurrentDirectory ())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    ;


IConfiguration configuration = configurationBuilder.Build ();

var serviceCollection = new ServiceCollection()
    .AddTransient<IMigrationService, MigrationService> ()
    
    ;

var provider = serviceCollection.BuildServiceProvider();

var migrationService = provider.GetService<IMigrationService> ();

migrationService.MigrateUp(); // exec les migrations du projet