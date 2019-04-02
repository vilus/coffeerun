(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler (selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$form_element = $(selector);
    if (this.$form_element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  };

  FormHandler.prototype.addSubmitHandler = function (fn) {
    this.$form_element.on('submit', function (event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
      });

      fn(data).then(function () {
        this.reset();
        this.elements[0].focus();
      }.bind(this));

    });
  };

  FormHandler.prototype.addInputHandler = function (fn) {
    this.$form_element.on('input', '[name="email_address"]', function (event) {
      var email = event.target.value;
      var message = '';
      if (!fn(email)) {
        message = email + ' is not authorized';
      }
      event.target.setCustomValidity(message);
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
