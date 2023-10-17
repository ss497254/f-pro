import { EventEmitter2 } from "eventemitter2";

export interface Connection extends EventTarget {
  onerror: ((ev: Event) => void) | null;
  onmessage: ((ev: MessageEvent) => void) | null;
  onclose: ((ev: CloseEvent) => void) | null;
  close(code?: number, reason?: string): void;
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
}

export interface Props<T> {
  getConnection: () => T;
}

export interface State {
  status: string;
  error?: string;
}

export class WebSocketClient<T extends Connection> extends EventEmitter2 {
  connection?: T;
  isConnected = false;
  keepAliveDuration = 1000 * 60; // 1 min;
  isConnecting = false;
  isResolving = false;
  isRetrying = false;
  retries = 0;
  getConnection: () => T;

  constructor({ getConnection }: Props<T>) {
    super({
      wildcard: true,
      verboseMemoryLeak: true,
      delimiter: ".",
      newListener: true,
      removeListener: true,

      // This will ignore the "unspecified event" error
      ignoreErrors: true,
      maxListeners: 25,
    });

    this.getConnection = getConnection;
  }

  async connect() {
    if (this.isConnecting || this.isResolving || this.isConnected) return;

    try {
      this.isConnecting = true;
      this.emit("state", { status: "connecting" });

      this.connection = this.getConnection();
      this.isConnecting = false;
      this.isResolving = true;
      this.emit("state", { status: "resolving" });

      this.connection.onmessage = this.onmessage.bind(this);
      this.connection.onerror = this.onerror.bind(this);
      this.connection.onclose = this.onclose.bind(this);
    } catch (e: any) {
      this.emit("state", {
        status: "failed",
        error: JSON.stringify({ ...e }),
      });
      this.isConnecting = false;
    }
  }

  reconnect() {
    this.disconnect();
    this.connect();
  }

  disconnect() {
    if (this.connection) this.connection.close();

    this.isConnected = false;
    this.connection = undefined;
  }

  keepAlive() {
    if (this.ping()) setTimeout(this.ping.bind(this), this.keepAliveDuration);
  }

  ping() {
    if (!this.isConnected) return false;
    this.connection?.send("{type:'ping'}");
    return true;
  }

  private onmessage: NonNullable<Connection["onmessage"]> = (e) => {
    if (this.isResolving) {
      this.retries = 0;
      this.isResolving = false;
      this.isConnected = true;
      this.emit("state", { status: "connected" });
      this.keepAlive();
    }

    if (typeof e.data === "string") {
      const { type, ...data } = JSON.parse(e.data);

      this.emit(type, data);
    } else console.warn(`invalid event data type ${typeof e.data}`);
  };

  private onerror: NonNullable<Connection["onerror"]> = (e) => {
    this.emit("state", { status: "error", error: JSON.stringify({ ...e }) });
    this.isConnected = false;
    console.warn("ws-client-error", e);
  };

  private onclose: NonNullable<Connection["onclose"]> = (e) => {
    this.emit("state", { status: "closed", error: JSON.stringify({ ...e }) });
    this.isConnected = false;
    console.log("ws-client-close", e);
  };
}
