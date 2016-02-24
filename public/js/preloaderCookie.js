var cooName = 'disablePreLoaderForApp';

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

    $(window).on('load', function () {
        var $preloader = $('#pagePreloader'),
            $spinner   = $('#spinner'),
            $welcome = $('#welcomeText'),
            $preloadDescription = $('#preloadDescription');
        setTimeout(function() {
            $welcome.fadeOut();
            $spinner.fadeOut();
            $preloadDescription.fadeOut();
            $preloader.delay(350).fadeOut('slow');
        }, 5000);
    setTimeout( 'location="/login";', 6000 );
    });

setCookie(cooName, true, {});