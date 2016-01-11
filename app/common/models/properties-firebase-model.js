/**
 * Created by al-jerreau on 2015/12/12.
 */
angular.module('common.models.properties-firebase', [

])
.service('PropertiesModel', function($http, $q, $firebaseArray, $firebaseObject) {
    
    var model = this;

    var ref = new Firebase("https://simplecontent.firebaseio.com/properties");

    var properties;


    model.getProperties = function() {
        
        return properties = $firebaseArray(ref);

    }

    model.getPropertyById = function(propertyId) {
        var deferred = $q.defer();

        var property = properties.$getRecord(propertyId);

        if(property) {
            deferred.resolve(property);
        } else {
            deferred.resolve(null);
        }
        
        return deferred.promise;
    }

    model.createProperty = function(property) {

        properties.$add(property);

    }

    model.updateProperty = function(property) {

        properties.$save(property)
            .then(function(fire) {
                console.log(fire);
                fire.key() === properties.$id;
            })
            .finally(function() {
                console.log('finally')
            })
            .catch(function(error) {
                console.log('catch');
                console.log(error);
            });

    }

    model.deleteProperty = function(property) {

        _.remove(properties, function(p) {
            return p.id == property.id;
        });

    }

})
;