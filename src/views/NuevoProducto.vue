<script setup>
import { ref } from 'vue';
import { useProductStore } from "../stores/productStore";

const store = useProductStore();

const nombre = ref("");
const precioVenta = ref('');
const unidadesDisponibles = ref('');
const alertaMinimoStock = ref('');
const stockDeseado = ref('');
const nombreProveedor = ref('');
const precioCompra = ref('');
const unidadesxLote = ref('');

const guardar = () =>{
    let objetoProveedor = {
        nombre: nombreProveedor.value, 
        precioDeCompra: precioCompra.value, 
        unidadesPorLote: unidadesxLote.value,
        precioUnitario: (precioCompra.value/unidadesxLote.value).toFixed(3), 
        ultimaModificacion: new Date
    };
    let nuevoProducto = {
        nombre: nombre.value,
        precioDeVenta: precioVenta.value,
        unidades: unidadesDisponibles.value,
        proveedores: [objetoProveedor],
        alertaStockBajo: alertaMinimoStock.value,
        stockDeseado:stockDeseado.value
    };
    store.agregarNuevoProducto(nuevoProducto);
    console.log('Datos guardados');
    nombre.value = '';
    precioVenta.value = '';
    unidadesDisponibles.value = '';
    alertaMinimoStock.value = '';
    stockDeseado.value = '';
    nombreProveedor.value = '';
    precioCompra.value = '';
    unidadesxLote.value = '';

}

</script>

<template>
    <p>Nuevo Producto</p>
    <form @submit.prevent="guardar">
        <div>
            <div class="nombre">
                <label for="nombre">Nombre del producto:</label>
                <input type="text" id="nombre" name="nombre" v-model="nombre">
            </div>
            <div class="grupo">
                <div class="subgrupo">
                    <label for="precioVenta">Precio de venta:</label>
                    <input type="number" min="0" id="precioVenta" name="precioVenta" v-model="precioVenta">
                </div>
                <div class="subgrupo">
                    <label for="unidadesDisponibles">Unidades disponibles:</label>
                    <input type="number" min="0" id="unidadesDisponibles" name="unidadesDisponibles" v-model="unidadesDisponibles">
                </div>
            </div>
            <div class="grupo">
                <div class="subgrupo">
                    <label for="alertaMinimoStock">Cantidad minima permitida:</label>
                    <input type="number" min="0" id="alertaMinimoStock" name="alertaMinimoStock" v-model="alertaMinimoStock">
                </div>
                <div class="subgrupo">
                    <label for="stockDeseado">Cantidad de stock requerida:</label>
                    <input type="number" min="0" id="stockDeseado" name="stockDeseado" v-model="stockDeseado">
                </div>
            </div>
        </div>
        <div>
            <p>Datos proveedor</p>
            <div class="Proveedor">
                <div class="nombre">
                    <label for="nombreProveedor">Nombre del proveedor:</label>
                    <input type="text" id="nombreProveedor" name="nombreProveedor" v-model="nombreProveedor">
                </div>
            </div>
            <div class="grupo">
                <div class="subgrupo">
                    <label for="precioCompra">Precio de compra:</label>
                    <input type="number" min="0" id="precioCompra" name="precioCompra" v-model="precioCompra">
                </div>
                <div class="subgrupo">
                    <label for="unidadesxLote">Unidades por lote:</label>
                    <input type="number" min="0" id="unidadesxLote" name="unidadesxLote" v-model="unidadesxLote">
                </div>
            </div>
        </div>
        
        <button>Guardar</button>
        
    </form>
</template>

<style scoped>

form{
    height: 700px;
    width: 600px;
    display: flex;
    flex-direction: column;
    background-color: #a6c4c5;
    padding: 30px;
    border-radius: 10px;
}
.nombre input{
    width: 50%;
    margin-left: 10px;
}
.grupo{
    display: flex;
}
.subgrupo{
    width: 45%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-right: 15px;
    align-items: center;
}
.subgrupo input{
    width: 20%;
    margin-right: 30px;
    text-align: center;
}

button{
    font-weight: bold;
    height: 50px;
    width: 80px;
    align-self: center;
    margin-top: 20px;
    padding: 10px;
    border: none;
    background-color: rgb(245, 245, 245);
    color: #284462;
    border-radius: 10px;
}
button:hover{
    background-color: rgb(230, 230, 230);;
}

@media (max-width: 800px){
    form{
        max-width: 300px;
        margin-bottom: 30px;
    }
    .nombre input{
        width: 250px;
    }
    .grupo{
        flex-wrap: wrap;
    }
    .subgrupo{
        width: 500px;
    }
    .subgrupo input{
        width: 5    0px;
    }
}
</style>