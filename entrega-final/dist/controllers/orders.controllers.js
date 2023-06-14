"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeOrderController = exports.getOrderController = exports.saveOrderController = void 0;
const orders_services_1 = require("../services/orders.services");
const carts_services_1 = require("../services/carts.services");
const express_1 = require("express");
const interfaces_1 = require("../interfaces");
const router = (0, express_1.Router)();
const saveOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, userId } = req.body;
    try {
        const cart = yield (0, carts_services_1.getCartById)(cartId);
        if (cart) {
            const orden = {
                userId,
                estado: interfaces_1.Estado.Generada,
            };
            let orderItems = [];
            for (let i = 0; i < cart.productos.length; i++) {
                orderItems.push({
                    prodId: cart.productos[i].prodId._id,
                    cantidad: cart.productos[i].cantidad,
                    precio: cart.productos[i].prodId.precio,
                });
            }
            const carrito = {
                productos: [],
                direccion_entrega: cart.direccion_entrega,
            };
            // Actualizo el carrito en la BD quitando los productos
            const updatedCart = yield (0, carts_services_1.updateCart)(cartId, carrito);
            orden.items = orderItems;
            const order = yield (0, orders_services_1.newOrder)(orden);
            res.status(201).json({
                status: 'ok',
                msg: 'Orden de compra generada exitosamente! Muchas gracias por su compra!',
                order,
                updatedCart,
            });
        }
        else {
            res.status(400).json({
                status: 'error',
                msg: 'El carrito seleccionado no existe',
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: err.message,
        });
    }
});
exports.saveOrderController = saveOrderController;
const getOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, orders_services_1.getOrders)({ userId: req.user._id });
        if (orders)
            res.json({
                orders,
            });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
exports.getOrderController = getOrderController;
const completeOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.body;
        if (orderId) {
            const order = {
                estado: interfaces_1.Estado.Finalizada,
            };
            const modifiedOrder = yield (0, orders_services_1.updateOrder)(orderId, order);
            res.json({
                modifiedOrder,
            });
        }
        else {
            res.status(400).json({
                status: 'error',
                msg: 'Falta el argumento ordenId, o la orden no existe en la base de datos',
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
exports.completeOrderController = completeOrderController;
