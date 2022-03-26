"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const partitionRouter_1 = __importDefault(require("./routers/partitionRouter"));
const producerRouter_1 = __importDefault(require("./routers/producerRouter"));
const topicsRouter_1 = __importDefault(require("./routers/topicsRouter"));
const promPortRouter_1 = __importDefault(require("./routers/promPortRouter"));
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
// const consumerRouter = require('./routers/consumerRouter');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// if (process.env.NODE_ENV === 'production') {
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   app.get('/', (req, res) =>
//     res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
//   );
// }
app.use('/api/prom-port', promPortRouter_1.default);
// app.use('/api/consumer', consumerRouter);
app.use('/api/partition', partitionRouter_1.default);
app.use('/api/producer', producerRouter_1.default);
app.use('/api/topic', topicsRouter_1.default);
app.use((req, res) => res.sendStatus(404));
app.use((err, req, res, next) => {
    var _a, _b;
    return res
        .status((_a = err.status) !== null && _a !== void 0 ? _a : 500)
        .json((_b = err.message) !== null && _b !== void 0 ? _b : 'Internal Server Error');
});
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
});
