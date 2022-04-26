import partitionRouter from './routers/partitionRouter';
import producerRouter from './routers/producerRouter';
import topicRouter from './routers/topicsRouter';
import promPortRouter from './routers/promPortRouter';
import consumerRouter from './routers/consumerRouter';
import zookeeperRouter from './routers/zookeeperRouter';
import express, { Request, Response, NextFunction } from 'express';
import { ServerError } from '../types';


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
app.use('/api/prom-port', promPortRouter);
app.use('/api/consumer', consumerRouter);
app.use('/api/partition', partitionRouter);
app.use('/api/producer', producerRouter);
app.use('/api/topic', topicRouter);
app.use('/api/zookeeper', zookeeperRouter);


app.use((req, res) => res.sendStatus(404));

//global error handler
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred'},
  };

  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
