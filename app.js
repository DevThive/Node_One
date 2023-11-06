const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

//mongodb connnect
const connect = require("./schemas");
connect();

//product router
const productRouter = require("./routes/products.router.js");

app.use(express.json());

app.use("/api", [productRouter]);

app.get("/", (req, res) => {
  res.send("main Homepage");
});

// 정상적으로 포트가 실행되었는지 확인
app.listen(PORT, () => {
  console.log(PORT, "포트가 실행되었습니다.");
});
