const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const consumerRouter = require('./routers/consumerRouter.js');
const partitionRouter = require('./routers/partitionRouter.js');
const producerRouter = require('./routers/producerRouter.js');
const topicRouter = require('./routers/topicsRouter.js');
const promPortRouter = require('./routers/promPortRouter.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// if (process.env.NODE_ENV === 'production') {
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   app.get('/', (req, res) =>
//     res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
//   );
// }
app.use('/api/prom-port', promPortRouter)
app.use('/api/consumer', consumerRouter);
app.use('/api/partition', partitionRouter);
app.use('/api/producer', producerRouter);
app.use('/api/topic', topicRouter);


app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  return res.status(err.status ?? 500).json(err.message ?? 'Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});