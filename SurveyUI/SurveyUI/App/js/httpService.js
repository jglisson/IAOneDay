var httpService = function ($resource, $http, $q, $log) {
    var resourceMap = {};

    var _environmentPath = 'http://iaonedayapi-jmorris.azurewebsites.net/';
    //var _environmentPath = 'http://localhost:21996/';

    resourceMap.pint = $resource(_environmentPath + 'api/ping');
    resourceMap.createSurvey = $resource(_environmentPath + 'api/create');
    return {
        post: function (action, data, resolve, reject) {
            return $q(function (resolve, reject) {
                resourceMap[action].save(data).$promise.then(function (r) {
                    $log.debug('API POST success -' + action);
                    resolve(r);
                }, function (jqXHR, textStatus) {
                    $log.error('API POST failed -' + action + ', ' + textStatus);
                    reject(jqXHR, textStatus);
                })
            });
        },
        postWithParams: function (action, data, params, resolve, reject) {
            return $q(function (resolve, reject) {
                resourceMap[action].save(params, data).$promise.then(function (r) {
                    $log.debug('API POST success -' + action);
                    resolve(r);
                }, function (jqXHR, textStatus) {
                    $log.error('API POST failed -' + action + ', ' + textStatus);
                    reject(jqXHR, textStatus);
                })
            });
        },
        patch: function (action, params, data, resolve, reject) {
            return $q(function (resolve, reject) {
                resourceMap[action].patch(params, data).$promise.then(function (r) {
                    $log.debug('API PATCH success -' + action);
                    resolve(r);
                }, function (jqXHR, textStatus) {
                    $log.error('API PATCH failed -' + action + ', ' + textStatus);
                    reject(jqXHR, textStatus);
                })
            });
        },
        getArray: function (action, data, resolve, reject) {
            return $q(function (resolve, reject) {
                resourceMap[action].query(data).$promise.then(function (r) {
                    $log.debug('API GETArray success for ' + action);
                    resolve(r)
                }, function (jqXHR, textStatus) {
                    $log.error('API GETArray failed -' + action + ', ' + textStatus);
                    reject(jqXHR, textStatus);
                });
            });
        },
        get: function (action, data, resolve, reject) {
            return $q(function (resolve, reject) {
                resourceMap[action].get(data).$promise.then(function (r) {
                    $log.debug('API GET success for ' + action);
                    resolve(r)
                }, function (jqXHR, textStatus) {
                    $log.error('API POST failed -' + action + ', ' + textStatus);
                    reject(jqXHR, textStatus);
                });
            });
        },
        delete: function (action, data, resolve, reject) {
            return $q(function (resolve, reject) {
                resourceMap[action].delete(data).$promise.then(function (r) {
                    $log.debug('API GET success for ' + action);
                    resolve(r)
                }, function (jqXHR, textStatus) {
                    $log.error('API POST failed -' + action + ', ' + textStatus);
                    reject(jqXHR, textStatus);
                });
            });
        },
    };
}

SurveyApp.factory("httpService", httpService);