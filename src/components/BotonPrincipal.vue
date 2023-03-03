<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    nombre: String,
    componente: String
});


</script>

<template>
    <RouterLink :to="{name:componente}" id="boton">
        <div>{{ nombre }}</div>
    </RouterLink>
    <!-- <div>{{ nombre }}</div> -->
</template>

<style scoped>
#boton{
    font-weight: bold;
    font-size: x-large;
    margin: 10px;
    padding: 10px;
    width: 180px;
    height: 40px;
    background-color: rgb(245, 245, 245);
    text-align: center;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

}
#boton:hover{
    background-color: rgb(230, 230, 230);
}

@media (max-width: 800px){
    #boton{
        height: 60px;
        width: 130px;
    }
}
</style>