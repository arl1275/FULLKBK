import { Router } from "express";
import { verificarToken } from "../middleware/middleware.user";
import { createcoutingcontroller, updatecoutingcontroller, deletecoutingcontroller, getscoutingcontroller } from "../controller/counting.controller";
const coutingrouter = Router();

coutingrouter.get('/getcouting', verificarToken, getscoutingcontroller );

coutingrouter.put('/updatecouting', verificarToken, updatecoutingcontroller);

coutingrouter.post('/createcouting', verificarToken, createcoutingcontroller);

coutingrouter.delete('/deletecouting', verificarToken, deletecoutingcontroller);

export default coutingrouter;