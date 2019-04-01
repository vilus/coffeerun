(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var remove_delay = 2000;

  function CheckList (selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    this.unchecker_map = {};
  };

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function (event) {
      var email = event.target.value;

      if (event.target.checked) {
        this.rowColor(email, 'Gainsboro') // todo
        var task_id = setTimeout(function () {
          this.removeRow(email);
          fn(email);
        }.bind(this), remove_delay);

        this.unchecker_map[email] = function () {
          clearTimeout(task_id);
          this.rowColor(email, 'SeaShell'); // todo
        }.bind(this);
      }
      else {
        this.unchecker_map[email]()
      }

    }.bind(this))
  };

  CheckList.prototype.addRow = function (coffee_order) {
    this.removeRow(coffee_order.email_address);
    var row = new Row(coffee_order);
    this.$element.append(row.$element);
  };

  CheckList.prototype.removeRow = function (email_address) {
    this.$element
      .find('[value="' + email_address + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  CheckList.prototype.rowColor = function (email_address, color) {
    this.$element
      .find('[value="' + email_address + '"]')
      .closest('label').css('background-color', color)
  };

  function Row (coffee_order) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });
    var $label = $('<label></label>');
    var $checkbox = $('<input></input>', {
      'type': 'checkbox',
      'value': coffee_order.email_address
    });
    var description = coffee_order.size + ' ';
    if (coffee_order.flavor) {
      description += coffee_order.flavor + ' ';
    }
    description += coffee_order.coffee + ', ';
    description += ' (' + coffee_order.email_address + ')';
    description += ' [' + coffee_order.strength + 'x]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
