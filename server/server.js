const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const consumerRouter = require('./routes/consumerRouter');
const partitionRouter = require('./routes/partitionRouter');
const producerRouter = require('./routes/producerRouter');
const topicRouter = require('./routes/topicsRouter');
const promPortRouter = require('./routes/promPortRouter');

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
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred ' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});