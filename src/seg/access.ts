import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const Hkey = process.env.HIGHPASSWORD
const Mkey = process.env.M_PASSWORD
const Lkey = process.env.L_PASSWORD

// 1 : superadmin, 2 : admin, 3 : user

export const genTocken = (role : string, user : string, password : string) =>{
    
}

export const valToken = (role : string, user : string, password : string) =>{

}

export const deltoken = (role : string, user : string, password : string) =>{

}