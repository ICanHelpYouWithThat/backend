import http from 'http';

export default (destination) => ((request, response) => {
    // Create http server to destination
    const proxy = http.createClient(80, destination);

    // Proxy incoming request with headers.
    const proxy_request = proxy.request(request.method, request.url, request.headers);

    // Listen and proxy the chunks data.
    proxy_request.addListener('response', function (proxy_response) {
        proxy_response.addListener('data', function(chunk) {
            response.write(chunk, 'binary');
        });
        proxy_response.addListener('end', function() {
            response.end();
        });
        response.writeHead(proxy_response.statusCode, proxy_response.headers);
    });

    request.addListener('data', function(chunk) {
        proxy_request.write(chunk, 'binary');
    });

    // End when stream ends
    request.addListener('end', function() {
        proxy_request.end();
    });
});