var app = angular.module('simpleContent', [
    'ui.router',
    'categories',
    'categories.properties'
])

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '',
            abstract: true
        });

    $urlRouterProvider.otherwise('/');
});

app.controller('MainCtrl', function($scope, $state) {
    $scope.categories = [
        {'id': 0, 'name': 'strings'},
        {'id': 1, 'name': 'messages'},
        {'id': 2, 'name': 'links'}
    ];

    $scope.properties = [
        {'id': 0, 'name': 'about_us', value: 'About Us', 'category_id': 0},
        {'id': 1, 'name': 'terms_and_conditions', value: 'Terms and Conditions', 'category_id': 1},
        {'id': 2, 'name': 'about_us_link', value: 'http://www.example.com/about', 'category_id': 2}
    ];

    $scope.currentCategory = null;

    function setCurrentCategory(category) {
        $scope.currentCategory =  category;

        $state.go('categories.properties', {
            category: category.name
        });

        cancelCreating();
        cancelEditing();
    }

    function isCurrentCategory(category) {
        return $scope.currentCategory !== null &&  category.id === $scope.currentCategory.id;
    }

    /**
     * Crud
     */
    function resetCreateForm() {
        $scope.newProperty = {
            name: '',
            value: '',
            category_id: $scope.currentCategory.id
        }
    }

    function createProperty(property) {
        property.id = $scope.properties.length;

        $scope.properties.push(property);

        resetCreateForm();
    }

    $scope.createProperty = createProperty;

    $scope.editedProperty = null;

    function setEditedProperty(property) {
        $scope.editedProperty = angular.copy(property);
    }

    function updateProperty(property) {
        var index = _.findIndex($scope.properties, function(i) {
            return i.id == property.id;
        });

        $scope.properties[index] = property;

        $scope.editedProperty = null;
        $scope.isEditing = false;
    }

    function isSelectedProperty(propertyId) {
        return $scope.editedProperty !== null && $scope.editedProperty.id === propertyId;
    }

    function deleteProperty(property) {
        _.remove($scope.properties, function(i) {
            return i.id == property.id;
        });
    }

    $scope.setEditedProperty = setEditedProperty;
    $scope.updateProperty = updateProperty;
    $scope.isSelectedProperty = isSelectedProperty;
    $scope.deleteProperty = deleteProperty;

    /**
     * showing and hiding the inputs
     */

    $scope.isCreating = false;
    $scope.isEditing = false;

    function startCreating() {
        $scope.isCreating = true;
        $scope.isEditing = false;

        resetCreateForm();
    }

    function cancelCreating() {
        $scope.isCreating = false;
    }

    function startEditing() {
        $scope.isCreating = false;
        $scope.isEditing = true;
    }

    function cancelEditing() {
        $scope.isEditing = false;
    }

    function shouldShowCreating() {
        return $scope.currentCategory && !$scope.isEditing;
    }

    function shouldShowEditing() {
        return $scope.isEditing && !$scope.isCreating;
    }

    $scope.setCurrentCategory = setCurrentCategory;
    $scope.isCurrentCategory = isCurrentCategory;

    $scope.startCreating = startCreating;
    $scope.cancelCreating = cancelCreating;
    $scope.startEditing = startEditing;
    $scope.cancelEditing = cancelEditing;
    $scope.shouldShowCreating = shouldShowCreating;
    $scope.shouldShowEditing = shouldShowEditing;


});