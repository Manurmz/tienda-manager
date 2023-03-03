<script setup>
import { ref,onMounted } from 'vue';
import BotonPrincipal from '../components/BotonPrincipal.vue';


const paginas = {
    inventario: "Inventario",
    nuevo_producto: "Agregar producto",
    venta: "Venta",
    modificar: "Modificar inventario",
    proveedores: "Proveedores",
    generar_pedido: "Generar pedido",
    estadisticas: "Estadisticas",
};

const nombre_boton = ref(paginas);
</script>

<template>
    <div>
        <h1 id="titulo">Home</h1>
        <div id="zona_botones">
            <BotonPrincipal v-for="(value,key) in nombre_boton" :componente="key" :nombre="value"></BotonPrincipal>
        </div>
        
    </div>  
</template>

<style scoped>
#titulo{
    text-align: center;
}
#zona_botones{
    display: flex;
    width: 600px;
    height: 400px;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
}

@media (max-width: 800px){
    #zona_botones{
        width: 400px;

    }
}
</style>