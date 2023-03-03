<script setup>
import { ref,computed } from "vue";
import { useProductStore } from "../stores/productStore";

const store = useProductStore();
let productos = store.getProducts; 
const isMobile = window.matchMedia('(max-width: 780px)').matches;

const buscador = ref('');
const isShow = ref(false);
const valores = ref('');

const filtro = computed(()=>{
    if(!buscador.value){
        return productos;
    } 
    else{
        return productos.filter(p => p.nombre.toLowerCase().includes(buscador.value.toLowerCase()))
    }
});

function showModal (dato) {
    isShow.value = true
    valores.value = dato;
}

function closeModal () {
    isShow.value = false
}
</script>

<template>
<div class="container">
    <p>Inventario</p>
    <div class="buscador">
        <label for="lupa"><font-awesome-icon icon=" fa-solid fa-magnifying-glass"  class="icon"/></label>
        <input type="text" v-model="buscador" id="lupa">
    </div>
    <div class="caja" >
        <table v-if="!isMobile">
            <thead>
                <tr>
                    <th class="nombre">Nombre</th>
                    <th>Precio de venta</th>
                    <th>Unidades</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(producto,index) in filtro" @click="showModal(producto)" :class="index&1?'primo':'non'">
                    <td class="nombre">{{ producto.nombre }}</td>
                    <td>${{ producto.precioDeVenta }}</td>
                    <td>{{ producto.unidades }}</td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <div class="tarjeta" v-for="producto in filtro" @click="showModal(producto)">
                <div class="tarjeta-nombre">
                    <p>Nombre: <span>{{ producto.nombre }}</span></p>
                </div>
                <div class="datos">
                    <div class="precioV">
                        <p>Precio de venta:
                        $ <span>{{ producto.precioDeVenta }}</span>
                    </p>
                    </div>
                    <div class="unidades">
                        <p>Unidades:
                        <span>{{ producto.unidades }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<Modal
    v-model="isShow"
    :close="closeModal">
    <div class="modal">
        <h4>Datos Proveedor</h4>
        <div class="contenedor">
            <div v-for="proveedor in valores.proveedores" class="proveedores">
                <p>Nombre: <span>{{ proveedor.nombre }}</span></p>
                <p>Precio de compra: $<span> {{ proveedor.precioDeCompra }}</span></p>
                <p>Unidades por lote: <span>{{ proveedor.unidadesPorLote }}</span></p>
                <p>Precio Unitario: $<span> {{ proveedor.precioUnitario }}</span></p>
            </div>
        </div>
        <h4>Datos de el producto</h4>
        <p>Stock deseado: <span>{{ valores.stockDeseado }}</span> unidades.</p>
        <p>Alerta stock bajo: <span>{{ valores.alertaStockBajo }}</span> unidades.</p>
        <button @click="closeModal" class="boton-modal">cerrar</button>
    </div>
</Modal>
</template>

<style scoped>
p{
    margin: 5px 0px;
}
span{
    font-weight: bold;
}
.icon{
    font-size: medium;
    padding: 2px 10px;
}
#lupa{
    width: 400px;
}
table{
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
}
td{
    padding: 10px 0px;
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
.nombre{
    text-align: start;
    min-width: 200px;
    padding-left: 10px;
}

/* tarjeta para dispositivos mobiles  */
.tarjeta{
    max-width: 300px;
    min-height: 100px;
    border: 1px solid #385f62;
    border-radius: 10px;
    padding: 10px;
    margin: 5px 0;
    background-color: #93b1b3   ;
}
.tarjeta p{
    font-size: 17px;
}
span{
    font-weight: bold;
}
/* Modal */
.modal {
    min-width: 290px;
    max-width: 580px;
    min-height: 450px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 20px;
    text-align: center;
    border-radius: 10px;
}
.contenedor{
    display: flex;
    justify-content: center;
    height: auto;
    flex-wrap: wrap;
}
.proveedores{
    border: solid 1px #284462;
    margin-bottom: 5px;
    border-radius: 10px;
    height: 150px;
    min-width: 220px;
    padding: 5px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    
}


.boton-modal{
    color: #fff;
    background-color: red;
    padding: 10px 30px;
    border-radius: 10px;
    align-items: end;
    /* flex-grow: 0; */
    margin-bottom: 50px;
    font-size: 17px;
    margin-top: 20px;
    border: none;    
}
.boton-modal:hover{
    background-color:rgb(145, 0, 0);
}

.caja{
    overflow: auto;
    height: 450px;
    margin-top: 10px;
}

@media (max-width: 800px){
    #lupa{
        max-width: 200px;
    }
    .caja{
        max-width: 400px;
    }
    .modal{
        max-width: 350px;
    }
}
</style>
