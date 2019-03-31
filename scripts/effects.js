var STRENGTH_INPUT_SELECTOR = '[data-strength="input"]'
var STRENGTH_LEVEL_SELECTOR = '[data-strength="level"]'
var FORM_SELECTOR = '[data-coffee-order="form"]'
var SOFT = 'Peru';
var MEDIUM = 'Chocolate';
var STRONG = 'DarkRed';
var $ = window.jQuery;

function getColor (value) {
  if (value < 35) return SOFT;
  if (value >= 35 && value < 70) return MEDIUM;
  if (value >= 70) return STRONG;
}

function changeStrengthHandler () {
  'use strict';
  var input = $(STRENGTH_INPUT_SELECTOR);
  var level = $(STRENGTH_LEVEL_SELECTOR);

  function actualizer (event) {
    var val = parseInt(input.val());

    level.text(val);
    level.css('color', getColor(val));
  }

  input.on('change', actualizer);
  $(FORM_SELECTOR).on('reset', function () {
    setTimeout(actualizer, 50);
  });

  actualizer();
}

function initEvents () {
  'use strict';
  changeStrengthHandler();
}

document.addEventListener('DOMContentLoaded', initEvents);
