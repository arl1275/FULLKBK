import { Request, Response, NextFunction, Router } from "express";
const routeruser = Router();

routeruser.get('/log');

routeruser.get('/logout');

routeruser.post('/upuser');