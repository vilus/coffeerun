(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;

  var my_truck = new Truck('ncc-1701', new DataStore());
  var form_handler = new FormHandler(FORM_SELECTOR);
  var checklist = new CheckList(CHECKLIST_SELECTOR);

  form_handler.addSubmitHandler(function (data) {
    my_truck.createOrder.call(my_truck, data);
    checklist.addRow.call(checklist, data);
  });
  checklist.addClickHandler(my_truck.deliverOrder.bind(my_truck));

  window.my_track = my_truck;
})(window);
