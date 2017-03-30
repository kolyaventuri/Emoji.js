# Emoji.js

Add Emoji to your website in seconds!

## About
[http://emojione.com](EmojiOne) brought about standardization of emoji across the web, using common :shortnames:

Emoji.js makes it stupidly simple to get this up and running on your website with virtually no setup! We utilize the [https://github.com/Ranks/emojione](EmojiOneJS) implementation, along with custom code to make it easy to convert the shortcodes on your website to Emoji images.

In most cases, Emoji.js will add a non-draggable image (for the sake of it being nicer) in place of the short-codes, however it will fall back to standard images in the event that this is not possible.

## Installation

Installation is easy! Simply upload the **Emoji.min.js** file to your web server, and add the following script tag to your head.
```
/* Standard HMTL */
<script type="text/javascript" src="/path/to/Emoji.min.js" async></script>

/* Pug */
script(src='/path/to/Emoji.min.js', async)
```

That's it! Emoji.js will load EmojiOne for you.

## Usage

To use, simply add a ```.emoji``` class to any element you want parsed.

Ex:
```
<span class="emoji">:heart:</span>
```

If you need to use custom classes, or you have blocks of text you need parsed, you can declare selectors in a script tag **before** loading Emoji.min.js, as follows. Be aware that this will override the ```.emoji``` class, so it must be self-defined.
```
window.emojiClass = ['.emoji', '.anotherSelector p'];
```

Styling can be applied through CSS with the ```.emoji``` and ```.emojione``` classes.

## Building

Emoji.js can be modified and built if you need it to be customized. Clone the repository, and install the dependencies using ```npm install``` or ```yarn install``` (yarn recommended).

Make modifications to *src/Emoji.js* and run ```grunt``` to build.

Emoji.js is built on ES6 code, and requires Babel (via grunt) to transpile to ES5. The code will be compiled into ```dist/```, and packed and minified using Webpack.


## Todo
Add Polymer or Webcomponents compatible custom ```<x-emoji />``` element for further ease of use.

## Credits
All EmojiOne Javascript is property of its respective owners, and can be found at the following GitHub repository: https://github.com/Ranks/emojione

Emoji.js is not, and should not be considered a fork of EmojiOne.

## Licenses

### EmojiOne Assets

*  All images and adaptations
*  The following applies to artwork included in EmojiOne GitHub libraries versions < 2.0.0.
  *  License: Creative Commons Attribution-ShareAlike 4.0 International
  *  Human Readable License: http://creativecommons.org/licenses/by-sa/4.0/
  *  Complete Legal Terms: http://creativecommons.org/licenses/by-sa/4.0/legalcode
*  The following applies to artwork included in EmojiOne GitHub libraries versions >= 2.0.0.
  *  License: Creative Commons Attribution 4.0 International
  *  Human Readable License: http://creativecommons.org/licenses/by/4.0/
  *  Complete Legal Terms: http://creativecommons.org/licenses/by/4.0/legalcode


### Everything Else
*  License: MIT
*  Complete Legal Terms: http://opensource.org/licenses/MIT
