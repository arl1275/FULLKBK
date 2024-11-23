import { Request, Response } from "express";
import { createsheetservice, updatesheetservice, getsheetservice, deletesheetservice } from "../service/servicesheet.service";

export const createssheetcontroller = async (req : Request, res : Response) =>{ await createsheetservice(req, res)}

export const getssheetcontroller = async (req : Request, res : Response) =>{ await getsheetservice(req, res)}

export const deletesheetcontroller = async (req : Request, res : Response) =>{ await deletesheetservice(req, res)}

export const updatesheetcontroller = async (req : Request, res : Response) =>{ await updatesheetservice(req, res)}; 