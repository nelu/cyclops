declare module 'express-http-proxy' {
  import { RequestHandler, Request, Response } from 'express';

  function proxy(host: string, options?: proxy.ProxyOptions): RequestHandler;

  namespace proxy {
    export interface ProxyOptions {
      forwardPath?: ForwardPath;
      decorateRequest?: DecorateRequest;
      intercept?: InterceptResponse;
    }

    export interface ForwardPath {
      (req: Request, res: Response): string;
    }

    export interface DecorateRequest {
      (proxyReq: Request, originalReq: Request): Request;
    }

    export interface InterceptResponse {
      (
        targetResponse: Response,
        data: any,
        req: Request,
        res: Response,
      ): void;
    }

  }

  export = proxy;
}