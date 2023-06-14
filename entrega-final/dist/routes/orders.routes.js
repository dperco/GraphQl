"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controllers_1 = require("../controllers/orders.controllers");
// Importo middleware de verificación de usuario logueado
const auth_jwt_1 = require("../utils/auth_jwt");
const router = (0, express_1.Router)();
// Función que crea un carrito, y para el caso que reciba también por 'body' un listado de productos con sus cantidades, los agrega a ese carrito
// Endpoint: /api/carrito Método: POST
// En este caso no verificamos usuario logueado porque el único momento en que se crea un carrito
// es cuando se registra un usuario nuevo, dentro del método 'signup'
// De esta manera, nos aseguramos de que se crean ambos al mismo tiempo
router.post('/', auth_jwt_1.checkAuth, orders_controllers_1.saveOrderController);
// Función para listar todos los productos guardados en el carrito, recibe id de carrito
// Endpoint: /api/carrito/:id/productos Método: GET
router.get('/', auth_jwt_1.checkAuth, orders_controllers_1.getOrderController);
// En este caso no verificamos usuario logueado porque el único momento en que se crea un carrito
// es cuando se registra un usuario nuevo, dentro del método 'signup'
// De esta manera, nos aseguramos de que se crean ambos al mismo tiempo
router.post('/completar', auth_jwt_1.checkAuth, orders_controllers_1.completeOrderController);
// Elimina un carrito recibiendo como parámetro su id
// Endpoint: /api/carrito/:id Método: DELETE
// router.post('/complete', checkAuth, deleteCartController);
// Permite incorporar productos al carrito por id de carrito
// Endpoint: /api/carrito/:id/productos Método: POST
// router.post('/:id/productos', checkAuth, addProdCartController);
// Elimina un producto del carrito recibiendo como parámetros id de carrito e id del producto
// Endpoint: /api/carrito/:id/productos/:id_prod Método: DELETE
// router.delete(
//   '/:id/productos/:id_prod',
//   checkAuth,
//   deleteProductCartController
// );
exports.default = router;
