/**
 * Created by al-jerreau on 2015/12/12.
 */
angular.module('categories.properties', [
    'categories.properties.create',
    'categories.properties.edit',
    'common.models.categories',
    'common.models.properties-firebase'
])
.config(function($stateProvider) {
    $stateProvider
        .state('categories.properties', {
            url: 'categories/:category',
            views: {
                'properties@': {
                    controller: 'PropertiesListCtrl as propertiesListCtrl',
                    templateUrl: 'app/categories/properties/properties.tmpl.html'
                }
            }
        })
})
.controller('PropertiesListCtrl', function ($stateParams, PropertiesModel, CategoriesModel, $firebaseObject) {
    var propertiesListCtrl =  this;

    CategoriesModel.setCurrentCategory($stateParams.category);

    var properties = PropertiesModel.getProperties();

    properties.$loaded(function(p) {
        propertiesListCtrl.properties = properties;
    });

    propertiesListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
    propertiesListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
    propertiesListCtrl.getCurrentCategoryId = CategoriesModel.getCurrentCategoryId;
    propertiesListCtrl.deleteProperty = PropertiesModel.deleteProperty;
})
;