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
const consumerController = {
    // async consumerTotalTime (req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const { port, time, interval } = res.locals;
    //     const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=${time}&end=${new Date().toISOString}&step=${interval}`);
    //     //kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=${new Date().setDate(date.getDate() - 1).toISOString()}&end=${new Date().toISOString()}&step=${interval.toString()}s
    //     res.locals.consumerTotalTime = result;
    //     return next();
    //   } catch(e) {
    //     return next(e);
    //   }
    // },
    consumerLag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { port, interval } = res.locals;
                const url = `http://localhost:${port}/api/v1/query_range?query=kafka_server_delayedfetchmetrics_expirespersec_fetchertype_consumer&start=${new Date().toISOString()}&end=${new Date().toISOString()}&step=${interval}s`;
                console.log('url: ', url);
                const { data: { data: { result } } } = yield axios_1.default.get(url);
                res.locals.consumerLag = result;
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
    }
};
exports.default = consumerController;
