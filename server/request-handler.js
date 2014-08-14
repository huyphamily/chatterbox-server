/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";
  
  if (request.url === '/classes/messages') {

    var statusCode = 200;

    /* Without this line, this server wouldn't work. See the note
     * below about CORS. */

    /* .writeHead() tells our server what HTTP status code to send back */

    /* Make sure to always call response.end() - Node will not send
     * anything back to the client until you do. The string you pass to
     * response.end() will be the body of the response - i.e. what shows
     * up in the browser.*/

    // if client is sending a post request
    if( request.method === 'POST'){
      response.writeHead(201, headers);
      //turning data to string
      var allData = '';
      request.on('data', function(data) {
        console.log(data);
        allData += data;
      });
      //parse to object and place into results array of messages
      request.on('end', function() {
        var post = JSON.parse(allData);
        messages.results.push(post);
      });
    } else {
      //else (get request)
      response.writeHead(statusCode, headers);
    }
    response.end( JSON.stringify(messages) );
  } else if(request.url === '/classes/room1'){
    if(request.method === 'GET'){
      response.writeHead(200, headers);
      response.end('something');
    }
  } else{
    //404
    response.writeHead(404, headers);
    response.end('Error');
  }
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var messages = {
  results: []
};
