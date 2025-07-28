export const httpConfig = Object.freeze({
  protocol: process.env.PROTOCOL || "http",
  host: process.env.HOST || "18.182.7.88", 
  port:  7070,
  endpoient:"api",
  get url() {
    return `${this.protocol}://${this.host}:${this.port}/${this.endpoient}`;
  }
});

