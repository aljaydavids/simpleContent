/**
 * Created by al-jerreau on 2015/12/12.
 */
angular.module('common.models.properties', [

])
.service('PropertiesModel', function($http, $q) {
    var model = this;
    var properties;
    var URLS = {
        FETCH: 'data/properties.json'
    }

    function extract(result) {
        return result.data;
    }

    function cacheProperties(result) {
        properties = extract(result);
        return properties;
    }

    function findProperty(propertyId) {
        return _.find(properties, function(property) {
            return property.id === parseInt(propertyId, 10);
        })
    }

    model.getPropertyById =  function(propertyId) {
        var deferred = $q.defer();

        if(properties) {
            deferred.resolve(findProperty(propertyId));
        } else {
            model.getProperties().then(function() {
                deferred.resolve(findProperty(propertyId));
            });
        }

        return deferred.promise;
    }

    model.getProperties =  function() {
        var deferred = $q.defer();

        //if it has properties already just use it, without backend call
        if(properties) {
            deferred.resolve(properties);
        } else {
            // only make backend call to fetch properties if none exist
            $http.get(URLS.FETCH).then(function(properties) {
                deferred.resolve(cacheProperties(properties));
            });
        }

        return deferred.promise;
    }

    model.createProperty = function(property) {
        property.id = properties.length;
        properties.push(property);
    }

    model.updateProperty = function(property) {
        var index = _.findIndex(properties, function(p) {
            return p.id == property.id;
        });

        properties[index] = property;

    }

    model.deleteProperty = function(property) {
        _.remove(properties, function(p) {
            return p.id == property.id;
        });
    }
})
;