'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* smoothscroll v0.4.0 - 2017 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  /*
   * aliases
   * w: window global object
   * d: document
   */

  var w = window;
  var d = document;

  /**
   * indicates if a the current browser is made by Microsoft
   * @method isMicrosoftBrowser
   * @param {String} userAgent
   * @returns {Boolean}
   */
  function isMicrosoftBrowser(userAgent) {
    var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
  }

  // polyfill
  function polyfill() {
    // return if scroll behavior is supported and polyfill is not forced
    if ('scrollBehavior' in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (firstArg === null || (typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) !== 'object' || firstArg.behavior === undefined || firstArg.behavior === 'auto' || firstArg.behavior === 'instant') {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if ((typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError('behavior member of ScrollOptions ' + firstArg.behavior + ' is not a valid value for enumeration ScrollBehavior.');
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      var isBody;

      do {
        el = el.parentNode;

        isBody = el === d.body;
      } while (isBody === false && isScrollable(el) === false);

      isBody = null;

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : w.scrollX || w.pageXOffset,
        // use top prop, second argument if present or fallback to scrollY
        arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
    };

    // w.scrollBy
    w.scrollBy = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value couldn\'t be converted');
        }

        original.elementScroll.call(this,
        // use left prop, first number argument or fallback to scrollLeft
        arguments[0].left !== undefined ? ~~arguments[0].left : _typeof(arguments[0]) !== 'object' ? ~~arguments[0] : this.scrollLeft,
        // use top prop, second argument or fallback to scrollTop
        arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function () {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNtb290aHNjcm9sbC5qcyJdLCJuYW1lcyI6WyJ3Iiwid2luZG93IiwiZCIsImRvY3VtZW50IiwiaXNNaWNyb3NvZnRCcm93c2VyIiwidXNlckFnZW50IiwidXNlckFnZW50UGF0dGVybnMiLCJSZWdFeHAiLCJqb2luIiwidGVzdCIsInBvbHlmaWxsIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJfX2ZvcmNlU21vb3RoU2Nyb2xsUG9seWZpbGxfXyIsIkVsZW1lbnQiLCJIVE1MRWxlbWVudCIsIlNDUk9MTF9USU1FIiwiUk9VTkRJTkdfVE9MRVJBTkNFIiwibmF2aWdhdG9yIiwib3JpZ2luYWwiLCJzY3JvbGwiLCJzY3JvbGxUbyIsInNjcm9sbEJ5IiwiZWxlbWVudFNjcm9sbCIsInByb3RvdHlwZSIsInNjcm9sbEVsZW1lbnQiLCJzY3JvbGxJbnRvVmlldyIsIm5vdyIsInBlcmZvcm1hbmNlIiwiYmluZCIsIkRhdGUiLCJ4IiwieSIsInNjcm9sbExlZnQiLCJzY3JvbGxUb3AiLCJlYXNlIiwiayIsIk1hdGgiLCJjb3MiLCJQSSIsInNob3VsZEJhaWxPdXQiLCJmaXJzdEFyZyIsImJlaGF2aW9yIiwidW5kZWZpbmVkIiwiVHlwZUVycm9yIiwiaGFzU2Nyb2xsYWJsZVNwYWNlIiwiZWwiLCJheGlzIiwiY2xpZW50SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50V2lkdGgiLCJzY3JvbGxXaWR0aCIsImNhbk92ZXJmbG93Iiwib3ZlcmZsb3dWYWx1ZSIsImdldENvbXB1dGVkU3R5bGUiLCJpc1Njcm9sbGFibGUiLCJpc1Njcm9sbGFibGVZIiwiaXNTY3JvbGxhYmxlWCIsImZpbmRTY3JvbGxhYmxlUGFyZW50IiwiaXNCb2R5IiwicGFyZW50Tm9kZSIsImJvZHkiLCJzdGVwIiwiY29udGV4dCIsInRpbWUiLCJ2YWx1ZSIsImN1cnJlbnRYIiwiY3VycmVudFkiLCJlbGFwc2VkIiwic3RhcnRUaW1lIiwic3RhcnRYIiwic3RhcnRZIiwibWV0aG9kIiwiY2FsbCIsInNjcm9sbGFibGUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzbW9vdGhTY3JvbGwiLCJzY3JvbGxYIiwicGFnZVhPZmZzZXQiLCJzY3JvbGxZIiwicGFnZVlPZmZzZXQiLCJhcmd1bWVudHMiLCJsZWZ0IiwidG9wIiwiU3ludGF4RXJyb3IiLCJzY3JvbGxhYmxlUGFyZW50IiwicGFyZW50UmVjdHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRSZWN0cyIsInBvc2l0aW9uIiwiZXhwb3J0cyIsIm1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0MsYUFBWTtBQUNYOztBQUVBOzs7Ozs7QUFLQSxNQUFJQSxJQUFJQyxNQUFSO0FBQ0EsTUFBSUMsSUFBSUMsUUFBUjs7QUFFQTs7Ozs7O0FBTUEsV0FBU0Msa0JBQVQsQ0FBNEJDLFNBQTVCLEVBQXVDO0FBQ3JDLFFBQUlDLG9CQUFvQixDQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXNCLE9BQXRCLENBQXhCOztBQUVBLFdBQU8sSUFBSUMsTUFBSixDQUFXRCxrQkFBa0JFLElBQWxCLENBQXVCLEdBQXZCLENBQVgsRUFBd0NDLElBQXhDLENBQTZDSixTQUE3QyxDQUFQO0FBQ0Q7O0FBRUE7QUFDRCxXQUFTSyxRQUFULEdBQW9CO0FBQ2xCO0FBQ0EsUUFBSSxvQkFBb0JSLEVBQUVTLGVBQUYsQ0FBa0JDLEtBQXRDLElBQ0NaLEVBQUVhLDZCQUFGLEtBQW9DLElBRHpDLEVBQytDO0FBQzdDO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFJQyxVQUFVZCxFQUFFZSxXQUFGLElBQWlCZixFQUFFYyxPQUFqQztBQUNBLFFBQUlFLGNBQWMsR0FBbEI7O0FBRUE7Ozs7O0FBS0EsUUFBSUMscUJBQXFCYixtQkFBbUJKLEVBQUVrQixTQUFGLENBQVliLFNBQS9CLElBQTRDLENBQTVDLEdBQWdELENBQXpFOztBQUVBO0FBQ0EsUUFBSWMsV0FBVztBQUNiQyxjQUFRcEIsRUFBRW9CLE1BQUYsSUFBWXBCLEVBQUVxQixRQURUO0FBRWJDLGdCQUFVdEIs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LG9CQUFVO0FBSEQsU0FBWDtBQUtEO0FBQ0YsS0EzQ0Q7QUE0Q0Q7O0FBRUQsTUFBSSxRQUFPZ0QsT0FBUCx5Q0FBT0EsT0FBUCxPQUFtQixRQUF2QixFQUFpQztBQUMvQjtBQUNBQyxXQUFPRCxPQUFQLEdBQWlCLEVBQUVoRixVQUFVQSxRQUFaLEVBQWpCO0FBQ0QsR0FIRCxNQUdPO0FBQ0w7QUFDQUE7QUFDRDtBQUVGLENBOWJBLEdBQUQiLCJmaWxlIjoic21vb3Roc2Nyb2xsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogc21vb3Roc2Nyb2xsIHYwLjQuMCAtIDIwMTcgLSBEdXN0YW4gS2FzdGVuLCBKZXJlbWlhcyBNZW5pY2hlbGxpIC0gTUlUIExpY2Vuc2UgKi9cclxuKGZ1bmN0aW9uICgpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8qXHJcbiAgICogYWxpYXNlc1xyXG4gICAqIHc6IHdpbmRvdyBnbG9iYWwgb2JqZWN0XHJcbiAgICogZDogZG9jdW1lbnRcclxuICAgKi9cclxuICB2YXIgdyA9IHdpbmRvdztcclxuICB2YXIgZCA9IGRvY3VtZW50O1xyXG5cclxuICAvKipcclxuICAgKiBpbmRpY2F0ZXMgaWYgYSB0aGUgY3VycmVudCBicm93c2VyIGlzIG1hZGUgYnkgTWljcm9zb2Z0XHJcbiAgICogQG1ldGhvZCBpc01pY3Jvc29mdEJyb3dzZXJcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckFnZW50XHJcbiAgICogQHJldHVybnMge0Jvb2xlYW59XHJcbiAgICovXHJcbiAgZnVuY3Rpb24gaXNNaWNyb3NvZnRCcm93c2VyKHVzZXJBZ2VudCkge1xyXG4gICAgdmFyIHVzZXJBZ2VudFBhdHRlcm5zID0gWydNU0lFICcsICdUcmlkZW50LycsICdFZGdlLyddO1xyXG5cclxuICAgIHJldHVybiBuZXcgUmVnRXhwKHVzZXJBZ2VudFBhdHRlcm5zLmpvaW4oJ3wnKSkudGVzdCh1c2VyQWdlbnQpO1xyXG4gIH1cclxuXHJcbiAgIC8vIHBvbHlmaWxsXHJcbiAgZnVuY3Rpb24gcG9seWZpbGwoKSB7XHJcbiAgICAvLyByZXR1cm4gaWYgc2Nyb2xsIGJlaGF2aW9yIGlzIHN1cHBvcnRlZCBhbmQgcG9seWZpbGwgaXMgbm90IGZvcmNlZFxyXG4gICAgaWYgKCdzY3JvbGxCZWhhdmlvcicgaW4gZC5kb2N1bWVudEVsZW1lbnQuc3R5bGVcclxuICAgICAgJiYgdy5fX2ZvcmNlU21vb3RoU2Nyb2xsUG9seWZpbGxfXyAhPT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2xvYmFsc1xyXG4gICAgdmFyIEVsZW1lbnQgPSB3LkhUTUxFbGVtZW50IHx8IHcuRWxlbWVudDtcclxuICAgIHZhciBTQ1JPTExfVElNRSA9IDQ2ODtcclxuXHJcbiAgICAvKlxyXG4gICAgICogSUUgaGFzIHJvdW5kaW5nIGJ1ZyByb3VuZGluZyBkb3duIGNsaWVudEhlaWdodCBhbmQgY2xpZW50V2lkdGggYW5kXHJcbiAgICAgKiByb3VuZGluZyB1cCBzY3JvbGxIZWlnaHQgYW5kIHNjcm9sbFdpZHRoIGNhdXNpbmcgZmFsc2UgcG9zaXRpdmVzXHJcbiAgICAgKiBvbiBoYXNTY3JvbGxhYmxlU3BhY2VcclxuICAgICAqL1xyXG4gICAgdmFyIFJPVU5ESU5HX1RPTEVSQU5DRSA9IGlzTWljcm9zb2Z0QnJvd3Nlcih3Lm5hdmlnYXRvci51c2VyQWdlbnQpID8gMSA6IDA7XHJcblxyXG4gICAgLy8gb2JqZWN0IGdhdGhlcmluZyBvcmlnaW5hbCBzY3JvbGwgbWV0aG9kc1xyXG4gICAgdmFyIG9yaWdpbmFsID0ge1xyXG4gICAgICBzY3JvbGw6IHcuc2Nyb2xsIHx8IHcuc2Nyb2xsVG8sXHJcbiAgICAgIHNjcm9sbEJ5OiB3LnNjcm9sbEJ5LFxyXG4gICAgICBlbGVtZW50U2Nyb2xsOiBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGwgfHwgc2Nyb2xsRWxlbWVudCxcclxuICAgICAgc2Nyb2xsSW50b1ZpZXc6IEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGRlZmluZSB0aW1pbmcgbWV0aG9kXHJcbiAgICB2YXIgbm93ID0gdy5wZXJmb3JtYW5jZSAmJiB3LnBlcmZvcm1hbmNlLm5vd1xyXG4gICAgICA/IHcucGVyZm9ybWFuY2Uubm93LmJpbmQody5wZXJmb3JtYW5jZSlcclxuICAgICAgOiBEYXRlLm5vdztcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNoYW5nZXMgc2Nyb2xsIHBvc2l0aW9uIGluc2lkZSBhbiBlbGVtZW50XHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbEVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2Nyb2xsRWxlbWVudCh4LCB5KSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsTGVmdCA9IHg7XHJcbiAgICAgIHRoaXMuc2Nyb2xsVG9wID0geTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybnMgcmVzdWx0IG9mIGFwcGx5aW5nIGVhc2UgbWF0aCBmdW5jdGlvbiB0byBhIG51bWJlclxyXG4gICAgICogQG1ldGhvZCBlYXNlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ga1xyXG4gICAgICogQHJldHVybnMge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZWFzZShrKSB7XHJcbiAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYSBzbW9vdGggYmVoYXZpb3Igc2hvdWxkIGJlIGFwcGxpZWRcclxuICAgICAqIEBtZXRob2Qgc2hvdWxkQmFpbE91dFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBmaXJzdEFyZ1xyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNob3VsZEJhaWxPdXQoZmlyc3RBcmcpIHtcclxuICAgICAgaWYgKGZpcnN0QXJnID09PSBudWxsXHJcbiAgICAgICAgfHwgdHlwZW9mIGZpcnN0QXJnICE9PSAnb2JqZWN0J1xyXG4gICAgICAgIHx8IGZpcnN0QXJnLmJlaGF2aW9yID09PSB1bmRlZmluZWRcclxuICAgICAgICB8fCBmaXJzdEFyZy5iZWhhdmlvciA9PT0gJ2F1dG8nXHJcbiAgICAgICAgfHwgZmlyc3RBcmcuYmVoYXZpb3IgPT09ICdpbnN0YW50Jykge1xyXG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QvbnVsbFxyXG4gICAgICAgIC8vIG9yIGJlaGF2aW9yIGlzIGF1dG8sIGluc3RhbnQgb3IgdW5kZWZpbmVkXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2YgZmlyc3RBcmcgPT09ICdvYmplY3QnICYmIGZpcnN0QXJnLmJlaGF2aW9yID09PSAnc21vb3RoJykge1xyXG4gICAgICAgIC8vIGZpcnN0IGFyZ3VtZW50IGlzIGFuIG9iamVjdCBhbmQgYmVoYXZpb3IgaXMgc21vb3RoXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIGJlaGF2aW9yIGlzIG5vdCBzdXBwb3J0ZWRcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAnYmVoYXZpb3IgbWVtYmVyIG9mIFNjcm9sbE9wdGlvbnMgJ1xyXG4gICAgICAgICsgZmlyc3RBcmcuYmVoYXZpb3JcclxuICAgICAgICArICcgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIGVudW1lcmF0aW9uIFNjcm9sbEJlaGF2aW9yLidcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGhhcyBzY3JvbGxhYmxlIHNwYWNlIGluIHRoZSBwcm92aWRlZCBheGlzXHJcbiAgICAgKiBAbWV0aG9kIGhhc1Njcm9sbGFibGVTcGFjZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF4aXNcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBoYXNTY3JvbGxhYmxlU3BhY2UoZWwsIGF4aXMpIHtcclxuICAgICAgaWYgKGF4aXMgPT09ICdZJykge1xyXG4gICAgICAgIHJldHVybiAoZWwuY2xpZW50SGVpZ2h0ICsgUk9VTkRJTkdfVE9MRVJBTkNFKSA8IGVsLnNjcm9sbEhlaWdodDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGF4aXMgPT09ICdYJykge1xyXG4gICAgICAgIHJldHVybiAoZWwuY2xpZW50V2lkdGggKyBST1VORElOR19UT0xFUkFOQ0UpIDwgZWwuc2Nyb2xsV2lkdGg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGluZGljYXRlcyBpZiBhbiBlbGVtZW50IGhhcyBhIHNjcm9sbGFibGUgb3ZlcmZsb3cgcHJvcGVydHkgaW4gdGhlIGF4aXNcclxuICAgICAqIEBtZXRob2QgY2FuT3ZlcmZsb3dcclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBheGlzXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY2FuT3ZlcmZsb3coZWwsIGF4aXMpIHtcclxuICAgICAgdmFyIG92ZXJmbG93VmFsdWUgPSB3LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpWydvdmVyZmxvdycgKyBheGlzXTtcclxuXHJcbiAgICAgIHJldHVybiBvdmVyZmxvd1ZhbHVlID09PSAnYXV0bycgfHwgb3ZlcmZsb3dWYWx1ZSA9PT0gJ3Njcm9sbCc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbmRpY2F0ZXMgaWYgYW4gZWxlbWVudCBjYW4gYmUgc2Nyb2xsZWQgaW4gZWl0aGVyIGF4aXNcclxuICAgICAqIEBtZXRob2QgaXNTY3JvbGxhYmxlXHJcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXhpc1xyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGlzU2Nyb2xsYWJsZShlbCkge1xyXG4gICAgICB2YXIgaXNTY3JvbGxhYmxlWSA9IGhhc1Njcm9sbGFibGVTcGFjZShlbCwgJ1knKSAmJiBjYW5PdmVyZmxvdyhlbCwgJ1knKTtcclxuICAgICAgdmFyIGlzU2Nyb2xsYWJsZVggPSBoYXNTY3JvbGxhYmxlU3BhY2UoZWwsICdYJykgJiYgY2FuT3ZlcmZsb3coZWwsICdYJyk7XHJcblxyXG4gICAgICByZXR1cm4gaXNTY3JvbGxhYmxlWSB8fCBpc1Njcm9sbGFibGVYO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmluZHMgc2Nyb2xsYWJsZSBwYXJlbnQgb2YgYW4gZWxlbWVudFxyXG4gICAgICogQG1ldGhvZCBmaW5kU2Nyb2xsYWJsZVBhcmVudFxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBlbFxyXG4gICAgICogQHJldHVybnMge05vZGV9IGVsXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGZpbmRTY3JvbGxhYmxlUGFyZW50KGVsKSB7XHJcbiAgICAgIHZhciBpc0JvZHk7XHJcblxyXG4gICAgICBkbyB7XHJcbiAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xyXG5cclxuICAgICAgICBpc0JvZHkgPSBlbCA9PT0gZC5ib2R5O1xyXG4gICAgICB9IHdoaWxlIChpc0JvZHkgPT09IGZhbHNlICYmIGlzU2Nyb2xsYWJsZShlbCkgPT09IGZhbHNlKTtcclxuXHJcbiAgICAgIGlzQm9keSA9IG51bGw7XHJcblxyXG4gICAgICByZXR1cm4gZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZWxmIGludm9rZWQgZnVuY3Rpb24gdGhhdCwgZ2l2ZW4gYSBjb250ZXh0LCBzdGVwcyB0aHJvdWdoIHNjcm9sbGluZ1xyXG4gICAgICogQG1ldGhvZCBzdGVwXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc3RlcChjb250ZXh0KSB7XHJcbiAgICAgIHZhciB0aW1lID0gbm93KCk7XHJcbiAgICAgIHZhciB2YWx1ZTtcclxuICAgICAgdmFyIGN1cnJlbnRYO1xyXG4gICAgICB2YXIgY3VycmVudFk7XHJcbiAgICAgIHZhciBlbGFwc2VkID0gKHRpbWUgLSBjb250ZXh0LnN0YXJ0VGltZSkgLyBTQ1JPTExfVElNRTtcclxuXHJcbiAgICAgIC8vIGF2b2lkIGVsYXBzZWQgdGltZXMgaGlnaGVyIHRoYW4gb25lXHJcbiAgICAgIGVsYXBzZWQgPSBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xyXG5cclxuICAgICAgLy8gYXBwbHkgZWFzaW5nIHRvIGVsYXBzZWQgdGltZVxyXG4gICAgICB2YWx1ZSA9IGVhc2UoZWxhcHNlZCk7XHJcblxyXG4gICAgICBjdXJyZW50WCA9IGNvbnRleHQuc3RhcnRYICsgKGNvbnRleHQueCAtIGNvbnRleHQuc3RhcnRYKSAqIHZhbHVlO1xyXG4gICAgICBjdXJyZW50WSA9IGNvbnRleHQuc3RhcnRZICsgKGNvbnRleHQueSAtIGNvbnRleHQuc3RhcnRZKSAqIHZhbHVlO1xyXG5cclxuICAgICAgY29udGV4dC5tZXRob2QuY2FsbChjb250ZXh0LnNjcm9sbGFibGUsIGN1cnJlbnRYLCBjdXJyZW50WSk7XHJcblxyXG4gICAgICAvLyBzY3JvbGwgbW9yZSBpZiB3ZSBoYXZlIG5vdCByZWFjaGVkIG91ciBkZXN0aW5hdGlvblxyXG4gICAgICBpZiAoY3VycmVudFggIT09IGNvbnRleHQueCB8fCBjdXJyZW50WSAhPT0gY29udGV4dC55KSB7XHJcbiAgICAgICAgdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcC5iaW5kKHcsIGNvbnRleHQpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2Nyb2xscyB3aW5kb3cgb3IgZWxlbWVudCB3aXRoIGEgc21vb3RoIGJlaGF2aW9yXHJcbiAgICAgKiBAbWV0aG9kIHNtb290aFNjcm9sbFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R8Tm9kZX0gZWxcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxyXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKGVsLCB4LCB5KSB7XHJcbiAgICAgIHZhciBzY3JvbGxhYmxlO1xyXG4gICAgICB2YXIgc3RhcnRYO1xyXG4gICAgICB2YXIgc3RhcnRZO1xyXG4gICAgICB2YXIgbWV0aG9kO1xyXG4gICAgICB2YXIgc3RhcnRUaW1lID0gbm93KCk7XHJcblxyXG4gICAgICAvLyBkZWZpbmUgc2Nyb2xsIGNvbnRleHRcclxuICAgICAgaWYgKGVsID09PSBkLmJvZHkpIHtcclxuICAgICAgICBzY3JvbGxhYmxlID0gdztcclxuICAgICAgICBzdGFydFggPSB3LnNjcm9sbFggfHwgdy5wYWdlWE9mZnNldDtcclxuICAgICAgICBzdGFydFkgPSB3LnNjcm9sbFkgfHwgdy5wYWdlWU9mZnNldDtcclxuICAgICAgICBtZXRob2QgPSBvcmlnaW5hbC5zY3JvbGw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2Nyb2xsYWJsZSA9IGVsO1xyXG4gICAgICAgIHN0YXJ0WCA9IGVsLnNjcm9sbExlZnQ7XHJcbiAgICAgICAgc3RhcnRZID0gZWwuc2Nyb2xsVG9wO1xyXG4gICAgICAgIG1ldGhvZCA9IHNjcm9sbEVsZW1lbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNjcm9sbCBsb29waW5nIG92ZXIgYSBmcmFtZVxyXG4gICAgICBzdGVwKHtcclxuICAgICAgICBzY3JvbGxhYmxlOiBzY3JvbGxhYmxlLFxyXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxyXG4gICAgICAgIHN0YXJ0WDogc3RhcnRYLFxyXG4gICAgICAgIHN0YXJ0WTogc3RhcnRZLFxyXG4gICAgICAgIHg6IHgsXHJcbiAgICAgICAgeTogeVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPUklHSU5BTCBNRVRIT0RTIE9WRVJSSURFU1xyXG4gICAgLy8gdy5zY3JvbGwgYW5kIHcuc2Nyb2xsVG9cclxuICAgIHcuc2Nyb2xsID0gdy5zY3JvbGxUbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyBhdm9pZCBhY3Rpb24gd2hlbiBubyBhcmd1bWVudHMgYXJlIHBhc3NlZFxyXG4gICAgICBpZiAoYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcclxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbC5jYWxsKFxyXG4gICAgICAgICAgdyxcclxuICAgICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyBhcmd1bWVudHNbMF0ubGVmdFxyXG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnXHJcbiAgICAgICAgICAgICAgPyBhcmd1bWVudHNbMF1cclxuICAgICAgICAgICAgICA6ICh3LnNjcm9sbFggfHwgdy5wYWdlWE9mZnNldCksXHJcbiAgICAgICAgICAvLyB1c2UgdG9wIHByb3AsIHNlY29uZCBhcmd1bWVudCBpZiBwcmVzZW50IG9yIGZhbGxiYWNrIHRvIHNjcm9sbFlcclxuICAgICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICA/IGFyZ3VtZW50c1swXS50b3BcclxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgID8gYXJndW1lbnRzWzFdXHJcbiAgICAgICAgICAgICAgOiAody5zY3JvbGxZIHx8IHcucGFnZVlPZmZzZXQpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXHJcbiAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxyXG4gICAgICAgIHcsXHJcbiAgICAgICAgZC5ib2R5LFxyXG4gICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0ubGVmdFxyXG4gICAgICAgICAgOiAody5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQpLFxyXG4gICAgICAgIGFyZ3VtZW50c1swXS50b3AgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3BcclxuICAgICAgICAgIDogKHcuc2Nyb2xsWSB8fCB3LnBhZ2VZT2Zmc2V0KVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyB3LnNjcm9sbEJ5XHJcbiAgICB3LnNjcm9sbEJ5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXHJcbiAgICAgIGlmIChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxyXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pKSB7XHJcbiAgICAgICAgb3JpZ2luYWwuc2Nyb2xsQnkuY2FsbChcclxuICAgICAgICAgIHcsXHJcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gYXJndW1lbnRzWzBdLmxlZnRcclxuICAgICAgICAgICAgOiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0J1xyXG4gICAgICAgICAgICAgID8gYXJndW1lbnRzWzBdXHJcbiAgICAgICAgICAgICAgOiAwLFxyXG4gICAgICAgICAgYXJndW1lbnRzWzBdLnRvcCAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gYXJndW1lbnRzWzBdLnRvcFxyXG4gICAgICAgICAgICA6IGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICA/IGFyZ3VtZW50c1sxXVxyXG4gICAgICAgICAgICAgOiAwXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXHJcbiAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxyXG4gICAgICAgIHcsXHJcbiAgICAgICAgZC5ib2R5LFxyXG4gICAgICAgIH5+YXJndW1lbnRzWzBdLmxlZnQgKyAody5zY3JvbGxYIHx8IHcucGFnZVhPZmZzZXQpLFxyXG4gICAgICAgIH5+YXJndW1lbnRzWzBdLnRvcCArICh3LnNjcm9sbFkgfHwgdy5wYWdlWU9mZnNldClcclxuICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsIGFuZCBFbGVtZW50LnByb3RvdHlwZS5zY3JvbGxUb1xyXG4gICAgRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsID0gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsVG8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgLy8gYXZvaWQgYWN0aW9uIHdoZW4gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWRcclxuICAgICAgaWYgKGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhdm9pZCBzbW9vdGggYmVoYXZpb3IgaWYgbm90IHJlcXVpcmVkXHJcbiAgICAgIGlmIChzaG91bGRCYWlsT3V0KGFyZ3VtZW50c1swXSkgPT09IHRydWUpIHtcclxuICAgICAgICAvLyBpZiBvbmUgbnVtYmVyIGlzIHBhc3NlZCwgdGhyb3cgZXJyb3IgdG8gbWF0Y2ggRmlyZWZveCBpbXBsZW1lbnRhdGlvblxyXG4gICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJyAmJiBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdWYWx1ZSBjb3VsZG5cXCd0IGJlIGNvbnZlcnRlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JpZ2luYWwuZWxlbWVudFNjcm9sbC5jYWxsKFxyXG4gICAgICAgICAgdGhpcyxcclxuICAgICAgICAgIC8vIHVzZSBsZWZ0IHByb3AsIGZpcnN0IG51bWJlciBhcmd1bWVudCBvciBmYWxsYmFjayB0byBzY3JvbGxMZWZ0XHJcbiAgICAgICAgICBhcmd1bWVudHNbMF0ubGVmdCAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMF0ubGVmdFxyXG4gICAgICAgICAgICA6IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnXHJcbiAgICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXVxyXG4gICAgICAgICAgICAgIDogdGhpcy5zY3JvbGxMZWZ0LFxyXG4gICAgICAgICAgLy8gdXNlIHRvcCBwcm9wLCBzZWNvbmQgYXJndW1lbnQgb3IgZmFsbGJhY2sgdG8gc2Nyb2xsVG9wXHJcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3BcclxuICAgICAgICAgICAgOiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgID8gfn5hcmd1bWVudHNbMV1cclxuICAgICAgICAgICAgICA6IHRoaXMuc2Nyb2xsVG9wXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgbGVmdCA9IGFyZ3VtZW50c1swXS5sZWZ0O1xyXG4gICAgICB2YXIgdG9wID0gYXJndW1lbnRzWzBdLnRvcDtcclxuXHJcbiAgICAgIC8vIExFVCBUSEUgU01PT1RITkVTUyBCRUdJTiFcclxuICAgICAgc21vb3RoU2Nyb2xsLmNhbGwoXHJcbiAgICAgICAgdGhpcyxcclxuICAgICAgICB0aGlzLFxyXG4gICAgICAgIHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJyA/IHRoaXMuc2Nyb2xsTGVmdCA6IH5+bGVmdCxcclxuICAgICAgICB0eXBlb2YgdG9wID09PSAndW5kZWZpbmVkJyA/IHRoaXMuc2Nyb2xsVG9wIDogfn50b3BcclxuICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsQnlcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEJ5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8vIGF2b2lkIGFjdGlvbiB3aGVuIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkXHJcbiAgICAgIGlmIChhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXZvaWQgc21vb3RoIGJlaGF2aW9yIGlmIG5vdCByZXF1aXJlZFxyXG4gICAgICBpZiAoc2hvdWxkQmFpbE91dChhcmd1bWVudHNbMF0pID09PSB0cnVlKSB7XHJcbiAgICAgICAgb3JpZ2luYWwuZWxlbWVudFNjcm9sbC5jYWxsKFxyXG4gICAgICAgICAgdGhpcyxcclxuICAgICAgICAgIGFyZ3VtZW50c1swXS5sZWZ0ICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgdGhpcy5zY3JvbGxMZWZ0XHJcbiAgICAgICAgICAgIDogfn5hcmd1bWVudHNbMF0gKyB0aGlzLnNjcm9sbExlZnQsXHJcbiAgICAgICAgICBhcmd1bWVudHNbMF0udG9wICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyB+fmFyZ3VtZW50c1swXS50b3AgKyB0aGlzLnNjcm9sbFRvcFxyXG4gICAgICAgICAgICA6IH5+YXJndW1lbnRzWzFdICsgdGhpcy5zY3JvbGxUb3BcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc2Nyb2xsKHtcclxuICAgICAgICBsZWZ0OiB+fmFyZ3VtZW50c1swXS5sZWZ0ICsgdGhpcy5zY3JvbGxMZWZ0LFxyXG4gICAgICAgIHRvcDogfn5hcmd1bWVudHNbMF0udG9wICsgdGhpcy5zY3JvbGxUb3AsXHJcbiAgICAgICAgYmVoYXZpb3I6IGFyZ3VtZW50c1swXS5iZWhhdmlvclxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRWxlbWVudC5wcm90b3R5cGUuc2Nyb2xsSW50b1ZpZXdcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLnNjcm9sbEludG9WaWV3ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8vIGF2b2lkIHNtb290aCBiZWhhdmlvciBpZiBub3QgcmVxdWlyZWRcclxuICAgICAgaWYgKHNob3VsZEJhaWxPdXQoYXJndW1lbnRzWzBdKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIG9yaWdpbmFsLnNjcm9sbEludG9WaWV3LmNhbGwoXHJcbiAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgICAgIDogYXJndW1lbnRzWzBdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBMRVQgVEhFIFNNT09USE5FU1MgQkVHSU4hXHJcbiAgICAgIHZhciBzY3JvbGxhYmxlUGFyZW50ID0gZmluZFNjcm9sbGFibGVQYXJlbnQodGhpcyk7XHJcbiAgICAgIHZhciBwYXJlbnRSZWN0cyA9IHNjcm9sbGFibGVQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHZhciBjbGllbnRSZWN0cyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICBpZiAoc2Nyb2xsYWJsZVBhcmVudCAhPT0gZC5ib2R5KSB7XHJcbiAgICAgICAgLy8gcmV2ZWFsIGVsZW1lbnQgaW5zaWRlIHBhcmVudFxyXG4gICAgICAgIHNtb290aFNjcm9sbC5jYWxsKFxyXG4gICAgICAgICAgdGhpcyxcclxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQsXHJcbiAgICAgICAgICBzY3JvbGxhYmxlUGFyZW50LnNjcm9sbExlZnQgKyBjbGllbnRSZWN0cy5sZWZ0IC0gcGFyZW50UmVjdHMubGVmdCxcclxuICAgICAgICAgIHNjcm9sbGFibGVQYXJlbnQuc2Nyb2xsVG9wICsgY2xpZW50UmVjdHMudG9wIC0gcGFyZW50UmVjdHMudG9wXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gcmV2ZWFsIHBhcmVudCBpbiB2aWV3cG9ydCB1bmxlc3MgaXMgZml4ZWRcclxuICAgICAgICBpZiAody5nZXRDb21wdXRlZFN0eWxlKHNjcm9sbGFibGVQYXJlbnQpLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XHJcbiAgICAgICAgICB3LnNjcm9sbEJ5KHtcclxuICAgICAgICAgICAgbGVmdDogcGFyZW50UmVjdHMubGVmdCxcclxuICAgICAgICAgICAgdG9wOiBwYXJlbnRSZWN0cy50b3AsXHJcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHJldmVhbCBlbGVtZW50IGluIHZpZXdwb3J0XHJcbiAgICAgICAgdy5zY3JvbGxCeSh7XHJcbiAgICAgICAgICBsZWZ0OiBjbGllbnRSZWN0cy5sZWZ0LFxyXG4gICAgICAgICAgdG9wOiBjbGllbnRSZWN0cy50b3AsXHJcbiAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcclxuICAgIC8vIGNvbW1vbmpzXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHsgcG9seWZpbGw6IHBvbHlmaWxsIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGdsb2JhbFxyXG4gICAgcG9seWZpbGwoKTtcclxuICB9XHJcblxyXG59KCkpOyJdfQ==
