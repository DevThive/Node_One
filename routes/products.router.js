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
  const { password, product, user_name, state } = req.body;

  const good = await Products.find({ Product_Name: productId });

  if (good) {
    if (good.length) {
      if (good[0].Password === password) {
        await good.updateOne(
          { Product_Name: productId },
          { $set: { Product: product, User_Name: user_name, State: state } }
        );
      }
    } else {
      res.send({ message: "상품이 존재하지 않습니다." });
    }
  }
});

router.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { password } = req.body.Password;

  //   console.log(productId);

  const good = await Products.find({
    Product_Name: productId,
  });

  //res.send(String(good[0].Password));

  if (good) {
    console.log(good[0].Password);
    if (String(good[0].Password == req.body.Password)) {
      await Products.deleteOne({ Product_Name: productId });
      res.send({ message: "success" });
    } else {
      res.send({ message: "비밀번호를 확인해주세요" });
    }
  }

  //   if (good) {
  //     if (good.Password === Ch_password) {
  //       await Products.deleteOne({ Product_Name: productId });
  //       res.send({ message: "success" });
  //     } else if(good.length){

  //     } else {
  //       res.send({ message: "Error" });
  //     }
  //   }

  //   Products.findOne({ Product_Name: productId }).then((good) => {
  //     if (good.length) {
  //       if (req.body.Password === good.Password) {
  //         res.send({ message: "success" });
  //       }
  //     } else {
  //       res.send({ message: "상품이 없습니다." });
  //     }
  //   });
});

module.exports = router;
