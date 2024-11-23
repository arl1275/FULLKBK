import { Router } from "express";
import { verificarToken } from "../middleware/middleware.user";
import { createservicesheetdatacontroller, updateservicesheetdatacontroller, deletservicesheetdatacontroller, getsservicesheetdatacontroller } from "../controller/servicesheetdata.controller";
const servicesheetdatarouter = Router();

servicesheetdatarouter.get('/getservicesheetdata', verificarToken, getsservicesheetdatacontroller);

servicesheetdatarouter.put('/updateservicesheetdata', verificarToken, updateservicesheetdatacontroller);

servicesheetdatarouter.post('/createservicesheetdata', verificarToken, createservicesheetdatacontroller);

servicesheetdatarouter.delete('/deleteservicesheetdata', verificarToken, deletservicesheetdatacontroller);

export default servicesheetdatarouter;