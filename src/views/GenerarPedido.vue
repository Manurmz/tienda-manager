<script setup>

</script>

<template>
    <div class="contenedor">
        <div class="parte1">
            <h2>Generar pedido</h2>
            <button class="generar-lista-pedidos">Generar lista</button>
            <button class="generar-pdf">Guardar PDF</button>
        </div>
        <div class="parte2"></div>
    </div>
</template>

<style scoped>
.contenedor{
    display: flex;
}
.parte1{
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.generar-lista-pedidos, .generar-pdf {
    width: 300px;
  margin: 10px;
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}

.generar-lista-pedidos:hover{
  background-color: #3e8e41;
}
.generar-lista-pedidos{
    background-color: #4CAF50;
}
.generar-pdf{
    background-color: #007bff;
}
.generar-pdf:hover{
    background-color: #0062cc;
}
</style>