/**
 * Created by al-jerreau on 2015/12/12.
 */
angular.module('categories.properties.create', [
])
    .config(function($stateProvider) {
        $stateProvider
            .state('categories.properties.create', {
                url: '/properties/create',
                templateUrl: 'app/categories/properties/create/properties-create.tmpl.html',
                controller: 'CreatePropertiesCtrl as createPropertiesCtrl'
            })
    })
    .controller('CreatePropertiesCtrl', function($state, $stateParams, PropertiesModel, CategoriesModel) {
        var createPropertiesCtrl = this;

        function returnToProperties() {
            return $state.go('categories.properties', {
                category: $stateParams.category
            });
        }

        function cancelCreating() {
            returnToProperties();
        }

        function resetForm() {
            createPropertiesCtrl.newProperty = {
                name: '',
                value: '',
                category_id: CategoriesModel.getCurrentCategoryId()
            }
        }

        function createProperty(property) {
            PropertiesModel.createProperty(property);
            returnToProperties();
        }

        createPropertiesCtrl.cancelCreating = cancelCreating;
        createPropertiesCtrl.createProperty = createProperty;

        resetForm();
    })
;