const http = require("http")
const { v4: uuidv4 } = require('uuid');
const data = [
  {
    "title":"刷牙",
    "id": uuidv4()
  },
  {
    "title": "洗臉",
    "id": uuidv4()
  }
]
const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }
  
  console.log(req.url);
  if (req.url == "/todos" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "status":"success",
      "data": data
    }));
    console.log("getData");
  } else if (req.method == "OPTIONS") {
    res.writeHead("200", headers)
  } else {
    res.writeHead(404, headers)
    res.write(JSON.stringify({
      "status": "fail",
      "message":"error!!!"
    }))
  }

  res.end()
}
const server = http.createServer(requestListener)
server.listen(3005)
