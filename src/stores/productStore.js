import { defineStore } from "pinia";
import { datos } from "../datosPrueba";

export const useProductStore = defineStore('product',{
    state:()=>({
        products: [],
        listaModificados: [],
    }),
    getters: {
        getProducts: (state) => state.products,
        getListaModificados: (state) => state.listaModificados,
        getIndexByName: (state) => (nombre) => state.products.findIndex(p => p.nombre === nombre)
    },
    actions: {
        getProductosBaseDatos(){
            this.products = datos;
            // console.log(datos);
        },
        agregarModificado(objeto){
            this.listaModificados.push(objeto);
            let indice = this.products.findIndex(product => product.nombre === objeto.nombre);
            if (indice === -1) return false;
            this.products[indice] = objeto;
            return true;
        },
        agregarNuevoProducto(dato){
            this.products.push(dato);
        },
        agregarNuevoProveedor(nombre,proveedor){
            let indice = this.products.findIndex(product => product.nombre === nombre);
            if (indice === -1) return false;
            this.products[indice].proveedores.push(proveedor);
            return true;

        },
        eliminarProveedor(nombre,index){
            let indice = this.products.findIndex(product => product.nombre === nombre);
            if (indice === -1) return false;
            this.products[indice].proveedores.splice(index,1);
            return true;
        },
        eliminarProducto(){
            
        }
    }
});