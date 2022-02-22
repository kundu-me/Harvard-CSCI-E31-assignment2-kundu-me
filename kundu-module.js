// custom module to return utils

const path = require('path');

var kunduModule = function () {
    return {
        // return the content type
        // retun empty if no content type
        getContentType: function (pathname) {
            const mimeTypes = {
                'html' : "text/html",
                'css'  : "text/css",
                'js'   : "text/javascript",
                'json' : "text/json",
                'png'  : "image/png",
                'jpg'  : "image/jpg",
                'jpeg' : "image/jpeg",
                
                '.html' : "text/html",
                '.css'  : "text/css",
                '.js'   : "text/javascript",
                '.json' : "text/json",
                '.png'  : "image/png",
                '.jpg'  : "image/jpg",
                '.jpeg' : "image/jpeg"
            };

            var contentType = 'text/plain';
            // Extract the filename extension
            //  then set the mimetype if it is known
            var extname = String(path.extname(pathname)).toLowerCase();
            contentType = mimeTypes[extname] || contentType;
            return contentType;
        }
    }
};

module.exports = kunduModule;
