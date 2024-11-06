import { Request, Response } from "express";
import { createsheetservice } from "../service/servicesheet.service";

export const createssheetcontroller = (req : Request, res : Response) =>{ createsheetservice(req, res)}

export const getssheetcontroller = (req : Request, res : Response) =>{}

export const deletesheetcontroller = (req : Request, res : Response) =>{}

export const updatesheetcontroller = (req : Request, res : Response) =>{}