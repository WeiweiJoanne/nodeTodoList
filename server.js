const http = require("http")
const { v4: uuidv4 } = require('uuid');
const todos = []
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
      res.writeHead(200, headers);
      const title = JSON.parse(body).title
      console.log(title);
      todos.push({
        "title": title,
        "id": uuidv4()
      })
      res.write(JSON.stringify({
        "status": "success",
        "data": todos
      }));
      console.log("second end");
      res.end()
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

  // res.end()
}
const server = http.createServer(requestListener)
server.listen(3005)
