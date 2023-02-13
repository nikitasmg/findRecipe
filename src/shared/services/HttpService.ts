import { LoggerService } from "./LoggerService";

type RequestInterceptor = (options?: RequestInit) => RequestInit;
type ResponseInterceptor = <T = Response, R = Response>(response?: T) => R;

const fetcher = () => {
  const requestInterceptors: RequestInterceptor[] = [];
  const responseInterceptors: ResponseInterceptor[] = [];

  const use =
    (type: "request" | "response") => (callback: RequestInterceptor | ResponseInterceptor) => {
      const storage = type === "request" ? requestInterceptors : responseInterceptors;

      storage.push(callback);
    };

  const eject =
    (type: "request" | "response") => (callback: RequestInterceptor | ResponseInterceptor) => {
      const storage = type === "request" ? requestInterceptors : responseInterceptors;
      const index = storage.indexOf(callback);
      if (~index) {
        storage.splice(index, 1);
      }
    };

  return {
    create: () => {
      return {
        fetch: async (input: RequestInfo | URL, options?: RequestInit) => {
          const preparedOptions = requestInterceptors.reduce(
            (res, interceptor) => interceptor(res),
            options
          );

          const response = await fetch(input, preparedOptions);

          const updatedResponse = responseInterceptors.reduce(
            (res, interceptor) => interceptor(res),
            response
          );

          return updatedResponse;
        },
        interceptors: {
          request: {
            use: use("request"),
            eject: eject("request")
          },
          response: {
            use: use("response"),
            eject: eject("response")
          }
        }
      };
    }
  };
};

type Client = ReturnType<ReturnType<typeof fetcher>["create"]>;

export class HttpService {
  client: Client;
  apiUrl: string;
  logger?: LoggerService;

  constructor({
    apiUrl = "",
    logger = new LoggerService(console),
    client = fetcher().create()
  }: {
    apiUrl: string;
    client: Client;
    logger?: LoggerService;
  }) {
    this.logger = logger;
    this.client = client;
    this.apiUrl = apiUrl;
  }

  post(input: string, data: Record<string, unknown>, options?: RequestInit) {
    return this.client.fetch(`${this.apiUrl}${input}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      },
      body: JSON.stringify(data),
      ...options
    });
  }
}
