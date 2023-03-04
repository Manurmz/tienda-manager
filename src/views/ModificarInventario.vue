<script setup>
import { useProductStore } from "../stores/productStore";
import { ref,computed } from "vue";

const store = useProductStore();
let productos = store.getProducts; 

const buscador = ref('');
const isShow = ref(false);
const valores = ref("");
const showNewProveedor = ref(false);
const nombreProveedor = ref('');
const precioCompra = ref();
const unidadesxLote = ref()


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
    limpiar();
}

function showNevoProveedor(){
    showNewProveedor.value = true;
}

function limpiar(){
    nombreProveedor.value ='';
    precioCompra.value = '';
    unidadesxLote.value = '';
    showNewProveedor.value = false;
}

function agregar(){
    const nuevoProveedor = {}
    nuevoProveedor.nombre = nombreProveedor.value;
    nuevoProveedor.precioDeCompra = precioCompra.value;
    nuevoProveedor.unidadesPorLote = unidadesxLote.value;
    nuevoProveedor.precioUnitario = Number((precioCompra.value/unidadesxLote.value).toFixed(3));
    store.agregarNuevoProveedor(valores.value.nombre,nuevoProveedor);
    limpiar();
}

function borrarProveedor(dato,index){
    console.log(dato.nombre);
    console.log(index);
    store.eliminarProveedor(dato.nombre,index);
    
}

function guardar(){
    for(let i=0;i<valores.value.proveedores.length;i++)
        valores.value.proveedores[i].precioUnitario = (valores.value.proveedores[i].precioDeCompra/valores.value.proveedores[i].unidadesPorLote).toFixed(3);
    store.agregarModificado(valores);
    console.log(valores);
    isShow.value = false
}

function borrar(){

}

</script>

<template>
    <h4>Modificar Inventario</h4>
    <div class="buscador">
        <label for="lupa"><font-awesome-icon icon=" fa-solid fa-magnifying-glass"  class="icon" for="lupa"/></label>
        <input type="text" v-model="buscador" id="lupa">
    </div>
    <div class="container">
        <div class="tarjeta" v-for="producto in filtro" @click="showModal(producto)">
            <span class="nombre">{{ producto.nombre }}</span><br>
            <span>Precio de venta: ${{ producto.precioDeVenta }}</span><br>
            <span v-for="proveedor in producto.proveedores">Precio de "{{ proveedor.nombre }}" : ${{ proveedor.precioUnitario }}<br></span>
        </div>
    </div>
    <Modal
        v-model="isShow"
        :close="closeModal">
    <div class="modal">
        <div class="datos">
            <h5>{{ valores.nombre }}</h5>
            <div class="grupo">
                <div class="subgrupo">
                    <label for="precioV">Precio de venta</label>
                    $<input v-model="valores.precioDeVenta" min="0" type="number" id="precioV">
                </div>
                <div class="subgrupo">
                    <label for="cantidad">Unidades disponibles</label>
                    <input v-model="valores.unidades" min="0" type="number" id="cantidad">
                </div>
            </div>
            <div class="grupo">
                <div class="subgrupo">
                    <label for="stockDeseado">Stock Deseado</label>
                    <input v-model="valores.stockDeseado" min="0" type="number" id="stockDeseado">
                </div>
                <div class="subgrupo">
                    <label for="stockminimo">Stock minimo</label>
                    <input v-model="valores.alertaStockBajo" min="0" type="number" id="stockminimo">
                </div>
            </div>
            <div class="proveedores" v-for="(proveedor,index) in valores.proveedores">
                <div class="cabecera">
                    <p>Proveedor: "{{ proveedor.nombre }}"</p>
                    <a class="borrar" @click="borrarProveedor(valores,index)"><font-awesome-icon icon="fa-solid fa-trash" /> </a>
                </div>
                <div class="grupo">
                    <div class="subgrupo">
                        <label :for="'precioC'+index">Precio de Compra</label>
                        $<input v-model="valores.proveedores[index].precioDeCompra" min="0" type="number" :id="'precioC'+index">
                    </div>
                    <div class="subgrupo">
                        <label :for="'unidadesxLote'+index">Unidades por lote</label>
                        <input v-model="valores.proveedores[index].unidadesPorLote" min="0" type="number" :id="'unidadesxLote'+index">
                    </div>
                </div>
            </div>
            <button class="btn-agregar" @click="showNevoProveedor" v-show="!showNewProveedor"><font-awesome-icon icon="a-solid fa-plus" /> Agregar Proveedor</button>
            <div class="nuevo-proveedor" v-show="showNewProveedor">
                <div class="Proveedor">
                    <div class="nombreNP">
                        <label for="nombreProveedor">Nombre del nuevo proveedor: </label>
                        <input type="text" id="nombreProveedor" name="nombreProveedor" v-model="nombreProveedor">
                    </div>
                </div>
                <div class="grupo">
                    <div class="subgrupo">
                        <label for="precioCompra">Precio de compra:</label>
                        $<input type="number" min="0" id="precioCompra" name="precioCompra" v-model="precioCompra">
                    </div>
                    <div class="subgrupo">
                        <label for="unidadesxLote">Unidades por lote:</label>
                        <input type="number" min="0" id="unidadesxLote" name="unidadesxLote" v-model="unidadesxLote">
                    </div>
                </div>
                <button class="btn-agregar" @click="agregar"><font-awesome-icon icon="a-solid fa-plus" /> Agregar</button>
                <button class="btn-agregar" @click="limpiar">cancelar</button>
            </div>
        </div>
        <div class="botones">
            <button @click="guardar" class="boton btn-guardar"><font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar</button>
            <button @click="borrar" class="boton btn-borrar"><font-awesome-icon icon="fa-solid fa-trash" /> Borarr</button>
            <button @click="closeModal" class="boton btn-cerrar"><font-awesome-icon icon="fa-solid fa-xmark" /> Cerrar</button>
        </div>
    </div>
    </Modal>
</template>

<style scoped>
.icon{
    font-size: medium;
    padding: 2px 10px;
}
#lupa{
    width: 400px;
}
.container{
    display: flex;
    flex-wrap: wrap;
    width: 1250px;
    overflow: auto;
    margin: 20px 0px;
}
.tarjeta{
    font-size: 18px;
    min-height: 90px;
    width: 270px;
    background-color: #f9f9f9;  
    border: none;
    border-radius: 20px;
    padding: 10px;
    margin: 5px;
}
.nombre{
    font-weight: bold;
}
/* 
Modal1
*/
.modal{
    width: 700px;
    min-height: 600px;
    background-color: #a6c4c5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    font-size: 20px;
}
h5{
    padding: 0;
    margin: 5px;
}
.grupo{
    display: flex;
    justify-content: space-between;
    width: 500px;
}
.subgrupo{
    display: flex;
    margin: 10px 0;
    align-items: center;
}
.subgrupo label{
    width: 150px;
}
.subgrupo input{
    width: 70px;
    text-align: center;
    margin: 0 10px;
}
.proveedores{
    width: 500px;
    height: auto;
    border: solid 1px #30656c;
    border-radius: 10px;
    padding: 0 20px;
    margin: 10px 0  ;
}
.nuevo-proveedor{
    margin-top: 10px;
    padding: 10px;
    border: solid 1px green;
    border-radius: 10px;
}
.cabecera{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
}
.borrar{
    color: white; 
    background-color: red;
    padding: 6px 16px;
    border-radius: 5px;
    font-size: 14px;

}
.borrar:hover{
    background-color:rgb(145, 0, 0);
}
.proveedores p{
    margin: 5px 0;
}



/* 
configuracion de botones
*/
.botones{
    width: 500px;
    display: flex;
    justify-content: space-around;
}
.boton{
    padding: 10px 30px;
    border-radius: 10px;
    align-items: end;
    /* flex-grow: 0; */
    margin-bottom: 50px;
    font-size: 17px;
    margin-top: 20px;
    border: none;    
}
.btn-agregar{
    padding: 5px 10px;
    border-radius: 10px;
    align-items: end;
    /* flex-grow: 0; */
    margin-bottom: 0px;
    font-size: 13px;
    margin-top: 10px;
    border: none;
    margin-right: 10px;    
}
.btn-guardar:hover, .btn-agregar:hover{
    background-color:  rgb(224, 224, 224);
}

.btn-cerrar, .btn-borrar{
    color: #ffff;
    background-color: red;
}
.btn-cerrar:hover, .btn-borrar:hover{
    background-color:rgb(145, 0, 0);
}


@media (max-width: 800px){
    .container{
        max-width: 300px;
    }
    #lupa{
        width: 200px;
    }
    .modal{
        max-width: 300px;
        flex-wrap: wrap;
    }
    .datos{
        margin-bottom: 30px;
    }
    .grupo{
        max-width: 280px;
        min-height: 70px;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .proveedores{
        max-width: 240px;
    }
    .proveedores .grupo{
        margin: 0;
        justify-content: flex-start;
    }
    .botones{
        flex-direction: column;
        max-width: 200px;
        justify-content: stretch;
    }
    .boton{
        margin: 15px 0;
    }
}
</style>