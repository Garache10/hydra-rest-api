import Express from "express";
import Morgan from "morgan";
import Cors from "cors";
import "dotenv/config";

class Server {
  public app = Express.application;

  constructor() {
    this.app = Express();
    this.config();
    this.routes();
  }

  public config(): void {
    // Middlewares configuration
    this.app.use(Morgan("dev"));
    this.app.use(Express.json());
    this.app.use(Cors());

    // Settings
    this.app.set("port", process.env.APP_PORT || 3000);
  }

  public routes(): void {}

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
      console.log("Environment", process.env.NODE_ENV);
      console.log("Welcome to hydra-rest-api");
    });
  }
}

export { Server };
