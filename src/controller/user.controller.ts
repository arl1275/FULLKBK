import { Request, Response} from "express";
import { LogService, outService, upService, valuserService } from "../service/user.service";

export const loginController = (req : Request, res : Response) =>{ LogService(req, res)}

export const logoutController = (req : Request, res : Response) =>{ outService(req, res)}

export const upuserController = (req : Request, res : Response) =>{ upService(req, res)};

export const valuserController = (req : Request, res : Response) =>{ valuserService(req, res)};