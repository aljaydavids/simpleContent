var app = angular.module('simpleContent', [
    'ngAnimate',
    'ui.router',
    'categories',
    'categories.properties'
])

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('simpleContent', {
            url: '',
            abstract: true
        });

    $urlRouterProvider.otherwise('/');
});