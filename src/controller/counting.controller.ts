import { Request, Response } from "express";
import { createcouting, updatecouting, deletecouting, getcouting } from "../service/couting.service";

export const createcoutingcontroller = async (req : Request, res : Response) =>{ await createcouting(req, res)}

export const getscoutingcontroller = async (req : Request, res : Response) =>{ await getcouting(req, res)}

export const deletecoutingcontroller = async (req : Request, res : Response) =>{ await deletecouting(req, res)}

export const updatecoutingcontroller = async (req : Request, res : Response) =>{ await updatecouting(req, res)}; 