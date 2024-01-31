using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppDatabase
{
  
        public interface IMigrationService
        {


        public void MigrateUp();

        public void MigrateDown();

        }

    public class MigrationService : IMigrationService
    {
        public void MigrateDown()
        {
            throw new NotImplementedException();
        }

        public void MigrateUp()
        {
            throw new NotImplementedException();
        }
    }


}
