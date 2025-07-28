export const httpConfig = Object.freeze({
  protocol: process.env.PROTOCOL || "https",
  host: process.env.HOST || "mazapay-production.up.railway.app",  //https://mazapay-production.up.railway.app/
  port:  7070,
  endpoient:"api",
  get url() {
    return `${this.protocol}://${this.host}:${this.port}/${this.endpoient}`;
  }
});

