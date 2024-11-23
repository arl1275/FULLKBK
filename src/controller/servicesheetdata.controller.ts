import { Request, Response } from "express";
import { createservicesheetdata, updateservicesheetdata, deleteservicesheetdata, getservicesheetdata } from "../service/servicesheetdata.service";

export const createservicesheetdatacontroller = async (req : Request, res : Response) =>{ await createservicesheetdata(req, res)}

export const getsservicesheetdatacontroller = async (req : Request, res : Response) =>{ await getservicesheetdata(req, res)}

export const deletservicesheetdatacontroller = async (req : Request, res : Response) =>{ await deleteservicesheetdata(req, res)}

export const updateservicesheetdatacontroller = async (req : Request, res : Response) =>{ await updateservicesheetdata(req, res)}; 