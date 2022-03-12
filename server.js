const http = require("http")
const { v4: uuidv4 } = require('uuid');
const errorHandle = require("./errorHandle");
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
  } else if (req.url == "/todos" && req.method == "DELETE") {
    todos.length = 0;
    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "status": "success",
      "data": todos,
      "message": "Delete all"
    }));
    res.end()
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    const id = req.url.split("/").pop() //刪除陣列最後一個元素，並回傳值
    const index = todos.findIndex(el => el.id == id) //取符合條件元素的所在陣列索引
    todos.splice(index, 1) //index 刪除陣列位置, 1 為index開始後欲刪除的總數
    res.writeHead("200", headers)
    res.write(JSON.stringify({
      "status": "successful",
      "data": todos
    }));

    res.end()
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    const id = req.url.split("/").pop()
    const index = todos.findIndex(el => el.id == id)
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title
        if (title !== undefined){
          todos[index].title = title
          res.writeHead(200, headers)
          res.write(JSON.stringify({
            "status": "successful",
            "data": todos,
            "message":"修改一筆資料成功"
          }))
          res.end()
        }else{
          errorHaddle(res)
        }
      } catch (error) {
        errorHaddle(res)
      }
    })
  } else if (req.url == "/todos" && req.method == "POST") {

    req.on("end", () => {
      try {
        res.writeHead(200, headers);
        const title = JSON.parse(body).title
        if (title !== undefined) {
          todos.push({
            "title": title,
            "id": uuidv4()
          })
          res.write(JSON.stringify({
            "status": "successful",
            "data": todos
          }));
          res.end()
        } else {
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
      "message": "無此網站路由!!!"
    }))
    res.end()
  }

}
const server = http.createServer(requestListener)
server.listen(process.env.PORT || 3005)
