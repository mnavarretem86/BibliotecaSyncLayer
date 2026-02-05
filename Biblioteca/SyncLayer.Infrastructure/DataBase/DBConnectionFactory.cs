using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace SyncLayer.Infrastructure.DataBase
{
    public class DBConnectionFactory
    {

        private readonly string _connectionString;


        public DBConnectionFactory(string connectionString)
        {

            if (string.IsNullOrWhiteSpace(connectionString)) throw new ArgumentNullException("La cadena de conexión no puede estar vacía.");
            _connectionString = connectionString;
        }

        public SqlConnection CreateConnection() {

            return new SqlConnection(_connectionString);        
        }

    }
}
