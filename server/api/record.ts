import express from "express";
const Database = require("better-sqlite3");

const router = express.Router();

router.get("/count", async (req, res) => {
  try {
    const db = new Database("attend.sqlite", { verbose: console.log });
    const result = db.prepare("SELECT COUNT(*) AS count FROM attend").get();
    db.close();
    res.status(200).json({ count: result.count });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize as string, 10);
    const currentPage = parseInt(req.query.currentPage as string, 10);
    const pc = req.query.pc as string;
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const userSearch = req.query.userSearch as string;
    const offset = (currentPage - 1) * pageSize;
    const db = new Database("attend.sqlite", { verbose: console.log });

    let stmt = "SELECT * FROM attend WHERE 1=1";
    let params: any = {};
    if (pc) {
      const pcArray = pc.split(",");
      stmt += " AND seat_num IN (" + pcArray.map((n) => "?").join(",") + ")";
      params = { ...params, ...pcArray };
    }

    if (userSearch) {
      stmt += " AND name LIKE LOWER(?)";
      const searchParam = `%${userSearch}%`.toLowerCase();
      params = { ...params, searchParam };
    }

    if (startDate && endDate) {
      stmt +=
        " AND created_at BETWEEN strftime('%Y-%m-%d %H:%M:%S', ?, 'unixepoch') AND strftime('%Y-%m-%d %H:%M:%S', ?, 'unixepoch')";
      params = { ...params, startDate, endDate };
    } else if (startDate) {
      stmt += " AND created_at > strftime('%Y-%m-%d %H:%M:%S', ?, 'unixepoch')";
      params = { ...params, startDate };
    }

    stmt += " ORDER BY created_at DESC LIMIT ? OFFSET ?";

    params = { ...params, pageSize, offset };

    const queryResult = db.prepare(stmt).all(Object.values(params));

    db.close();
    res.status(200).json(queryResult);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

export default router;
