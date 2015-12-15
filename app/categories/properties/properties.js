/**
 * Created by al-jerreau on 2015/12/12.
 */
angular.module('categories.properties', [
    'categories.properties.create',
    'categories.properties.edit',
    'common.models.categories',
    'common.models.properties'
])
.config(function($stateProvider) {
    $stateProvider
        .state('categories.properties', {
            url: 'categories/:category',
            views: {
                'properties@': {
                    controller: 'PropertiesCtrl',
                    templateUrl: 'app/categories/properties/properties.tmpl.html'
                }
            }
        })
})
.controller('PropertiesCtrl', function($scope, $stateParams) {
    $scope.CurrentCategoryName = $stateParams.category;
})

;