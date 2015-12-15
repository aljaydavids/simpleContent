/**
 * Created by al-jerreau on 2015/12/12.
 */
angular.module('categories', [
    'common.models.categories'
])
.config(function($stateProvider) {
    $stateProvider
        .state('categories', {
            url: '/',
            views: {
                'categories@': {
                    controller: 'CategoriesCtrl',
                    templateUrl: 'app/categories/categories.tmpl.html'
                },
                'properties@': {
                    controller: 'PropertiesCtrl',
                        templateUrl: 'app/categories/properties/properties.tmpl.html'
                }
            }
        })
})
.controller('CategoriesCtrl', function($scope) {

})
;