import { Request, Response } from "express";
import connDB from "../utils/DB/dbconn";
import { getFormattedDate } from "../utils/parseProps/parseprops";

export const createcouting = async ( req : Request, res : Response) => {
    try {
        const {_id_, service_line, description, mount } = req.body;
        if(!_id_ || !service_line || !description || !mount ){
            return res.status(400).json({message: 'Faltan campos'});
        }
        const _date_: string = getFormattedDate();
        const query = `INSERT INTO coutingservice
        (service_line, description, mount, id_servicesheet, created_at)
        VALUES ($1, $2, $3, $4, TO_TIMESTAMP($5, 'DD/MM/YY HH24:MI:SS')) 
        returning id;`;

        const result = await connDB.query(query, [service_line, description, mount, _id_, _date_]);

        if(result && result.rows.length > 0){
            return res.status(200).json(result.rows[0]);
        }else{
            return res.status(400).json({message: 'Error al crear servicio'});
        }
    } catch (err: any) {
        console.error('ERROR creando hoja de servicio: ', err.message);
        res.status(500).json({ message : 'error al intentar crear'})
    }
}

export const getcouting = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;
        if (ids && (!Array.isArray(ids) || ids.some(id => typeof id !== 'number'))) {
            return res.status(400).json({ message: "El campo 'ids' debe ser un array de números" });
        }

        const query = ids ? 'SELECT * FROM coutingservice WHERE id = ANY($1);' : 'SELECT * FROM coutingservice;';
        const values = ids ? [ids] : [];

        const result = await connDB.query(query, values);

        if (result) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(404).json({ message: "No se encontraron registros" });
        }
    } catch (error: any) {
        console.error("Error al intentar obtener registros:", error.message);
        res.status(500).json({ message: "Error al intentar obtener registros", error: error.message });
    }
};


export const updatecouting = async (req: Request, res: Response) => {
    try {
        const { _id_, descripcion, service_line, mount } = req.body;

        if (!_id_ || !descripcion || !service_line || !mount) {
            return res.status(400).json({ message: 'Datos inválidos o faltantes' });
        }

        const query = `UPDATE coutingservice SET service_line = $2, descripcion = $3, mount = $4 WHERE id = $1; `;
        const result = await connDB.query(query, [_id_, service_line, descripcion, mount]);

        // Verificar resultado
        if (result.rowCount != null) {
            return res.status(200).json({ message: 'Referencia actualizada exitosamente' });
        } else {
            return res.status(404).json({ message: 'No se encontró el registro con el ID proporcionado' });
        }
    } catch (error: any) {
        console.error('Error al intentar actualizar:', error.message);
        return res.status(500).json({ message: 'Error al intentar actualizar', error: error.message });
    }
};


export const deletecouting = async ( req : Request, res : Response) =>{
    try {
        const {_id_} = req.body;
        if (!_id_) {
            return res.status(400).json({ message: "id is required" });
        }

        const _date_: string = getFormattedDate();
        const query = `delete from coutingservice where id = $1;`;
        const result = await connDB.query(query, [_id_]);

        if (result.rows && result.rows[0]) {
            return res.status(201).json({ message : 'Se ha ihnabilitado el registro'});
        } else {
            return res.status(400).json({ message: "Error deleting headsheetservice" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : 'error al intentar crear'})
    }
}