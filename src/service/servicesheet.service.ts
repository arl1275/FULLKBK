import { Request, Response } from "express";

export const createsheetservice = ( req : Request, res : Response) =>{
    try {
        res.status(200).json({ message : 'dse pudo ingresar'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'error al intentar crear'})
    }
}