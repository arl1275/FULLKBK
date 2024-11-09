import { Request, Response, NextFunction, Router } from "express";
import { verificarToken } from "../middleware/middleware.user";
import { createssheetcontroller } from "../controller/servicesheet.controller";
const routershet = Router();

//delete Service Order
routershet.get('/dsheet', verificarToken, );

//Generate Service Order
routershet.get('/gsheet', verificarToken, createssheetcontroller);

//Read Service Order
routershet.post('/rsheet', verificarToken,);

//Update Service Order
routershet.put('/upsheet', verificarToken,);

export default routershet;