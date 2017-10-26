using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Azure.WebJobs.ServiceBus;
using Newtonsoft.Json;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;

namespace SurveyFunctionApp
{
    public static class ImportSurvey
    {
        [FunctionName("ImportSurvey")]
        public async static Task Run([EventHubTrigger("surveys", Connection = "eventHubConnectionString", ConsumerGroup = "$Default")]string survey, TraceWriter log)
        {
            log.Info($"C# Event Hub trigger function processed a message: {survey}");

            var oSurvey = JsonConvert.DeserializeObject<Survey>(survey);

            // Write survey to DocumentDB archive
            var cosmosDbUri = ConfigurationManager.AppSettings.Get("cosmosDbUri");
            var cosmosDbKey = ConfigurationManager.AppSettings.Get("cosmosDbKey");
            var cosmosDbName = ConfigurationManager.AppSettings.Get("cosmosDbName");
            var cosmosDbCollection = ConfigurationManager.AppSettings.Get("cosmosDbCollection");

            var client = new DocumentClient(new System.Uri(cosmosDbUri), cosmosDbKey);

            await client.CreateDatabaseIfNotExistsAsync(new Database { Id = cosmosDbName });
            await client.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri(cosmosDbName), new DocumentCollection { Id = cosmosDbCollection });
            await client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(cosmosDbName, cosmosDbCollection), oSurvey);

            // Write survey to Azure SQL database
            var sqlDbConnectionString = ConfigurationManager.ConnectionStrings["sqlDbConnectionString"].ConnectionString;
            using (var conn = new SqlConnection(sqlDbConnectionString))
            {
                var sql = $"INSERT INTO SurveyResult(SurveyDateTime, ParticipantName, EmailAddress, Restaurant, FoodQuality, ServiceQuality, EnvironmentQuality, Overall, Comments) VALUES(@SurveyDateTime, @ParticipantName, @EmailAddress, @Restaurant, @FoodQuality, @ServiceQuality, @EnvironmentQuality, @Overall, @Comments)";
                var cmd = new SqlCommand(sql, conn);
                cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter("@SurveyDateTime", oSurvey.SurveyDateTime));
                cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter("@ParticipantName", oSurvey.ParticipantName));
                cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter("@EmailAddress", oSurvey.EmailAddress));
                cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter("@Restaurant", oSurvey.Restaurant));
                cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter("@FoodQuality", oSurvey.FoodQuality));
                cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter("@ServiceQuality", oSurvey.ServiceQuality));
                cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter("@EnvironmentQuality", oSurvey.EnvironmentQuality));
                cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter("@Overall", oSurvey.Overall));
                cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter("@Comments", oSurvey.Comments));
                conn.Open();
                var result = await cmd.ExecuteNonQueryAsync();
                conn.Close();
            }
        }
    }
}
