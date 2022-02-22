// start by navigating to the folder, and type 'node ../simple-http-file-server'
// access the app from you browser at http://localhost:8080/ (add any arbitrary path)

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

// use log util
const log = require('log-util');

// custom module
const km = require('./kundu-module')();

var server = http.createServer((req, res) => {
	console.log(req.url);
    
    log.debug('debug', 0);
    log.info('info', 1);
    log.success('success', 2);
    log.warn('warn', 3);
    log.error('error', 4);

    // parse the URL into its component parts
	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
	console.log(parsedUrl);
    // extract the pathname and query properties
	const { pathname } = parsedUrl;
    
    // parse the URL into its component parts
    const parsedUrl2 = url.parse(req.url, true);
    console.log(parsedUrl2);
    // extract the pathname and query properties
    const { query } = parsedUrl2;
    console.log('query string arguments from the URL: ');
    console.log(query);

	// output absolute path info
	console.log('__dirname is %s', __dirname);
	console.log('cwd is %s', process.cwd());
    
    // Extract the filename extension
    //  then set the mimetype if it is known
    var contentType = km.getContentType(pathname);

	// Create an absolute path to the requested file.
	// Assume the server was started from the webroot
	const absolute_path_to_file = path.join(__dirname, 'htdocs', pathname);
	console.log('absolute_path_to_file is %s', absolute_path_to_file);

	fs.readFile(absolute_path_to_file, (err, data) => {
		  if (err) {
	      console.log(err);
	      if (err.code == 'ENOENT'){
	        // file does not exist - we should return a 404 status code
					console.log('404 error getting ' + pathname);
					res.writeHead(404, {"Content-Type": contentType});
					res.end('404: Page Not Found!');
	      } else if (err.code == 'EISDIR'){
	        // this is actually a directory - we should create a directory listing
					console.log('directory listing ' + pathname);
					fs.readdir(absolute_path_to_file, (err, files)=>{
						if (err) {
							res.writeHead(500, {"Content-Type": contentType});
							res.end('Server Error 500');
						}
						let s = '<b>Directory Listing</b><br>';
						files.forEach((i)=>{
							s += (i + "<br>");
						});
						res.writeHead(200, {"Content-Type": contentType});
						res.end(s, 'utf8');
					});
	      }
	    } else {
		    // If we get to here, 'data' should contain the contents of the file
            res.writeHead(200, {"Content-Type": contentType});

            res.end(data, 'binary', ()=>{
                console.log("file delivered: " + pathname);
            });
		}
	});
});

var port = 8081;
server.listen(port, () => {
  console.log("Listening on " + port);
});
