/**
 * Created by al-jerreau on 2015/12/12.
 */

angular.module('common.models.categories', [

])
.service('CategoriesModel', function($http, $q) {
    var model = this;
    var categories, currentCategory;
    var URLS = {
        FETCH: 'data/categories.json'
    }

    function extract(result) {
        return result.data;
    }

    function cacheCategories(result) {
        categories = extract(result);
        return categories;
    }

    model.getCategories = function() {
        return (categories) ? $q.when(categories) : $http.get(URLS.FETCH).then(cacheCategories);
    }

    model.setCurrentCategory =  function(categoryName) {
        return model.getCategoryByName(categoryName)
            .then(function(category) {
                currentCategory = category;
            });
    }

    model.getCurrentCategory = function() {
        return currentCategory;
    }

    model.getCurrentCategoryName = function() {
        return currentCategory ? currentCategory.name : '';
    }

    model.getCurrentCategoryId = function() {
        return currentCategory ? currentCategory.id: '';
    }

    model.getCategoryByName = function(categoryName) {
        var deferred = $q.defer();

        function findCategory() {
            return _.find(categories, function(c) {
                return c.name == categoryName;
            });
        }

        if(categories) {
            deferred.resolve(findCategory());
        } else {
            model.getCategories()
                .then(function() {
                    deferred.resolve(findCategory());
                });
        }

        return deferred.promise;
    }


})
;