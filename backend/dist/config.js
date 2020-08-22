"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var path = __importStar(require("path"));
var lodash_1 = require("lodash");
dotenv.config({ path: '.env' });
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLocaleLowerCase() : 'development';
var ROOT = path.resolve(__dirname, '../');
var config = {
    server: {
        port: normalizePort(lodash_1.defaultTo(process.env.NODE_PORT, 6000)),
        root: ROOT,
        host: lodash_1.defaultTo(process.env.NODE_HOST, 'localhost'),
    },
    cors: {
        origin: '*',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        exposeHeaders: ['X-Request-Id'],
    },
    bodyParser: {
        enableTypes: ['json', 'form'],
        formLimit: '10mb',
        jsonLimit: '10mb',
    },
    defaultUser: {
        id: '1f14512b-9434-5c51-987a-a37605ac5334',
        firstName: 'Sheraz',
        lastName: 'Ali',
        email: 'sheraz.ali342@gmail.com',
        contactNumber: '+971558063571',
        password: '123456',
    },
    nodeEnv: process.env.NODE_ENV,
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    disableAuthAccess: process.env.DISABLE_AUTH_ACCESS ? process.env.DISABLE_AUTH_ACCESS === 'true' : false,
    tokenSecret: process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '986fghjr5h2h3cc1e1e19523fd5345fgh567FG',
};
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return port;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
exports.normalizePort = normalizePort;
exports.default = config;
