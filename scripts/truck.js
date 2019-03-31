(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck (truck_id, datastore) {
    this.truck_id = truck_id;
    this.datastore = datastore;
  };

  Truck.prototype.createOrder = function (order) {
    this.datastore.add(order.email_address, order);
  };

  Truck.prototype.deliverOrder = function (email) {
    this.datastore.remove(email);
  };

  Truck.prototype.printOrders = function () {
    var email_array = Object.keys(this.datastore.getAll());

    console.log('Truck #' + this.truck_id + ' has pending orders:');
    email_array.forEach(function (email) {
      console.log(this.datastore.get(email));
    }.bind(this));
  }

  App.Truck = Truck;
  window.App = App;
})(window);
