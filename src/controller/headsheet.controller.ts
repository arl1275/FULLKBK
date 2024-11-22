import { Request, Response } from "express";
import { createheadsheetservice, updateheadsheetservice, deleteheadsheetservice, getheadsheetservice } from "../service/headsheet.service";

export const createheadsheetcontroller = async (req : Request, res : Response) =>{ await createheadsheetservice(req, res)};

export const getsheadsheetcontroller = async (req : Request, res : Response) =>{ await getheadsheetservice(req, res)};

export const deleteheadsheetcontroller = async (req : Request, res : Response) =>{ await deleteheadsheetservice(req, res)};

export const updateheadsheetcontroller = async (req : Request, res : Response) =>{ await updateheadsheetservice(req, res)};