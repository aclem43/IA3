import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { processWebData } from "./traffic";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const apikey = process.env.APIKEY;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/webcams", (req: Request, res: Response) => {
  fetch(`https://api.qldtraffic.qld.gov.au/v1/webcams/?apikey=${apikey}`)
    .then((data) => data.json())
    .then((data) => res.send(processWebData(data)));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
