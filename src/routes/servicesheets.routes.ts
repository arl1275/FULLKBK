import { Request, Response, NextFunction, Router } from "express";
import { verificarToken } from "../middleware/middleware.user";
import { createssheetcontroller, updatesheetcontroller, deletesheetcontroller, getssheetcontroller } from "../controller/servicesheet.controller";
const routershet = Router();

//delete Service Order
routershet.get('/deleteservicesheet', verificarToken, deletesheetcontroller);

//Generate Service Order
routershet.get('/getservicesheet', verificarToken, getssheetcontroller);

//Read Service Order
routershet.post('/createservicesheet', verificarToken, createssheetcontroller);

//Update Service Order
routershet.put('/updateservicesheet', verificarToken, updatesheetcontroller);

export default routershet;