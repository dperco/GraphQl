"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import yargs from 'yargs';
// import {hideBin } from 'yargs/helpers';
// hideBin nos oculta el contenido del array _:[]
// const args: any = yargs(hideBin(process.argv))
//   .default('mode', 'fork')
//   .default('port', '8080')
//   .default('dao', 'mongo').argv;
// const argv: any = yargs(process.argv).argv;
let mongoDBSRV = 'mongodb+srv://dperco:abc12345678@cluster0.zdpd0ie.mongodb.net/ecommerce' ||
    'mongodb://aldo:123456@localhost:27017/ecommerce';
if (process.env.NODE_ENV === 'TEST_INT') {
    mongoDBSRV = "mongodb+srv://dperco:abc12345678@cluster0.zdpd0ie.mongodb.net/ecommerce" || 'testSRV';
}
exports.default = {
    MONGO_ATLAS_URL: mongoDBSRV || 'mongodb://aldo:123456@localhost:27017/ecommerce',
    TOKEN_SECRET_KEY: '' || 'secret',
    TOKEN_KEEP_ALIVE: '' || '30m',
    GMAIL_EMAIL: 'danielperco4@gmail.com',
    GMAIL_PASSWORD: 'Qadf0502'
    // GMAIL_NAME: '',
    // NODE_ENV: '',
    // ARGS: args,
    // ARGV: argv,
};
