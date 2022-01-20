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
    this.router.get("/:id", this.controller.getUserById);
    this.router.get("/:param/:value", this.controller.getUserByUsername);
    this.router.post("/", this.controller.createUser);
    this.router.post("/login", this.controller.loginUser);
    this.router.put("/:id", this.controller.updateUser);
    this.router.delete("/:id", this.controller.deleteUser);
  }
}

const userRoute = new UserRoute();
export default userRoute.router;


