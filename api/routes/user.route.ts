import { Router } from "express";
import { UserController } from "../controllers/user.controller";

class UserRoute {
  router: Router;
  controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.routes();
  }

  routes() {
    this.router.get("/", this.controller.getAllUsers);
  }
}

const userRoute = new UserRoute();
export default userRoute.router;


