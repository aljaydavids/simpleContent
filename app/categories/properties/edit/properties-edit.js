/**
 * Created by al-jerreau on 2015/12/12.
 */
angular.module('categories.properties.edit', [

])
    .config(function($stateProvider) {
        $stateProvider
            .state('categories.properties.edit', {
                url: '/:propertyId/edit',
                templateUrl: 'app/categories/properties/edit/properties-edit.tmpl.html',
                controller: 'EditPropertiesCtrl as editPropertiesCtrl'
            })
    })
    .controller('EditPropertiesCtrl', function($state, $stateParams, PropertiesModel) {
        var editPropertiesCtrl = this;

        function returnToProperties() {
            return $state.go('categories.properties', {
                category: $stateParams.category
            });
        }

        function cancelEditing() {
            returnToProperties();
        }

        function updateProperty() {
            editPropertiesCtrl.property = angular.copy(editPropertiesCtrl.editedProperty);
            PropertiesModel.updateProperty(editPropertiesCtrl.property);
            returnToProperties();
        }

        PropertiesModel.getPropertyById($stateParams.propertyId)
            .then(function(property) {
                //if it finds the property make property available to update function, else go back to properties
                if(property) {
                    editPropertiesCtrl.property = property;
                    //copy the property into a new variable so that you don't mess up the original property in case there are issues with the update
                    editPropertiesCtrl.editedProperty = angular.copy(editPropertiesCtrl.property);
                } else {
                    returnToProperties();
                }
            });

        editPropertiesCtrl.cancelEditing = cancelEditing;
        editPropertiesCtrl.updateProperty = updateProperty;
    })
;