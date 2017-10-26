using SurveyApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Azure.EventHubs;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure;
using Newtonsoft.Json;

namespace SurveyApi.Controllers
{
    public class SurveyController : ApiController
    {
        private static EventHubClient _eventHubClient;
        private string _eventHubConnectionString = CloudConfigurationManager.GetSetting("EventHubConnectionString");

        [HttpGet]
        [System.Web.Http.Route("Api/Ping")]
        public HttpResponseMessage Ping()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Hello World!");
        }
        [HttpPost]
        [System.Web.Http.Route("Api/Create")]
        public async Task<HttpResponseMessage> Create(Survey survey)
        {
            var json = JsonConvert.SerializeObject(survey);

            _eventHubClient = EventHubClient.CreateFromConnectionString(_eventHubConnectionString);
            await _eventHubClient.SendAsync(new EventData(Encoding.UTF8.GetBytes(json)));
            await _eventHubClient.CloseAsync();

            return Request.CreateResponse(HttpStatusCode.OK, survey);
        }
    }
}
