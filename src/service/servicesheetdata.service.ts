import { Request, Response } from "express";
import connDB from "../utils/DB/dbconn";
import { getFormattedDate } from "../utils/parseProps/parseprops";

export const createservicesheetdata = async ( req : Request, res : Response) => {
    try {
        const {_id_, service, description, _date, pic } = req.body;
        if(!_id_ || !service || !description || !_date || !pic ){
            return res.status(400).json({message: 'Faltan campos'});
        }
        const _date_: string = getFormattedDate();
        const query = `INSERT INTO servicesheetdata
        (service, description, _date, pic, id_servicesheet, id_estado)
        VALUES ($1, $2, TO_TIMESTAMP($3, 'DD/MM/YY HH24:MI:SS'), $4, $5, $6) 
        returning id;`;

        const result = await connDB.query(query, [service, description, _date, pic, _id_, 2 ]);

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

export const getservicesheetdata = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;
        if (ids && (!Array.isArray(ids) || ids.some(id => typeof id !== 'number'))) {
            return res.status(400).json({ message: "El campo 'ids' debe ser un array de números" });
        }

        const query = ids ? 'SELECT * FROM servicesheetdata WHERE id = ANY($1);' : 'SELECT * FROM servicesheetdata;';
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


export const updateservicesheetdata = async (req: Request, res: Response) => {
    try {
        const { _id_, descripcion, service, id_estado } = req.body;

        if (!_id_ || !descripcion || !service ) {
            return res.status(400).json({ message: 'Datos inválidos o faltantes' });
        }

        const query = `UPDATE servicesheet SET service = $2, description = $3, id_estado = $3 WHERE id = $1; `;
        const result = await connDB.query(query, [_id_, service, descripcion, id_estado]);

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


export const deleteservicesheetdata = async ( req : Request, res : Response) =>{
    try {
        const {_id_} = req.body;
        if (!_id_) {
            return res.status(400).json({ message: "id is required" });
        }

        const _date_: string = getFormattedDate();
        const query = `UPDATE servicesheet SET stado = 1 WHERE id = $1;`;
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