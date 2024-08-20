import Express from "express";
import Keyv from "keyv";
import next from "next";
import ping from "ping";
import api from "./api";
import { basePath } from "../next.config.js";

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();
const cron = require("node-cron");

(async () => {
  try {
    await app.prepare();

    const server = Express();

    server.set("trust proxy", true);
    server.use(Express.json());

    server.use(`${basePath}/api`, api);

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
})();

cron.schedule("* * * * *", async () => {
  const now = new Keyv("sqlite:/../attend.sqlite", { table: "now" });
  const pastTables = new Keyv("sqlite:/../attend.sqlite", {
    table: "past_tables",
  });
  var data = [];
  for (let i = 1; i < 38; i++) {
    const num = i.toString();
    const seat = await now.get(num);
    data.push(seat);
  }
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}T${hour}:${minute}`;
  console.log(dateString);
  pastTables.set(dateString, data);

  //nowのなかのonlineのパソコンにpingを送ってオフラインになったら、nowの中のonlineをfalseにする

  for (let i = 1; i < 38; i++) {
    const num = i.toString();
    const seat = await now.get(num);
    if (seat.online) {
      const host: string = "10.5.25." + num;
      ping.sys.probe(host, (isAlive: boolean | null) => {
        if (!isAlive) {
          fetch(`http://localhost:3000/api/attend/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ip: "10.5.25." + num,
              status: "offline",
              reg_type: "pccclient",
              name: seat.name,
            }),
          });
        }
      });
    }
  }
});
