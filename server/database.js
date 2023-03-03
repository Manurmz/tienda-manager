import { connect } from "mongoose";

export const startConnection = async () => {
    try{
        const db = await connect();
        console.log(db.connetion.name);
    }catch(error){
        console.error(error);
    }
}

//falta configuracion
//no se si se pueda con docker o una coneccion directa