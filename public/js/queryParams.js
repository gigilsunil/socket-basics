function getParamValuesByName (querystring) {
	//console.log(querystring);
  var qstring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < qstring.length; i++) {
    var urlparam = qstring[i].split('=');
    if (urlparam[0] == querystring) {
       return decodeURIComponent(urlparam[1].replace(/\+/g, ' ')); // / indicated beginning and end
       // \ to escape the + character , g globally replace its
    }
  }
  return undefined;
}

