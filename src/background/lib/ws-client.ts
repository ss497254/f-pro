import { EventEmitter2 } from "eventemitter2";
export interface Connection extends EventTarget {
  onerror: ((ev: Event) => void) | null;
  onmessage: ((ev: MessageEvent) => void) | null;
  onclose: ((ev: CloseEvent) => void) | null;
  close(code?: number, reason?: string): void;
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
}

export interface Props<T> {
  retryOnFail?: boolean;
  getConnection: () => T;
}

export interface State {
  status: string;
  error?: string;
}

export class WebSocketClient<T extends Connection> extends EventEmitter2 {
  connection?: T;
  isConnecting = false;
  isResolving = false;
  retryOnFail;
  getConnection: () => T;

  constructor({ getConnection, retryOnFail = false }: Props<T>) {
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

    this.retryOnFail = retryOnFail;
    this.getConnection = getConnection;
  }

  async connect() {
    if (this.isConnecting || this.connection) return;

    try {
      this.isConnecting = true;
      this.emit("state", { status: "connecting" });

      this.connection = this.getConnection();
      this.isConnecting = false;
      this.isResolving = false;
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
    if (this.isConnecting) return;
    if (this.connection) this.disconnect();

    this.connect();
    console.log("reconnecting");
  }

  disconnect() {
    this.connection?.close();
    this.connection = undefined;
    console.log("disconnected");
  }

  private onmessage: NonNullable<Connection["onmessage"]> = (e) => {
    if (!this.isResolving) {
      this.isResolving = true;
      this.emit("state", { status: "connected" });
    }

    if (typeof e.data === "string") {
      const { type, ...data } = JSON.parse(e.data);

      this.emit(type, data);
    } else console.warn(`invalid event data type ${typeof e.data}`);
  };

  private onerror: NonNullable<Connection["onerror"]> = (e) => {
    console.log("error", e);

    this.emit("state", { status: "error", error: JSON.stringify({ ...e }) });
    if (this.retryOnFail) this.reconnect();
  };

  private onclose: NonNullable<Connection["onclose"]> = (e) => {
    console.log("close", e);

    this.emit("state", { status: "closed", error: JSON.stringify({ ...e }) });
    if (this.retryOnFail) this.reconnect();
  };
}
