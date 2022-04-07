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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const electron_store_1 = __importDefault(require("electron-store"));
//import consumerController from './consumerController';
const schema = {
    port: {
        type: 'string',
    },
    nickname: {
        type: 'string',
    }
};
const db = new electron_store_1.default({ schema });
//çconsole.log("electronStore DB", db);
const promPortController = {
    isPromPortUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { port } = req.body;
            // https://stackoverflow.com/questions/12968093/regex-to-validate-port-number#comment89586361_12968117
            const convertStringToNum = Number(port);
            if (!Number.isInteger(convertStringToNum) || convertStringToNum < 0 || convertStringToNum > 65535) {
                return res.status(400).json({ error: 'Expected an integer from 0 to 65535.' });
            }
            try {
                const { data } = yield axios_1.default.get(`http://localhost:${port}/api/v1/query?query=up`);
                if (data.status === 'success') {
                    return next();
                }
                return res.status(404).json({ error: `Prometheus doesn't seem to be running on port ${port}!` });
            }
            catch (e) {
                return next(e);
            }
        });
    },
    savePortToElectronStore(req, res, next) {
        const { port, nickname } = req.body;
        db.set('port', port);
        db.set('nickname', nickname);
        return next();
    },
    getSavedPortFromElectronStore(req, res, next) {
        const port = db.get('port');
        res.locals.port = port;
        return next();
    }
};
exports.default = promPortController;
