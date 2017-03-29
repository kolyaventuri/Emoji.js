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

const bind = () => {
  if(document.readyState === 'complete') {
    goReplace();
  } else {
    document.addEventListener('DOMContentLoaded', goReplace);
  }
};

const goReplace = () => {
  let emojis = document.querySelectorAll(window.emojiClass ? window.emojiClass.join(',') : '.emoji');
  let fallback = () => {
    for(let emoji of emojis) {
      let original = emoji.innerHTML;
      let converted = emojione.toImage(original);
      emoji.outerHTML = converted;
    }
  };
  if('DOMParser' in window) {
    let parser = new DOMParser();
    try {
      if ((new DOMParser()).parseFromString("", "text/html")) {

      }
    } catch (ex) {fallback();}

    for(let emoji of emojis) {
      let original = emoji.innerHTML;
      let converted = emojione.toImage(original);
      let htmlData = parser.parseFromString(converted, "text/html");
      let images = htmlData.querySelectorAll('img.emojione');
      let _emojified = emoji.outerHTML;
      for(let _image of images) {
        let rexp = new RegExp(_image.title, 'g');
        let object = document.createElement('i');
        object.style.backgroundColor = 'rgba(0,0,0,0)';
        object.style.backgroundImage = 'url(' + _image.src + ')';
        object.style.backgroundSize = 'cover';
        object.style.display = "inline-block";
        object.setAttribute('class', _image.getAttribute('class'));
        _emojified = _emojified.replace(rexp, object.outerHTML);
      }
      emoji.outerHTML = _emojified;
    }
  } else {
    fallback();
  }
};

if('emojione' in window) {
  bind();
} else {
  let el = document.createElement('link');
  el.rel = "stylesheet";
  el.type = "text/css";
  el.href = 'https://cdn.jsdelivr.net/emojione/2.2.7/assets/css/emojione.min.css';
  document.head.appendChild(el);

  let s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/emojione/2.2.7/lib/js/emojione.min.js';
  s.async = true;
  s.onreadystatechange = s.onload = () => {
    if ((!s.readyState || /loaded|complete/.test(s.readyState))) {
      goReplace();
    }
  };
  document.querySelector('head').appendChild(s);
}
