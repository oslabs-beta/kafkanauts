"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const partitionRouter_1 = __importDefault(require("./routers/partitionRouter"));
const producerRouter_1 = __importDefault(require("./routers/producerRouter"));
const topicsRouter_1 = __importDefault(require("./routers/topicsRouter"));
const promPortRouter_1 = __importDefault(require("./routers/promPortRouter"));
const consumerRouter_1 = __importDefault(require("./routers/consumerRouter"));
const zookeeperRouter_1 = __importDefault(require("./routers/zookeeperRouter"));
const overviewRouter_1 = __importDefault(require("./routers/overviewRouter"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
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
app.use('/api/zookeeper', zookeeperRouter_1.default);
app.use('/api/overview', overviewRouter_1.default);
app.use((req, res) => res.sendStatus(404));
//global error handler
app.use((err, req, res, next) => {
    var _a, _b;
    return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json((_b = err.message) !== null && _b !== void 0 ? _b : 'Internal Server Error');
});
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
