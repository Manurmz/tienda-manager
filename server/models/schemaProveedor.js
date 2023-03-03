import { Schema,model } from "mongoose";

const proveedorSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precioCompra: Number,
    precioUnitario: Number,

});

/*
recordatorio los campos de el schema deben de ser detallados
a falta de tiempo es una configuración sencilla,
y falta agregar el campo done.
*/

export default model('Proveedor',proveedorSchema);