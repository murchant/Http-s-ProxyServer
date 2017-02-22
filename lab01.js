var http = require('http');
var httpProxy = require("http-proxy");
var https = require('https');
var fs = require('fs');
var URL = require('url');
var url = require("url");
var url1 = require("url");
var net = require('net');
var fs = require('fs');
const readline = require('readline');
var findInFiles = require('find-in-files');
var noRequest=false;
var found = false;
var fs = require('fs')
var logger = fs.createWriteStream('out.txt', {
  flags: 'a' // preserve data
})

  // Read in Blacklist file and make Map object type, in order to speed up requests.
  var filename = 'out.txt';                   //text file containing all blacklisted url's.
  var data = fs.readFileSync(filename, 'utf8');
  	if (data === null) throw err;
  	var blockArr = data.split("\n");
  	var blacklistMap = blockArr.reduce(function(map,url)
  		{
  			map[url]=true;
  			return map;
  		},{})
  	console.log(blacklistMap)

var countByte=0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Management console> '
});


//Constantly prompt for use, when a user types "Blacklist <some url name>" 
//the url name will be blacklisted, the map is updated along with the text file.

rl.prompt();
rl.on('line', (line) => {
  var subArr = line.split(' ');
  switch(subArr[0]) {
    case 'Blacklist':
     var wr = subArr[1];
     blacklistMap[wr] = true;
     console.log(blacklistMap);
     logger.write(wr + "\n");
     countByte+=4;
	 console.log('BlackListed!')
    break;
  case 'UnBlacklist':
    var wr = subArr[1];
    blacklistMap[wr] = false;
    console.log('UnBlacklisted!!!!');
    break;
  default:
      console.log(`Not a valid command!'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Seee You Later !!!');
  process.exit(0);
});

  		// HTTP HTTP HTTP HTTP SERVER

var a = http.createServer(function (req, res) {
  noRequest=false;
  var urlObj = url.parse(req.url);
  var target = urlObj.protocol + "//" + urlObj.host;
 
  console.log("Proxying HTTP request for: " + target);

  if(!!blacklistMap[target])    //check if target url is in blacklist
  {
    noRequest=true;
  }
 
  if(noRequest==false)      // if target is not in blacklist execute request
  {

     url1 = req.url;
     var body = [];
     var {headers,method,url1} = req;
     var URL1 = require("url");
     var {hostname,host,port,path} = URL.parse(req.url);

     req.on('error', function(err) {                    // in event of error
      console.error(err);
      res.statusCode = 404; 
     res.write('something happened oh no');               
     res.end();
      })
     req.on('data', function(chunk) {                  
      body.push(chunk);
      })
    req.on('end', function() {                        // upon request end wirte data 

      http.request({headers,hostname,path,port,method,body},function(proxyResponse)
      {
        
        res.writeHead(proxyResponse.statusCode,proxyResponse.headers);
        proxyResponse.on('data',function(data)
        {
          res.write(data);
        })
        proxyResponse.on('end',()=>res.end())
      }).end()
    });
  	//proxy.web(req, res, {target: target});


  	
  }
  else                                              // if target is blacklisted display URL blacklisted page
  {
  	console.log("This url is blocked2");
  	res.end("<h1>This URL is BlackListed!!!!!</h1>");
  	
  	
  }
  
}).listen(9000);  

var regex_hostport = /^([^:]+)(:([0-9]+))?$/;

var getHostPortFromString = function (hostString, defaultPort) {      // function to get hosts information from request.
  var host = hostString;
  var port = defaultPort;

  var result = regex_hostport.exec(hostString);
  if (result != null) {
    host = result[1];
    if (result[2] != null) {
      port = result[3];
    }
  }

  return ( [host, port] );
};

a.addListener('connect', function (req, socket, bodyhead) {        // extended listner for https requests 
  found = false;
  var hostPort = getHostPortFromString(req.url, 443);
  var hostDomain = hostPort[0];
  var port = parseInt(hostPort[1]);
   
  if(!!blacklistMap[hostDomain])              // check if request is blacklisted
  {
  	
  	found=true;
 	  
  }

   if(found==false)                         // if not blacklisted, execute instruction
  {

  	console.log("Proxying HTTPS request for:", hostDomain, port);
  	var proxySocket = new net.Socket();
  	proxySocket.connect(port, hostDomain, function () {
      proxySocket.write(bodyhead);
      socket.write("HTTP/" + req.httpVersion + " 200 Connection established\r\n\r\n");
    }
  );

  proxySocket.on('data', function (chunk) {
    socket.write(chunk);
  });

  proxySocket.on('end', function () {

    socket.end();
  });

  proxySocket.on('error', function () {
    socket.write("HTTP/" + req.httpVersion + " 500 Connection error\r\n\r\n");
    socket.end();
  });

  socket.on('data', function (chunk) {
    proxySocket.write(chunk);
  });

  socket.on('end', function () {
    proxySocket.end();
  });

  socket.on('error', function () {
    proxySocket.end();
  });
  
  }write
  else
  {
  	console.log("This url is blocked!!!!!!");
  	
  	//proxySocket.write("<h1>This URL is BlackListed!!!!!</h1>");
  	socket.write("This url is blocked!!!!!!\r\n\r\n");
  	socket.end();
  } 
});











            

