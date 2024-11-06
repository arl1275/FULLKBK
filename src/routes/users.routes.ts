import { Request, Response, Router } from "express";
import { loginController, logoutController, upuserController, valuserController } from "../controller/user.controller";
const routeruser = Router();

routeruser.get('/log', loginController);

routeruser.get('/logout', logoutController);

routeruser.post('/upuser', upuserController);

routeruser.get('/adminvaluser', valuserController);

export default routeruser;