<script setup>
import { ref } from "vue";
import { useProductStore } from "../stores/productStore";
const store = useProductStore();
const lista_de_compra = ref([]);


function generarLista(){
    lista_de_compra.value = []
    const productos = store.getProducts;
    productos.forEach(producto => {
        console.log(producto.nombre);
        if(producto.unidades <= producto.alertaStockBajo){
            let proveedor = {};
            if(producto.proveedores.length > 1) 
                proveedor = producto.proveedores.reduce((min, x) => min.precioDeCompra < x.precioDeCompra? min : x);
            else
                proveedor = producto.proveedores[0];
            console.log(proveedor);
            let cantidadLotes = Math.ceil((producto.stockDeseado-producto.unidades)/proveedor.unidadesPorLote)
            const prod = {
                nombre: producto.nombre,
                precioxLote: proveedor.precioDeCompra,
                lotesCant: cantidadLotes,
                subtotal: Number((proveedor.precioDeCompra*cantidadLotes).toFixed(3))
            }
            let index = lista_de_compra.value.findIndex(x => x.nombre == proveedor.nombre);
            if(index == -1)
                lista_de_compra.value.push({
                    nombre: proveedor.nombre,
                    productos: [prod],
                    total: 0,
                });
            else
                lista_de_compra.value[index].productos.push(prod);
        }
    });
    lista_de_compra.value.forEach(lp => {
        lp.total = lp.productos.reduce((acum, p) => acum+p.subtotal, 0 )
    });
    console.log(lista_de_compra.value);
    console.log('lista generada');
    console.log(productos);

}

</script>

<template>
    <div class="contenedor">
        <div class="parte1">
            <h4>Generar pedido</h4>
            <button class="generar-lista-pedidos" @click="generarLista">Generar lista</button>
            <button class="generar-pdf">Guardar PDF</button>
        </div>
        <div class="parte2">
            <div class="lista-proveedor" v-for="lista in lista_de_compra">
                <div class="nombre-proveedor">{{ lista.nombre }}</div>
                <div class="cabecera">
                    <div class="cab-nombre">Producto</div>
                    <div class="precioU">Pre. U.</div>
                    <div class="lotes">Lotes </div>
                    <div class="cab-sutotal">Subtotal</div>
                </div>
                <div class="detalles" v-for="producto in lista.productos">
                    <div class="nombe-producto">{{ producto.nombre }}</div>
                    <div class="precioLote">${{ producto.precioxLote }}</div>
                    <div class="cantidad">
                        <button @click="decrementar">-</button>
                        {{ producto.lotesCant }}
                        <button @click="incrementar">+</button>
                    </div>
                    <div class="subtotal">{{producto.subtotal}}</div>
                </div>
                <div class="total-proveedor"><p>Total: ${{ lista.total }}</p></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.parte1 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 20px;
}

.generar-lista-pedidos,
.generar-pdf {
  margin-bottom: 10px;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  align-self: center;
}

.generar-lista-pedidos {
  background-color: #0077be;
}

.generar-pdf {
  background-color: #32a852;
}

.parte2 {
  overflow-y: auto;
  width: 600px;
  height: 400px;
}

.lista-proveedor {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 17px;
}

.nombre-proveedor {
  font-weight: bold;
  margin-bottom: 10px;
}

.cabecera {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px;
}

.cab-nombre {
  flex-grow: 1;
  font-weight: bold;
  margin-right: 10px;
}

.precioU, .lotes, .cab-sutotal {
  width: 70px;
  text-align: right;
  font-weight: bold;
  margin-right: 10px;
}

.detalles {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}

.nombe-producto {
  flex-grow: 1;
  margin-right: 10px;
  font-weight: bold;
}
.precioLote, .cantidad {
  width: 80px;
  text-align: right;
  margin-right: 10px;
}

.producto-cantidad {
  width: 70px;
  text-align: right;
}

.subtotal {
  width: 70px;
  text-align: right;
  font-weight: bold;
}

.total-proveedor {
  text-align: right;
  margin-top: 10px;
  font-weight: bold;
}

</style>
