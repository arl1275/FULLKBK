import express, { Request, Response } from 'express';
import routeruser from './src/routes/users.routes';
import routershet from './src/routes/servicesheets.routes';
import headsheetrouter from './src/routes/headsheet.routes';
import servicesheetdatarouter from './src/routes/servicesheetdata.routes';
import coutingrouter from './src/routes/countingservice.routes';
import connDB from './src/utils/DB/dbconn';

const app = express();
const PORT = 3000;
connDB;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', routeruser);
app.use('/api/protected', routershet, headsheetrouter, servicesheetdatarouter, coutingrouter);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});