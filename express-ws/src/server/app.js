import express from "express";
import cors from "cors";
import { errorHandler } from "../middlewares/errorHandler";
import controller from "../controller";
const app = express();

export function runServer() {
  const port = process.env.PORT;
  if (!port) throw Error("No defined port in .env");

  const server = app.listen(port, () =>
    console.log("server listening on port :", port)
  );

  app.use("*", cors());
  app.use("*", (req, _, next) => {
    console.log("request made to " + req.originalUrl);
    next();
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api", controller);
  app.use("*", (req,res,next) => {
    throw Error('no routes');
  });
  app.use(errorHandler);

  return { server };
}
