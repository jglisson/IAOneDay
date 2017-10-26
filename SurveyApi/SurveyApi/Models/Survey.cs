using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApi.Models
{
    public enum SurveyResult
    {
        Poor,
        Fair,
        Good,
        Great
    }
    public class Survey
    {
        public DateTime SurveyDateTime { get; set; }
        public string ParticipantName { get; set; }
        public string EmailAddress { get; set; }
        public string Restaurant { get; set; }
        public SurveyResult FoodQuality { get; set; }
        public SurveyResult ServiceQuality { get; set; }
        public SurveyResult EnvironmentQuality { get; set; }
        public SurveyResult Overall { get; set; }
        public string Comments { get; set; }
    }
}