'use strict';

/*
* Parses EmojiOne codes on page load.
*
* <element class="emoji">:code</element> will be turned into a corresponding
* Emoji in the style of EmojiOne (http://emojione.com/). Non-draggable on browsers
* that will support it.
*
* Class names can be overridden using a global array. Ex:
*     window.emojiClass = ['.emoji', '.icon'];
*
*/

var bind = function bind() {
  if (document.readyState === 'complete') {
    goReplace();
  } else {
    document.addEventListener('DOMContentLoaded', goReplace);
  }
};

var goReplace = function goReplace() {
  var emojis = document.querySelectorAll(window.emojiClass ? window.emojiClass.join(',') : '.emoji');
  var fallback = function fallback() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = emojis[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var emoji = _step.value;

        var original = emoji.innerHTML;
        var converted = emojione.toImage(original);
        emoji.outerHTML = converted;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
  if ('DOMParser' in window) {
    var parser = new DOMParser();
    try {
      if (new DOMParser().parseFromString("", "text/html")) {}
    } catch (ex) {
      fallback();
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = emojis[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var emoji = _step2.value;

        var original = emoji.innerHTML;
        var converted = emojione.toImage(original);
        var htmlData = parser.parseFromString(converted, "text/html");
        var image = htmlData.querySelector('img.emojione');
        var rexp = new RegExp(image.title, 'g');
        var object = document.createElement('i');
        object.style.backgroundColor = 'rgba(0,0,0,0)';
        object.style.backgroundImage = 'url(' + image.src + ')';
        object.style.backgroundSize = 'cover';
        object.style.display = "inline-block";
        object.setAttribute('class', image.getAttribute('class'));
        emoji.outerHTML = emoji.outerHTML.replace(rexp, object.outerHTML);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  } else {
    fallback();
  }
};

if ('emojione' in window) {
  bind();
} else {
  var el = document.createElement('link');
  el.rel = "stylesheet";
  el.type = "text/css";
  el.href = 'https://dl.kolya.co/bower_components/emojione/assets/css/emojione.min.css';
  document.head.appendChild(el);

  var s = document.createElement('script');
  s.src = 'https://dl.kolya.co/bower_components/emojione/lib/js/emojione.min.js';
  s.async = true;
  s.onreadystatechange = s.onload = function () {
    if (!s.readyState || /loaded|complete/.test(s.readyState)) {
      goReplace();
    }
  };
  document.querySelector('head').appendChild(s);
}
//# sourceMappingURL=Emoji.compiled.js.map
