"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const partitionRouter_1 = __importDefault(require("./routers/partitionRouter"));
const producerRouter_1 = __importDefault(require("./routers/producerRouter"));
const topicsRouter_1 = __importDefault(require("./routers/topicsRouter"));
const promPortRouter_1 = __importDefault(require("./routers/promPortRouter"));
const consumerRouter_1 = __importDefault(require("./routers/consumerRouter"));
// import { partitionController } from './controllers/partitionController';
// import { producerController } from './controllers/producerController';
// import { promPortController } from './controllers/promPortController';
// import { topicsController } from './controllers/topicsController';
// import { consumerController } from './controllers/consumerController';
const express_1 = __importDefault(require("express"));
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express_1.default();
const PORT = process.env.PORT || 8080;
// const consumerRouter = require('./routers/consumerRouter');
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// if (process.env.NODE_ENV === 'production') {
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   app.get('/', (req, res) =>
//     res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
//   );
// }
app.use('/api/prom-port', promPortRouter_1.default);
app.use('/api/consumer', consumerRouter_1.default);
app.use('/api/partition', partitionRouter_1.default);
app.use('/api/producer', producerRouter_1.default);
app.use('/api/topic', topicsRouter_1.default);
//app.use((req, res) => res.sendStatus(404));
//global error handler
app.use('/', (err, req, res, next) => {
    const defaultError = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultError, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
});
