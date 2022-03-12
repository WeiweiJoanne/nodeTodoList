const http = require("http")
const { v4: uuidv4 } = require('uuid');
const errorHaddle = require('./errorHandle');
const todos = []
console.log("start");
const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk
  })


  if (req.url == "/todos" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "status": "success",
      "data": todos
    }));
    res.end()
  } else if (req.url == "/todos" && req.method == "POST") {

    req.on("end", () => {

      try {
        res.writeHead(200, headers);
        const title = JSON.parse(body).title
        if (title !== undefined ){
          todos.push({
            "title": title,
            "id": uuidv4()
          })
          res.write(JSON.stringify({
            "status": "successful",
            "data": todos
          }));
          res.end()
        }else{
          errorHaddle(res)
        }
       
      } catch (error) {
        errorHaddle(res)
      }

    });

  } else if (req.method == "OPTIONS") {
    res.writeHead("200", headers)
    res.end()
  } else {
    res.writeHead(404, headers)
    res.write(JSON.stringify({
      "status": "fail",
      "message": "error!!!"
    }))
    res.end()
  }

}
const server = http.createServer(requestListener)
server.listen(3005)
