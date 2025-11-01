export const httpConfig = Object.freeze({
  protocol: process.env.NEXT_PUBLIC_PROTOCOL || "http",
  host: process.env.NEXT_PUBLIC_HOST || 'localhost',
  port:  7070,
  endpoient:"api",
  get url() {
    return `${this.protocol}://${this.host}/${this.endpoient}`;
  }
});

