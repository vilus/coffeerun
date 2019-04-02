(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var remote_ds = new RemoteDataStore(SERVER_URL);
  var my_truck = new Truck('ncc-1701', remote_ds);
  var form_handler = new FormHandler(FORM_SELECTOR);
  var checklist = new CheckList(CHECKLIST_SELECTOR);

  form_handler.addSubmitHandler(function (data) {
    my_truck.createOrder.call(my_truck, data);
    checklist.addRow.call(checklist, data);
  });
  form_handler.addInputHandler(Validation.isCompanyEmail);
  checklist.addClickHandler(my_truck.deliverOrder.bind(my_truck));

  window.my_track = my_truck;
})(window);
