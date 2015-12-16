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
                    controller: 'CategoriesListCtrl as categoriesListCtrl',
                    templateUrl: 'app/categories/categories.tmpl.html'
                },
                'properties@': {
                    controller: 'PropertiesListCtrl as propertiesListCtrl',
                        templateUrl: 'app/categories/properties/properties.tmpl.html'
                }
            }
        })
})
.controller('CategoriesListCtrl', function CategoriesListCtrl(CategoriesModel) {
    var categoriesListCtrl = this;

    CategoriesModel.getCategories()
        .then(function(categories) {
            categoriesListCtrl.categories = categories;
        });
})
;