import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import ElectronStore from 'electron-store';
//import React from 'react';
//import consumerController from './consumerController';

const schema:any = {
  port: {
    type: 'string',
  },
  nickname: {
    type: 'string',
  },
  time: {
    type: 'string',
  }
}

const db = new ElectronStore({schema});
const promPortController = {
  async isPromPortUp(req: Request, res: Response, next: NextFunction) {
    const { port } = req.body;
    // https://stackoverflow.com/questions/12968093/regex-to-validate-port-number#comment89586361_12968117
    const convertStringToNum = Number(port);
    if (!Number.isInteger(convertStringToNum) || convertStringToNum < 0 || convertStringToNum > 65535) {
      return res.status(400).json({error: 'Expected an integer from 0 to 65535.'});
    }
    try {
      const { data } = await axios.get(`http://localhost:${port}/api/v1/query?query=up`);
      if (data.status === 'success') {
        return next();
      }
      return res.status(404).json({error: `Prometheus doesn't seem to be running on port ${port}!`})
    } catch (e) {
      return next(e);
    }
  },
  savePortToElectronStore(req: Request, res: Response, next: NextFunction) {
    const { port, nickname, time } = req.body;
    db.set('port', port);
    db.set('nickname', nickname);
    db.set('time', time);
    return next();
  },
  
  getSavedPortFromElectronStore(req: Request, res: Response, next: NextFunction) {
    const port = db.get('port');
    res.locals.port = port;
    return next();
  },

  getSavedStartTimeFromElectronStore(req: Request, res: Response, next: NextFunction) {
    const time = db.get('time');
    res.locals.time = time;
    return next();
  },

  getSavedIntervalFromElectronStore(req: Request, res: Response, next: NextFunction) {

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
}
export default promPortController;