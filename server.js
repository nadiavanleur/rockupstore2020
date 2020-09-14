const next = require("next");
const express = require("express");
const WooCommerceAPI = require("woocommerce-api");
const wooConfig = require("./wooConfig");

const SERVER_PORT = 3000;
const WORDPRESS_URL = "";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const WooCommerce = new WooCommerceAPI({
  url: wooConfig.url,
  consumerKey: wooConfig.consumerKey,
  consumerSecret: wooConfig.consumerSecret,
  wpAPI: true,
  version: "wc/v1",
});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; // @TODO: Get SSL certificate for site

app
  .prepare()
  .then(() => {
    const server = express();

    // Start custom routes
    server.get("/get_products", (request, response) => {
      WooCommerce.get("products", (error, data, res) => {
        if (error) throw error;
        response.json(JSON.parse(res));
      });
    });
    // End custom routes

    server.get("*", (request, response) => handle(request, response));

    server.listen(SERVER_PORT, (error) => {
      if (error) throw error;
      console.log(`Ready on port ${SERVER_PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
