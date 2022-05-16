const path = require("path");
const compression = require("compression");
const express = require("express");

const app = express();
app.use(compression());
//设置缓存
const options = {
  maxAge: 30 * 24 * 60 * 60 * 1000, //Number类型
  // 此处可以使用 ms 格式
  // (https://www.npmjs.org/package/ms)中的字符串格式
};
app.use((req, res, next) => {
  // 将 index.html 设为 no-cache
  if (req.url === "/" || req.url.includes("editor.html")) {
    res.setHeader("Cache-control", "no-cache");
  }

  next();
});

app.use(express.static(path.join(__dirname, "dist"), options));

app.listen(8081, function () {
  console.log("server is running on 8081");
});

app.on("connection", function (socket) {
  console.log("A new connection was made by a client.");
  socket.setTimeout(30 * 1000);
  // 30 second timeout. Change this as you see fit.
});
