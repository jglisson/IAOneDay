SurveyApp.controller("surveyController", ['$scope', '$rootScope', '$timeout', '$mdDialog', 'dataService',
    function ($scope, $rootScope, $timeout, $mdDialog, dataService) {
        var controller = this;

        controller.init = function () {
            controller.foodQuality = undefined;
            controller.serviceQuality = undefined;
            controller.environmentQuality = undefined;
            controller.overallQuality = undefined;
            controller.survey = {
                Restaurant: undefined,
                FoodQuality: 0,
                ServiceQuality: 0,
                EnvironmentQuality: 0,
                Overall: 0,
                ParticipantName: undefined,
                EmailAddress: undefined,
                Comments: undefined
            };
        };

        controller.valid = function () {
            return controller.foodQuality && controller.serviceQuality && controller.environmentQuality && controller.overallQuality && controller.survey.Restaurant && controller.survey.ParticipantName && controller.survey.EmailAddress && controller.survey.Comments;
        };

        controller.submit = function () {
            controller.saving = true;
            controller.survey.SurveyDateTime = new Date();
            controller.survey.FoodQuality = controller.foodQuality - 1;
            controller.survey.ServiceQuality = controller.serviceQuality - 1;
            controller.survey.EnvironmentQuality = controller.environmentQuality - 1; 
            controller.survey.Overall = controller.overallQuality - 1;
            dataService.createSurvey(controller.survey).then(function (result) {
                $timeout(function () {
                    controller.init();
                    controller.saving = false;
                    $scope.surveyForm.$setPristine();
                    $scope.surveyForm.$setUntouched();
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('.welcome-container')))
                            .clickOutsideToClose(true)
                            .title('Thank you!')
                            .textContent('Thank you for your feedback. And your email address. We especially appreciate that. We seriously cannot wait to creep on you. I can see you through your web cam right now. You have pretty eyes.')
                            .ariaLabel('Thank you')
                            .ok('Get me out of here!')
                    );
                }, 1500);
            }, function (error) {
                $timeout(function () {
                    controller.saving = false;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('.welcome-container')))
                            .clickOutsideToClose(true)
                            .title('Oops!')
                            .textContent('There was an error: ' + error.data.ExceptionMessage + '. You probably screwed up the form somehow. Yeah, definitely user error. Try again!')
                            .ariaLabel('Oops')
                            .ok("I'm sorry that I'm stupid")
                    );
                }, 1500);
            });
        };

        controller.init();
    }]);

