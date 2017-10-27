var SurveyApp = angular.module("SurveyApp", ['ngMaterial', 'ngAnimate', 'ngResource', 'jkAngularRatingStars']);

SurveyApp.config(['$mdThemingProvider',
    function ($mdThemingProvider) {

        $mdThemingProvider.definePalette('iaPalette', {
            '50': 'fbf5e9',
            '100': 'f4e7c7',
            '200': 'edd7a2',
            '300': 'e5c77d',
            '400': 'e0bb61',
            '500': 'daaf45',
            '600': 'd6a83e',
            '700': 'd09f36',
            '800': 'cb962e',
            '900': 'c2861f',
            'A100': 'fffdfa',
            'A200': 'ffe9c7',
            'A400': 'ffd594',
            'A700': 'ffcb7a',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('iaPalette')

    }]);


