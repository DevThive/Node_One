const express = require("express");
const router = express.Router();

const Products = require("../schemas/products.schema.js");

// 모든 상품 리스트 조회하기
router.get("/products", async (req, res) => {
  const product = await Products.find({});
  res.send(product);
});

//특정 상품 조회하기
router.get("/products/:productId", (req, res) => {
  const { productId } = req.params;

  console.log(productId);

  Products.findOne({ Product_Name: productId }).then((good) => {
    if (!good)
      return res.status(400).json({ message: "상품 조회에 실패하였습니다." });
    res.json({ good });
  });
});

//상품 등록 (date, state 은 default를 이용)
router.post("/products/", async (req, res) => {
  const { Product_Name, Product, User_Name, Password } = req.body;

  const products = Products.find({ Product_Name });

  if (products.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 GoodsId입니다.",
    });
  }

  const createProducts = await Products.create({
    Product_Name,
    Product,
    User_Name,
    Password,
  });

  res.json({ products: createProducts });
});

router.put("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  const { password, Product, User_Name, State } = req.body;
});

router.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { Ch_password } = req.body.password;

  //   console.log(productId);

  const good = await Products.find({
    Product_Name: productId,
  });
  //   //   const pass = await Products.findOne({ password: Password });

  //res.json({ test: good });

  if (Number(Ch_password) === good) {
    res.send({ message: "success" });
  }

  //   Products.findOne({ User_Name: productId }).then((good) => {
  //     if (Number(Ch_password) === good.password) {
  //       Products.deleteOne(good, (err) => {
  //         if (err) return res.status(400).json({ message: err });
  //         res.status(200).json({ message: "삭제성공" });
  //       });
  //     }
  //   });
});

module.exports = router;
