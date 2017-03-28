declare module 'express-winston' {
  import * as winston from 'winston';
  import { RequestHandler, Request, Response } from 'express';

  var ExpressWinston: ExpressWinston.Middleware;
  export = ExpressWinston;

  namespace ExpressWinston {
    export type RequestFilter = (req?: Request, propName?: string) => any;
    export type ResponseFilter = (req?: Request, propName?: string) => any;
    export type Skip = (req?: Request, res?: Response) => boolean;

    export interface LoggerOptions {
      baseMeta?: {};
      bodyBlacklist?: string[];
      bodyWhitelist?: string[];
      colorize?: boolean;
      expressFormat?: boolean;
      ignoredRoutes?: string[];
      level?: string;
      meta?: boolean;
      metaField?: string;
      msg?: string;
      requestFilter?: RequestFilter;
      requestWhitelist?: string[];
      responseFilter?: ResponseFilter;
      responseWhitelist?: string[];
      skip?: Skip;
      statusLevels?: boolean | {};
      transports?: winston.TransportInstance[];
      winstonInstance?: winston.LoggerInstance;
      dynamicMeta?(req?: Request, res?: Response): Array<{}>;
      ignoreRoute?(req?: Request, res?: Response): boolean;
    }

    export interface ErrorLoggerOptions {
      baseMeta?: {};
      level?: string;
      metaField?: string;
      requestFilter?: RequestFilter;
      requestWhitelist?: string[];
      transports?: winston.TransportInstance[];
      winstonInstance?: winston.LoggerInstance;
    }

    export interface Middleware {
      requestWhitelist: string[];
      bodyWhitelist: string[];
      bodyBlacklist: string[];
      responseWhitelist: string[];
      ignoredRoutes: string[];
      defaultRequestFilter: ExpressWinston.RequestFilter;
      defaultResponseFilter: ExpressWinston.ResponseFilter;
      defaultSkip: ExpressWinston.Skip;
      errorLogger(options?: ExpressWinston.ErrorLoggerOptions): RequestHandler;
      logger(options?: ExpressWinston.LoggerOptions): RequestHandler;
    }
  }
}