import express, { Request, Response } from 'express';
import routeruser from './src/routes/users.routes';
import routershet from './src/routes/servicesheets.routes';
import headsheetrouter from './src/routes/headsheet.routes';
import connDB from './src/utils/DB/dbconn';

const app = express();
const PORT = 3000;
connDB;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routeruser);
app.use('/api/protected', routershet, headsheetrouter);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});