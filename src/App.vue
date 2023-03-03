<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
    <RouterView/>
    <RouterLink to="/" id="home"><font-awesome-icon icon="fa-solid fa-house" /></RouterLink>    

</template>

<style scoped>

#home{
  background-color: rgb(245, 245, 245);
  padding: 10px 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  align-items: end;
  /* flex-grow: 0; */
  margin-bottom: 50px;
  font-size: 17px;
  
}
#home:hover{
  background-color: rgb(230, 230, 230);
}

</style>
