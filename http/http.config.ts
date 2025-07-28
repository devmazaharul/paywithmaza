export const httpConfig = Object.freeze({
  protocol: process.env.PROTOCOL || "http",
  host: process.env.HOST || "57.181.173.193",  //https://mazapay-production.up.railway.app/
  port:  7070,
  endpoient:"api",
  get url() {
    return `${this.protocol}://${this.host}:${this.port}/${this.endpoient}`;
  }
});

