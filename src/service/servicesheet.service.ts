import { Request, Response } from "express";
import connDB from "../utils/DB/dbconn";
import { getFormattedDate } from "../utils/parseProps/parseprops";

export const createsheetservice = async ( req : Request, res : Response) => {
    try {
        const {_id_, name, descripcion, cliente, tecnico, precio, metododepago, pagado, cantidadpago, fechadepago } = req.body;
        if(!_id_ || !name || !descripcion || !cliente || !tecnico || !precio || !metododepago || !pagado || !cantidadpago || !fechadepago ){
            return res.status(400).json({message: 'Faltan campos'});
        }
        const _date_: string = getFormattedDate();
        const query = `INSERT INTO servicesheet 
        (id_headservicesheet, name, description, client, date, technician, price, paymentdate, paymentamount, id_estado, id_paymentmethod)
        VALUES ($1, $2, $3, $4, TO_TIMESTAMP($5, 'DD/MM/YY HH24:MI:SS'), $6, $7, TO_TIMESTAMP($8, 'DD/MM/YY HH24:MI:SS'), $9, $10, $11) 
        returning id;`;

        const result = await connDB.query(query, [_id_, name, descripcion, cliente, _date_, tecnico, precio, fechadepago, cantidadpago, 1, 1  ]);

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

export const getsheetservice = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;
        if (ids && (!Array.isArray(ids) || ids.some(id => typeof id !== 'number'))) {
            return res.status(400).json({ message: "El campo 'ids' debe ser un array de números" });
        }

        const query = ids ? 'SELECT * FROM servicesheet WHERE id = ANY($1);' : 'SELECT * FROM servicesheet;';
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


export const updatesheetservice = async (req: Request, res: Response) => {
    try {
        const { _id_, name, descripcion, cliente, tecnico, precio, metododepago, pagado, cantidadpago, fechadepago, estado } = req.body;

        if (
            !_id_ || typeof name !== 'string' || typeof descripcion !== 'string' ||
            typeof cliente !== 'string' || typeof tecnico !== 'string' ||
            typeof precio !== 'number' || typeof cantidadpago !== 'number' || !fechadepago || !estado
        ) {
            return res.status(400).json({ message: 'Datos inválidos o faltantes' });
        }

        const query = `
        UPDATE servicesheet
        SET
          name = $2,
          description = $3,
          client = $4,
          technician = $5,
          price = $6,
          paymentdate = TO_TIMESTAMP($7, 'DD/MM/YY HH24:MI:SS'),
          paymentamount = $8,
          id_paymentmethod = $9,
          id_estado = $10
        WHERE id = $1;
        `;

        // Ejecutar consulta
        const result = await connDB.query(query, [_id_, name, descripcion, cliente, tecnico, precio, fechadepago, cantidadpago, metododepago, estado ]);

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


export const deletesheetservice = async ( req : Request, res : Response) =>{
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