var dataService = function ($q, $http, $log, httpService) {
    function _handleError(error) {
        $log.log(error);
    }

    return {
        getPing: function () {
            return $q(function (resolve, reject) {
                httpService.get('ping').then(function (result) {
                    resolve(result);
                }, function (error) {
                    reject(error);
                });
            });
        },
        createSurvey: function (survey) {
            return $q(function (resolve, reject) {
                httpService.post('createSurvey', survey).then(function (result) {
                    resolve(result);
                }, function (error) {
                    reject(error);
                });
            });
        }
    };
};


SurveyApp.factory("dataService", dataService);