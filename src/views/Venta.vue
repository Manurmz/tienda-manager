<script setup>
import { useProductStore } from "../stores/productStore";
import { useCarritoStore } from "../stores/carritoStore";
import { ref,computed } from "vue";

const store = useProductStore();
const lista = useCarritoStore();
const productos = store.getProducts;

const buscador = ref('');
const hay_producto = ref(false);
const index = ref('');
const cantidad = ref('')

function agregar(nombre){
    index.value = store.getIndexByName(nombre)
    hay_producto.value = true
}

function btn_agregar(){
    const producto_a_vender = {
        nombre : productos[index.value].nombre,
        precio : productos[index.value].precioDeVenta,
        stock : productos[index.value].unidades,
        cantidad : cantidad.value,
        total : productos[index.value].precioDeVenta*cantidad.value
    }
    const indexComprobacion = lista.getIndexbyName(producto_a_vender.nombre);
    if(indexComprobacion == -1)
        lista.agregarAlCarrito(producto_a_vender);
    else
        lista.actualizarDatoCantidad(indexComprobacion,cantidad.value);
    cantidad.value = '';
    hay_producto.value = false;
}

const filtro = computed(()=>{
    if(!buscador.value)
        return false;
    else
        return productos.filter(p => p.nombre.toLowerCase().includes(buscador.value.toLowerCase()))
    });

</script>

<template>
    <div class="contenedor">
        <div class="control">
            <div class="buscador">
                <div>
                    <label for="buscador"><font-awesome-icon icon=" fa-solid fa-magnifying-glass"  class="icon"/></label>
                    <input type="text" id="buscador" v-model="buscador">
                </div>
            </div>
            <div class="caja-filtrado">
                <div class="tabla">
                    <table>
                        <thead>
                            <tr>
                                <th class="nombre">Nombre</th>
                                <th>Precio de venta</th>
                                <th>Unidades</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(producto,index) in filtro" :class="index&1?'primo':'non'" @click="agregar(producto.nombre)">
                                <td class="nombre">{{ producto.nombre }}</td>
                                <td>${{ producto.precioDeVenta }}</td>
                                <td>{{ producto.unidades }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="agregar-producto" v-if="hay_producto">
                <div class="nombre-tarjeta">
                    <p>Producto: <span>{{ productos[index].nombre }}</span> </p>
                    
                </div>  
                <div class="precio-tarjeta">
                    <p>Precio: $ <span>{{ productos[index].precioDeVenta }}</span></p>
                </div>
                <div class="cantidad">
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" id="cantidad" v-model="cantidad">
                </div>
                <button class="btn-agregar" @click="btn_agregar"><font-awesome-icon icon="fa-solid fa-circle-plus" /> Agregar</button>
            </div>
        </div>
        <div class="lista-venta">
            <div class="caja-lista">
                    <div class="contenido">
                        
                        <div class="lista-cabecera">
                            <div class="eliminar-lista-compra"></div>
                            <span class="lista-nombre">Nombre </span>
                            <span class="lista-cantidad">Cant.</span>
                            <span class="lista-precio">P.uni </span>
                            <span class="lista-subtotal">Subtotal</span>
                        </div>
                        <div class="lista-producto-agregado" v-for="(producto,index) in lista.getCarrito" >
                            <div class="eliminar-lista-compra"> 
                                <button class="btn-borrar" @click="lista.borrarByIndex(index)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                            </div>
                            <span class="lista-nombre">{{ producto.nombre }}</span>
                            <div class="lista-cantidad">
                                <button class="btn-modificar" @click="lista.restar1(index)" :disabled="producto.cantidad>1?false:true">-</button> 
                                <span class="numero"> {{ producto.cantidad }} </span>
                                <button class="btn-modificar" @click="lista.sumar1(index)">+</button>
                            </div>
                            <span class="lista-precio">${{ producto.precio }} </span>
                            <span class="lista-subtotal">${{ producto.total }}</span>
                            
                        </div>
                    </div>
                <div class="lista-total">Total: {{ lista.getTotalCarrito }}</div>
            </div>
            <div class="botones-finalizar">
                <button class="finalizar-compra" :disabled="lista.getLenghtCarrito<=0?true:false">Finalizar compra</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contenedor{
    width: 1200px;
    display: flex;
}
.control{
    width: 450px;
    height: 500px;
}
.icon{
    font-size: 20px;
    margin-right: 20px;
}
.buscador{
    display: flex;
    align-items: center;
    justify-content: center;
}
#buscador{
    width: 250px;
    margin-bottom: 10px;
    padding: 10px 0;
}
.caja-filtrado{
    width: auto;
    height: 250px;
    overflow: auto;
    background-color: #f9f9f9;
    padding: 0;
    border-radius: 10px;
    margin-bottom: 20px;
}

.agregar-producto{
    min-height: 150px;
    background-color: #70989b;
    border-radius: 20px;
    display: flex;
    padding: 0 30px;
    flex-direction: column;
    justify-content: space-evenly;
}
.agregar-producto span{
    font-weight: bold;
}
.agregar-producto p{
    margin: 10px 0;
}
.cantidad label{
    width: 100px;
}
.cantidad input{
    margin-left: 40px;
    width: 60px;
    margin-bottom: 10px;
    text-align: center;

}
.btn-agregar{
    width: 200px;
    height: 30px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: none;
}
.btn-agregar:hover{
    background-color: rgb(230, 230, 230);
}

table{
    width: auto;
    border-collapse: collapse;
    text-align: center;
    margin-top: 20px
}
thead{
    position: sticky;
    top: 0;
}
th{
    background-color:#385f62;
    padding: 10px 10px;
    position: sticky;
    color: #f1f1f1;
    font-size: 22px;
}
.nombre{
    width: 200px;
}
td{
    padding: 10px 0px;
    font-size: 20px;
}
.primo{
    background-color: #afccce;
}
.primo:hover{
    background-color: #70989b;
}
.non{
    background-color: #e7f0f0;
}
.non:hover{
    background-color: #93b1b3;
}

.caja-lista {
  width: 700px;
  height: 400px;
  overflow: auto;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;

  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

}

.contenido{
    flex: 1;
    font-size: 23px;
}
.lista-cabecera {
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 5px 10px;
}
.btn-borrar{
    border: none;
    color: white; 
    background-color: red;
    padding: 6px 16px;
    border-radius: 5px;
    font-size: 14px;

}
.btn-borrar:hover{
    background-color:rgb(145, 0, 0);
}
.lista-nombre {
    flex-basis: 46%;
}

.lista-cantidad{
    flex-basis: 20.67%;
    text-align: center;
    
}
.btn-modificar{
    border: none;
    padding: 8px 15px;
    border-radius: 5px;

}
.btn-modificar:hover{
    background-color: #ccc;
}
.numero{
    padding: 0 15px;
}

.eliminar-lista-compra, .lista-precio, .lista-subtotal {
  text-align: right;
}

.lista-producto-agregado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 5px 10px;
  height: 30px;
}

.lista-producto-agregado:last-child {
  border-bottom: none;
}
.lista-total {
 width: 95%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
  padding: 10px;
  align-self: flex-end;
  border-top: 1px solid #ccc;
}


.botones-finalizar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  padding: 0 10px;
}

.finalizar-compra {
    background-color: #4CAF50; /* color de fondo */
    border: none; /* borde sin estilos */
    color: white; /* color de texto */
    padding: 12px 24px; /* relleno */
    text-align: center; /* alineación del texto */
    text-decoration: none; /* sin subrayado */
    display: inline-block; /* visualización en línea */
    font-size: 16px; /* tamaño de fuente */
    border-radius: 4px; /* radio de borde */
    cursor: pointer; /* cursor */
  }

  /* estilos al pasar el mouse sobre el botón */
  .finalizar-compra:hover {
    opacity: 0.8;
  }

  /* estilos al presionar el botón */
  .finalizar-compra:active {
    background-color: #3e8e41;
  }

  .finalizar-compra:disabled {
    background-color: gray;
    cursor: not-allowed;
    opacity: 0.6;
  }
</style>