SurveyApp.controller("surveyController", ['$scope', '$rootScope', 'dataService',
    function ($scope, $rootScope, dataService) {
        var controller = this;

        controller.survey = {
            Restaurant: "",
            FoodQuality: 0,
            ServiceQuality: 0,
            EnvironmentQuality: 0,
            Overall: 0,
            ParticipantName: '',
            EmailAddress: ''
        };
        controller.submit = function () {
            controller.survey.SurveyDateTime = new Date();
            controller.survey.FoodQuality = controller.foodQuality - 1;
            controller.survey.ServiceQuality = controller.serviceQuality - 1;
            controller.survey.EnvironmentQuality = controller.environmentQuality - 1; 
            controller.survey.Overall = controller.overallQuality - 1;
            dataService.createSurvey(controller.survey).then(function (result) {
                console.log("success");
            }, function (error) {
                console.log("error");
            });
        };

    }]);

