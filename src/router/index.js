import {createRouter, createWebHistory} from 'vue-router'


//Si hay que agregar mas elementos al array el campo de "name" debe de agregarce tambien al objeto "vistas" en Home.vue
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        alias: '/home'
    },
    {
        path: '/estadisticas',
        name: 'estadisticas',
        component: () => import('../views/Informe.vue')
    },
    {
        path: '/inventario',
        name: 'inventario',
        component: () => import('../views/Inventario.vue')
    },
    {
        path: '/modificar-invetario',
        name: 'modificar',
        component: () => import('../views/ModificarInventario.vue')
    },
    {
        path: '/agregar-nuevo-producto',
        name: 'nuevo_producto',
        component: () => import('../views/NuevoProducto.vue')
    },
    {
        path: '/venta',
        name: 'venta',
        component: () => import('../views/Venta.vue')
    },
    {
        path: '/proveedores',
        name: 'proveedores',
        component: () => import('../views/Proveedores.vue')
    },
    {
        path: '/generar-pedido',
        name: 'generar_pedido',
        component: () => import('../views/GenerarPedido.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;