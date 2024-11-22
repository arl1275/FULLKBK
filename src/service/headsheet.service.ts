import { Request, Response } from "express";
import { getFormattedDate } from "../utils/parseProps/parseprops";
import connDB from "../utils/DB/dbconn";

export const createheadsheetservice = async (req : Request, res : Response) =>{
    try {
        const {reference, company} = req.body;
        if (!reference || !company) {
            return res.status(400).json({ message: "reference and company are required" });
        }

        const _date_: string = getFormattedDate();
        const query = `INSERT INTO headsheet (_date, reference, company) VALUES (TO_TIMESTAMP($1, 'DD/MM/YY HH24:MI:SS'), $2, $3) returning id;`;
        const result = await connDB.query(query, [_date_, reference, company]);

        if (result.rows && result.rows[0]) {
            return res.status(201).json(result.rows[0]);
        } else {
            return res.status(400).json({ message: "Error creating headsheetservice" });
        }

    } catch (err: any) {
        console.error("Error al crear HEAD:", err.message);
        res.status(500).json({ message : 'Error al crear HEAD'})
    }
}

export const updateheadsheetservice =async (req : Request, res : Response) =>{
    try {
        const {reference, _id_} = req.body;
        if (!reference || !_id_) {
            return res.status(400).json({ message: "reference and id are required" });
        }

        const query = `UPDATE headsheet SET reference = $1 WHERE id = $2;`;
        const result = await connDB.query(query, [reference, _id_]);

        if (result) {
            return res.status(201).json({ message : 'Se ha actualizado la referencia'});
        } else {
            return res.status(400).json({ message: "Error updating headsheetservice" });
        }
    } catch (err : any) {
        console.error('ERROR al modificar HEAD: ', err.message)
        res.status(500).json({ message : 'Error al actualizar HEAD'})
    }
}

export const deleteheadsheetservice =async (req : Request, res : Response) =>{
    try {
        const {_id_} = req.body;
        if (!_id_) {
            return res.status(400).json({ message: "id is required" });
        }

        const _date_: string = getFormattedDate();
        const query = `UPDATE headsheet SET stado = 1 WHERE id = $1;`;
        const result = await connDB.query(query, [_id_]);

        if (result.rows && result.rows[0]) {
            return res.status(201).json({ message : 'Se ha ihnabilitado el registro'});
        } else {
            return res.status(400).json({ message: "Error deleting headsheetservice" });
        }
    } catch (err) {
        res.status(500).json({ message : 'Error al borrar de HEAD'})
    }
}

export const getheadsheetservice = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;
        const query =
            ids && Array.isArray(ids)
                ? `SELECT * FROM headsheet WHERE id = ANY($1);`
                : `SELECT * FROM headsheet;`;

        const values = ids && Array.isArray(ids) ? [ids] : [];
        const result = await connDB.query(query, values);

        if (result.rows && result.rows.length > 0) {
            return res.status(200).json(result.rows); 
        } else {
            return res.status(404).json({ message: "No se encontraron registros" });
        }
    } catch (err: any) {
        console.error("Error al obtener datos de HEAD:", err.message);
        return res.status(500).json({ message: "Error al obtener datos de HEAD", error: err.message });
    }
};
