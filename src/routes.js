import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import MembroController from "./app/controllers/MembroController";
import FamiliaController from "./app/controllers/FamiliaController";
import ForgotPasswordController from "./app/controllers/ForgotPasswordController";
import ResetPasswordController from "./app/controllers/ResetPasswordController";

const routes = new Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes.post("/forgot-password", ForgotPasswordController.store);
routes.post("/reset-password/:token", ResetPasswordController.store);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

//routes.use(authMiddleware);
//familia
routes.post("/familias", FamiliaController.store);
routes.get("/familias", FamiliaController.index);
routes.get("/familias/:id", FamiliaController.show);
routes.delete("/familias/:id", FamiliaController.delete);
routes.put("/familias/:id", FamiliaController.update);

//membros
routes.post("/familias/membros", MembroController.store);
routes.delete("/familias/membros/:id", MembroController.delete);
routes.get("/familias/membros/:id", MembroController.show);
routes.get("/membros", MembroController.index);
routes.put("/familias/membro/:id", MembroController.update);
routes.get("/familias/:id/membros", FamiliaController.showMembros);

//usuarios
routes.put("/users", UserController.update);
routes.delete("/users/:id", UserController.delete);
routes.get("/users", UserController.index);

export default routes;
