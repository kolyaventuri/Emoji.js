'use strict';

var _collection = require('lodash/collection');

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bind = function bind() {
  if (document.readyState === 'complete') {
    goReplace();
  } else {
    document.addEventListener('DOMContentLoaded', goReplace);
  }
}; /*
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

var goReplace = function goReplace() {
  var emojis = document.querySelectorAll(window.emojiClass ? window.emojiClass.join(',') : '.emoji');
  var fallback = function fallback() {
    _collection2.default.forEach(emojis, function (emoji) {
      var original = emoji.innerHTML;
      var converted = emojione.toImage(original);
      emoji.outerHTML = converted;
    });
  };
  if ('DOMParser' in window) {
    var parser = new DOMParser();
    try {
      if (new DOMParser().parseFromString("", "text/html")) {}
    } catch (ex) {
      fallback();
    }

    _collection2.default.forEach(emojis, function (emoji) {
      var original = emoji.innerHTML;
      var converted = emojione.toImage(original);
      var htmlData = parser.parseFromString(converted, "text/html");
      var images = htmlData.querySelectorAll('img.emojione');
      var _emojified = emoji.outerHTML;

      _collection2.default.forEach(images, function (_image) {
        var rexp = new RegExp(_image.title, 'g');
        var object = document.createElement('i');
        object.style.backgroundColor = 'rgba(0,0,0,0)';
        object.style.backgroundImage = 'url(' + _image.src + ')';
        object.style.backgroundSize = 'cover';
        object.style.display = "inline-block";
        object.setAttribute('class', _image.getAttribute('class'));
        _emojified = _emojified.replace(rexp, object.outerHTML);
      });

      emoji.outerHTML = _emojified;
    });
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
  el.href = 'https://cdn.jsdelivr.net/emojione/2.2.7/assets/css/emojione.min.css';
  document.head.appendChild(el);

  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/emojione/2.2.7/lib/js/emojione.min.js';
  s.async = true;
  s.onreadystatechange = s.onload = function () {
    if (!s.readyState || /loaded|complete/.test(s.readyState)) {
      goReplace();
    }
  };
  document.querySelector('head').appendChild(s);
}
//# sourceMappingURL=Emoji.js.map
