import { Request, Response, NextFunction, Router } from "express";
import { createheadsheetcontroller, updateheadsheetcontroller, getsheadsheetcontroller, deleteheadsheetcontroller } from "../controller/headsheet.controller";
const headsheetrouter = Router();

headsheetrouter.get('/getheadsheet', getsheadsheetcontroller );

headsheetrouter.get('/updateheadsheet', updateheadsheetcontroller);

headsheetrouter.post('/createheadsheet', createheadsheetcontroller);

headsheetrouter.get('/deletecreateheadsheet', deleteheadsheetcontroller);

export default headsheetrouter;