import express from "express";
import requestIp from "request-ip";

const Database = require("better-sqlite3");
const Keyv = require("keyv");
const db = new Database("attend.sqlite", { verbose: console.log });
const now = new Keyv("sqlite:/../attend.sqlite", { table: "now" });

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).json({ version: "1.0.1" });
});

router.post("/register", async (req, res) => {
  if (!(req.body.status == "online" || req.body.status == "offline")) {
    res.status(400).json({
      message: [
        "This request is not valid.",
        "The 'status' value has invalid format. It should be a valid 'status', 'online' or 'offline'.",
      ],
    });
    return;
  } else if (!req.body.name) {
    res.status(400).json({
      message: ["This request is not valid.", "'name' is required."],
    });
    return;
  } else if (
    !(req.body.reg_type == "pccclient" || req.body.reg_type == "manual")
  ) {
    res.status(400).json({
      message: [
        "This request is not valid.",
        "The 'reg_type' value has invalid format. It should be a valid 'reg_type', 'pccclient' or 'manual'.",
      ],
    });
    return;
  }

  const status = req.body.status;
  const name = req.body.name;
  const reg_type = req.body.reg_type;

  if (reg_type == "manual") {
    const ip_row = req.body.ip;
    const seat_num = ip_row.split(".")[3];
    const timestamp = `${req.body.date} ${req.body.time}`;
    db.prepare(
      "INSERT INTO attend (name, ip, seat_num, status, reg_type, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(name, ip_row, seat_num, status, reg_type, timestamp);
    for (const row of db.prepare("SELECT * FROM attend").iterate())
      console.log(row);
    res.status(200).json({ status: "OK" });
  } else {
    var ip_row = requestIp.getClientIp(req);
    if (req.body.ip) ip_row = req.body.ip;
    if (!ip_row) return res.status(400).json({ status: "NG" });
    const seat_num = ip_row.split(".")[3];

    const now_time = new Date().toLocaleString("ja");

    const seat = {
      online: status == "online" ? true : false,
      date: now_time,
      name: name,
    };

    (async () => {
      await now.set(seat_num, seat);
      const temp = await now.get(seat_num);
      console.log(temp);
    })();

    db.prepare(
      "INSERT INTO attend (name, ip, seat_num, status, reg_type) VALUES (?, ?, ?, ?, ?)"
    ).run(name, ip_row, seat_num, status, reg_type);
    for (const row of db.prepare("SELECT * FROM attend").iterate())
      console.log(row);
    res.status(200).json({ status: "OK" });
  }
});

router.get("/fetch", async (req, res) => {
  if (req.query.date) {
    const date = req.query.date;
    const pastTables = new Keyv("sqlite:/../attend.sqlite", {
      table: "past_tables",
    });
    const seats = await pastTables.get(date);
    if (!seats) {
      res.status(200).json({ result: "No data" });
      return;
    }
    res.status(200).json(seats);
  } else {
    const now = new Keyv("sqlite:/../attend.sqlite", { table: "now" });
    var data = [];
    for (let i = 1; i < 38; i++) {
      const num = i.toString();
      const seat = await now.get(num);
      data.push(seat);
    }
    res.status(200).json({ data: data });
  }
});

export default router;
