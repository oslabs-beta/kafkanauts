import * as express from 'express';
import { RequestHandler } from 'express';
import React from 'react';

export type middlewareFunction = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

export type Port = number;

export type Nickname = string;

export type Time = string;

export interface timeState {
  time: Time;
};

export type EventHandlers = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (e: React.ChangeEventHandler<HTMLInputElement>) => void
}

// export interface QueryProps extends State {
//   query: string;
//   port: Port; 
//   nickname: Nickname;
//   handleOnClick(query: string, port: Port): void;
// };


export interface ProducerController {
  totalProducerRequests: RequestHandler;
  totalFailedProducerRequests: RequestHandler;
  totalProducerMetrics: RequestHandler;
};

export interface ConsumerController {
  getConsumerTotalTime: RequestHandler;
};

export interface TopicsController {
  totalTopicCount: RequestHandler;
  totalTopicMetrics: RequestHandler;
};

export interface PromPortController {
  isPromPortUp: RequestHandler;
  savePortToElectronStore: RequestHandler;
  getSavedPortFromElectronStore: RequestHandler;
  getSavedStartTimeFromElectronStore: RequestHandler;
};

export interface PartitionController {
  totalPartitionCount: RequestHandler;
  offlinePartitionCount: RequestHandler;
};

export interface ServerError {
  log: string;
  status?: number;
  message: { err: string };
};

export interface Queries {
  queryKey: string,
  queryFn: () => Promise<any>,
  refetchInterval: number,
  refetchIntervalInBackground: boolean
}