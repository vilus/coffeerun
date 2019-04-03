(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck (truck_id, datastore) {
    this.truck_id = truck_id;
    this.datastore = datastore;
  };

  Truck.prototype.createOrder = function (order) {
    return this.datastore.add(order.email_address, order);
  };

  Truck.prototype.deliverOrder = function (email) {
    return this.datastore.remove(email);
  };

  Truck.prototype.printOrders = function (print_fn) {
    return this.datastore.getAll().then(function (orders) {
      var email_array = Object.keys(orders);

      console.log('Truck #' + this.truck_id + ' has pending orders:');
      email_array.forEach(function (email) {
        console.log(orders[email]);
        if (print_fn) {
          print_fn(orders[email]);
        }
      }.bind(this));
    }.bind(this));
  };


  App.Truck = Truck;
  window.App = App;
})(window);
