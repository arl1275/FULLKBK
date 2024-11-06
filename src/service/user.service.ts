import { Request, Response } from "express";
import { genTocken, valToken } from "../seg/access";

export const LogService = (req : Request, res : Response) => {
    try {
        const {role, user, password } = req.body;
        console.log(req.body)
        const token = genTocken(role, user, password );
        token != null ? res.status(200).json({ token_ : token}) : res.status(500).json({ message : 'error al generar un token_'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'Error al generar tocken'});
    }
}

export const outService = async (req : Request, res : Response) =>{

}

export const upService = async (req : Request, res : Response) =>{

}

export const valuserService = (req : Request, res : Response) =>{
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 
        const {role} = req.query;
        let rol = role?.toString();
        const validation = valToken(rol, token);
        validation != null ? res.status(200).json({message : 'token valido'}) : res.status(500).json({message : 'token invalido'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : 'Error al validar token'})
    }
}