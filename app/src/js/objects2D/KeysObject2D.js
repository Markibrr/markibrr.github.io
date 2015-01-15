'use strict';

var jQuery = require('jquery');

/**
 * Animated keyboard keys
 *
 * @class Keys
 * @constructor
 * @requires jQuery
 */
function Keys ($el) {
  this.$el = $el;

  this.$top = this.$el.find('.key--top');
  this.$bottom = this.$el.find('.key--bottom');

  this.interval = null;
  this.current = 'top';
}

/**
 * Hightlight a key
 *
 * @method highlight
 */
Keys.prototype.highlight = function () {
  this.current = this.current === 'top' ? 'bottom' : 'top';
  var $el = this.current === 'top' ? this.$top : this.$bottom;

  $el.stop().animate({
      opacity: 1
    }, 400, function () {
      $el.stop().animate({
        opacity: 0.2
      }, 300);
  });
};

/**
 * Start the animation
 *
 * @method start
 */
Keys.prototype.start = function () {
  var _this = this;

  this.interval = window.setInterval(function () {
    _this.highlight();
  }, 1000);
};

/**
 * Stop the animation
 *
 * @method stop
 */
Keys.prototype.stop = function () {
  window.clearInterval(this.interval);
};

module.exports = Keys;