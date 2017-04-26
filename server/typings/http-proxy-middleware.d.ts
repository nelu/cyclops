/** Type declarations for http-proxy-middleware. */
declare module 'http-proxy-middleware' {
  import { Request, Response, RequestHandler } from 'express';

  namespace HttpProxyMiddleware {
    interface ProxyReq {
      setHeader(header: string, value: string): void;
    }
    /**
     * Rewrite target's url path. Key will be used as a regex to match paths.
     */
    interface PathRewrite {
      [path: string]: string;
    }

    /** Options for http-proxy-middleware. */
    interface Options {
      /** Target host to proxy to. */
      target?: string;
      pathRewrite?: PathRewrite;
      logLevel?: 'debug' | 'info' | 'warn' | 'error' | 'silent';
      changeOrigin?: boolean;
      onProxyReq?(proxyReq: ProxyReq, req: Request, res: Response): void;
    }
  }

  function HttpProxyMiddleware(
    options: HttpProxyMiddleware.Options,
  ): RequestHandler;

  export = HttpProxyMiddleware;
}