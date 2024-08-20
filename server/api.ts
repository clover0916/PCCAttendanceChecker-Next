// APIの処理、Routerを定義する
import express from "express";
import record from "./api/record";
import attend from "./api/attend";

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

router.use("/record", record);
router.use("/attend", attend);

export default router;
