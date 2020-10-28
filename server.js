var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
//var cors = require("cors");
var express=require("express");
var bodyParser=require("body-parser");
var router = express.Router();

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');
const doc = new GoogleSpreadsheet('1f4wDZe5M96BUvNRAkjuxnPQ284cy4En_pYX23bDrqqY');

async function accessSpreadsheet(jsonData) {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo();

  //var data = JSON.stringify(Object.keys(jsonData)[0]);
  var data = jsonData.replace(/%2C/g, ",");
  const sheet = doc.sheetsByIndex[0];
  console.log(sheet.rowCount);

  const testRow = await sheet.addRow({'ID': data.substring(data.search("id") + 3, data.search("100a") - 1) , '100aSens': data.substring(data.search("100a") + 5, data.search("100b") - 1).split(",")[0], '100aIntr': data.substring(data.search("100a") + 5, data.search("100b") - 1).split(",")[1], '100aWarm': data.substring(data.search("100a") + 5, data.search("100b") - 1).split(",")[2],
                                      '100bSens': data.substring(data.search("100b") + 5, data.search("100c") - 1).split(",")[0], '100bIntr': data.substring(data.search("100b") + 5, data.search("100c") - 1).split(",")[1], '100bWarm': data.substring(data.search("100b") + 5, data.search("100c") - 1).split(",")[2],
                                      '100cSens': data.substring(data.search("100c") + 5, data.search("104a") - 1).split(",")[0], '100cIntr': data.substring(data.search("100c") + 5, data.search("104a") - 1).split(",")[1], '100cWarm': data.substring(data.search("100c") + 5, data.search("104a") - 1).split(",")[2],
                                      '104aSens': data.substring(data.search("104a") + 5, data.search("104b") - 1).split(",")[0], '104aIntr': data.substring(data.search("104a") + 5, data.search("104b") - 1).split(",")[1], '104aWarm': data.substring(data.search("104a") + 5, data.search("104b") - 1).split(",")[2],
                                      '104bSens': data.substring(data.search("104b") + 5, data.search("104c") - 1).split(",")[0], '104bIntr': data.substring(data.search("104b") + 5, data.search("104c") - 1).split(",")[1], '104bWarm': data.substring(data.search("104b") + 5, data.search("104c") - 1).split(",")[2],
                                      '104cSens': data.substring(data.search("104c") + 5, data.search("115a") - 1).split(",")[0], '104cIntr': data.substring(data.search("104c") + 5, data.search("115a") - 1).split(",")[1], '104cWarm': data.substring(data.search("104c") + 5, data.search("115a") - 1).split(",")[2],
                                      '115aSens': data.substring(data.search("115a") + 5, data.search("115b") - 1).split(",")[0], '115aIntr': data.substring(data.search("115a") + 5, data.search("115b") - 1).split(",")[1], '115aWarm': data.substring(data.search("115a") + 5, data.search("115b") - 1).split(",")[2],
                                      '115bSens': data.substring(data.search("115b") + 5, data.search("115c") - 1).split(",")[0], '115bIntr': data.substring(data.search("115b") + 5, data.search("115c") - 1).split(",")[1], '115bWarm': data.substring(data.search("115b") + 5, data.search("115c") - 1).split(",")[2],
                                      '115cSens': data.substring(data.search("115c") + 5, data.search("132a") - 1).split(",")[0], '115cIntr': data.substring(data.search("115c") + 5, data.search("132a") - 1).split(",")[1], '115cWarm': data.substring(data.search("115c") + 5, data.search("132a") - 1).split(",")[2],
                                      '132aSens': data.substring(data.search("132a") + 5, data.search("132b") - 1).split(",")[0], '132aIntr': data.substring(data.search("132a") + 5, data.search("132b") - 1).split(",")[1], '132aWarm': data.substring(data.search("132a") + 5, data.search("132b") - 1).split(",")[2],
                                      '132bSens': data.substring(data.search("132b") + 5, data.search("132c") - 1).split(",")[0], '132bIntr': data.substring(data.search("132b") + 5, data.search("132c") - 1).split(",")[1], '132bWarm': data.substring(data.search("132b") + 5, data.search("132c") - 1).split(",")[2],
                                      '132cSens': data.substring(data.search("132c") + 5, data.lastIndexOf(",") + 2).split(",")[0], '132cIntr': data.substring(data.search("132c") + 5, data.lastIndexOf(",") + 2).split(",")[1], '132cWarm': data.substring(data.search("132c") + 5, data.lastIndexOf(",") + 2).split(",")[2]
                                      });
}

var app=express();
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// Process application/json
//app.use(cors());
app.use(bodyParser.json());

router.get('/', function(request, response) {
    fs.readFile(__dirname + '/intro.ejs', function(error, data) {
    if (error) {
      response.writeHead(404);
      console.log("Tried to go to intro");
      response.writeHead(error);
      response.end();
    }
    else {
      console.log("intro loaded");
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
    response.write(data);
    response.end();
    }
  })
});

router.get('/home.ejs', function(request, response) {
    fs.readFile(__dirname + '/home.ejs', function(error, data) {
    if (error) {
      response.writeHead(404);
      console.log("Tried to go to home");
      response.writeHead(error);
      response.end();
    }
    else {
      console.log("home loaded");
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
    response.write(data);
    response.end();
    }
  })
});

router.get('/style.css', function(request, response) {
    fs.readFile(__dirname + '/style.css', function(error, data) {
    if (error) {
      response.writeHead(404);
      response.writeHead(error);
      response.end();
    }
    else {
      response.writeHead(200, {
        'Content-Type': 'text/css'
      });
    response.write(data);
    response.end();
    }
  })
});
app.post('', function(req, res) {
  //now req.body will be populated with the object you sent
  //console.log(req.body);
  accessSpreadsheet(req.body);
  res.sendStatus(200);
});
app.use(router);
app.listen(41730);

/*
var server = http.createServer(function(request, response) {
    var paths = url.parse(request.url).pathname;
    if (request.method === "POST") {
	console.log("POST request received");
	var body = '';
	request.on('data', function (data) {
	    body += data;
	});
	request.on("end", function() {
	    response.writeHead(200, { "Content-Type": "text/html" });
	    accessSpreadsheet(body);
	    response.end(body);
	});
    }
    switch (paths) {
        case '/':
	    fs.readFile(__dirname + '/intro.html', function(error, data) {
		if (error) {
		    response.writeHead(404);
		    console.log("Tried to go to intro");
		    response.writeHead(error);
		    response.end();
		    }
		else {
		    console.log("intro loaded");
		    response.writeHead(200, {
			'Content-Type': 'text/html'
		    });
		    response.write(data);
		    response.end();
		}
	});
        break;
/*	case '/':
	response.writeHead(200, {
	    'Content-Type': 'text/plain'
	    });
	response.write("this is test message.");
	response.end();
	break;

    case '/favicon.ico':
            response.writeHead(404);
            response.end();
            break;
        case '/home.html':
            fs.readFile(__dirname + paths, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    console.log("page loaded");
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/intro.html/':
            fs.readFile(__dirname + '/intro.html', function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/style.css':
            fs.readFile(__dirname + paths, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/css'
                    });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/Part1.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
                if (error) {
                    throw error;
                }
                else {
                    var total = data.length;

                    var range = request.headers.range;

                    var positions = range.replace(/bytes=/, "").split("-");
                    var start = parseInt(positions[0], 10);
                    // if last byte position is not present then it is the last byte of the video file.
                    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                    var chunksize = (end-start)+1;

                    response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                         "Accept-Ranges": "bytes",
                                         "Content-Length": chunksize,
                                         "Content-Type":"video/mp4"});
                    response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/Part2.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
                if (error) {
                    throw error;
                }
                else {
                    var total = data.length;

                    var range = request.headers.range;

                    var positions = range.replace(/bytes=/, "").split("-");
                    var start = parseInt(positions[0], 10);
                    // if last byte position is not present then it is the last byte of the video file.
                    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                    var chunksize = (end-start)+1;

                    response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                         "Accept-Ranges": "bytes",
                                         "Content-Length": chunksize,
                                         "Content-Type":"video/mp4"});
                    response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/Part3.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
                if (error) {
                    throw error;
                }
                else {
                    var total = data.length;

                    var range = request.headers.range;

                    var positions = range.replace(/bytes=/, "").split("-");
                    var start = parseInt(positions[0], 10);
                    // if last byte position is not present then it is the last byte of the video file.
                    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                    var chunksize = (end-start)+1;

                    response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                         "Accept-Ranges": "bytes",
                                         "Content-Length": chunksize,
                                         "Content-Type":"video/mp4"});
                    response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/Part4.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
                if (error) {
                    throw error;
                }
                else {
                    var total = data.length;

                    var range = request.headers.range;

                    var positions = range.replace(/bytes=/, "").split("-");
                    var start = parseInt(positions[0], 10);
                    // if last byte position is not present then it is the last byte of the video file.
                    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                    var chunksize = (end-start)+1;

                    response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                         "Accept-Ranges": "bytes",
                                         "Content-Length": chunksize,
                                         "Content-Type":"video/mp4"});
                    response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/Part5.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
                if (error) {
                    throw error;
                }
                else {
                    var total = data.length;

                    var range = request.headers.range;

                    var positions = range.replace(/bytes=/, "").split("-");
                    var start = parseInt(positions[0], 10);
                    // if last byte position is not present then it is the last byte of the video file.
                    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                    var chunksize = (end-start)+1;

                    response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                       "Accept-Ranges": "bytes",
                                       "Content-Length": chunksize,
                                       "Content-Type":"video/mp4"});
                    response.end(data.slice(start, end+1), "binary");
              }
            });
            break;
        case '/Part6.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
                if (error) {
                    throw error;
                }
                else {
                    var total = data.length;

                    var range = request.headers.range;

                    var positions = range.replace(/bytes=/, "").split("-");
                    var start = parseInt(positions[0], 10);
                    // if last byte position is not present then it is the last byte of the video file.
                    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                    var chunksize = (end-start)+1;

                    response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                         "Accept-Ranges": "bytes",
                                         "Content-Length": chunksize,
                                         "Content-Type":"video/mp4"});
                    response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/Part7.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
                if (error) {
                    throw error;
                }
                else {
                    var total = data.length;

                    var range = request.headers.range;

                    var positions = range.replace(/bytes=/, "").split("-");
                    var start = parseInt(positions[0], 10);
                    // if last byte position is not present then it is the last byte of the video file.
                    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                    var chunksize = (end-start)+1;

                    response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                          "Accept-Ranges": "bytes",
                                          "Content-Length": chunksize,
                                          "Content-Type":"video/mp4"});
                    response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/Part8.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/Part9.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/100a.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/100b.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/100c.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/104a.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                    // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/104b.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/104c.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/115a.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/115b.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/115c.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/132a.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/132b.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;
        case '/132c.mp4':
            fs.readFile(__dirname + paths, function (error, data) {
            if (error) {
                throw error;
            }
            else {
                var total = data.length;

                var range = request.headers.range;

                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                // if last byte position is not present then it is the last byte of the video file.
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = (end-start)+1;

                response.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                      "Accept-Ranges": "bytes",
                                      "Content-Length": chunksize,
                                      "Content-Type":"video/mp4"});
                response.end(data.slice(start, end+1), "binary");
                }
            });
            break;

        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
});
server.timeout = 500000;
server.listen(42730);
console.log("sercer running at http://127.0.0.1:42730/");*/
