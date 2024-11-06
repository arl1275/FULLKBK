import { Request, Response, NextFunction, Router } from "express";
import { verificarToken } from "../middleware/middleware.user";
import { createssheetcontroller } from "../controller/servicesheet.controller";
const routershet = Router();

routershet.get('/dsheet' );

routershet.get('/gsheet', verificarToken, createssheetcontroller);

routershet.post('/csheet');

routershet.put('/upsheet');

export default routershet;