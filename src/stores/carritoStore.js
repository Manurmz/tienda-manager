import { defineStore } from "pinia";

export const useCarritoStore = defineStore('carrito',{
    state:()=>({
        carrito: [],
    }),
    getters:{
        getCarrito: (state) => state.carrito,
        getIndexbyName: (state) => (name) => state.carrito.findIndex(p => p.nombre == name),
        getTotalCarrito: (state) => state.carrito.reduce((x,p) => x+p.total , 0),
        getLenghtCarrito: (state) => state.carrito.length,
    },
    actions:{
        agregarAlCarrito(producto){
            this.carrito.push(producto);
        },
        actualizarDatoCantidad(index,cantidad){
            this.carrito[index].cantidad += cantidad;
            this.carrito[index].total = this.carrito[index].cantidad*this.carrito[index].precio;
        },
        sumar1(index){
            this.carrito[index].cantidad++;
            this.carrito[index].total = this.carrito[index].cantidad*this.carrito[index].precio;
        },
        restar1(index){
            this.carrito[index].cantidad--;
            this.carrito[index].total = this.carrito[index].cantidad*this.carrito[index].precio;
        },
        eliminarProductoDelCarrito(nombre){
            let index = this.carrito.findIndex(p => p.nombre === nombre);
            if(index == -1) return false;
            this.carrito.splice(index,1);
            return true
        },
        borrarByIndex(index){
            this.carrito.splice(index,1);
        },
        limpiarcarrito(){
            this.carrito = [];
        }
    }
});
