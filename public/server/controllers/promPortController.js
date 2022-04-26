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
//import React from 'react';
//import consumerController from './consumerController';
const schema = {
    port: {
        type: 'string',
    },
    nickname: {
        type: 'string',
    },
    time: {
        type: 'string',
    }
};
const db = new electron_store_1.default({ schema });
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
        const { port, nickname, time } = req.body;
        db.set('port', port);
        db.set('nickname', nickname);
        db.set('time', time);
        return next();
    },
    getSavedPortFromElectronStore(req, res, next) {
        const port = db.get('port');
        res.locals.port = port;
        return next();
    },
    getSavedStartTimeFromElectronStore(req, res, next) {
        const time = db.get('time');
        res.locals.time = time;
        return next();
    },
    getSavedIntervalFromElectronStore(req, res, next) {
        res.locals.interval = 60;
        const endTime = res.locals.time;
        //console.log(`endTime: ${endTime}`);
        // let startTime = new Date();
        // console.log(`startTime: ${startTime}`);
        let difference = new Date().getTime() - new Date(endTime).getTime();
        //console.log('DIFFERENCE', difference);
        if (difference < 60000) {
            res.locals.interval = 1;
        }
        if (difference > 60000 && difference < 300000) {
            res.locals.interval = 60;
        }
        if (difference > 360000 && difference < 7200000) {
            res.locals.interval = 300;
        }
        if (difference > 14400000) {
            res.locals.interval = 1800;
        }
        //return res.locals.interval;
        return next();
    }
};
exports.default = promPortController;
