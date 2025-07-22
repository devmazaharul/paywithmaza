export const httpConfig = Object.freeze({
  host: process.env.HOST || "localhost",
  port: Number(process.env.PORT) || 7070,
  protocol: process.env.PROTOCOL || "http",
  endpoient:"api",
  get url() {
    return `${this.protocol}://${this.host}:${this.port}/${this.endpoient}`;
  }
});

