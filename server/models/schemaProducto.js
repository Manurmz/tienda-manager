import { Schema,model } from "mongoose";
import Proveedor from "./schemaProveedor";


const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precioVenta: Number,
    unidadesDisponoibles: Number,
    alertaMinimoStock: Number,
    stockDeseado: Number,
    proveedores: [Proveedor]
});

/*
Falta agregar información como ultima vez que fue modoficado, done 
y una coleccion sobre un array de solamente proveedores
*/

export default model('Producto',productoSchema);