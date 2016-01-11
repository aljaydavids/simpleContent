function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('simpleContent', {
            url: '',
            abstract: true
        });

    $urlRouterProvider.otherwise('/');
}

angular.module('simpleContent', [
	'firebase',
    'ui.router',
    'categories',
    'categories.properties'
])
.config(config)
;