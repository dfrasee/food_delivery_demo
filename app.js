"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const api_1 = require("./routes/api");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
class App {
    /* Swagger files end */
    constructor() {
        this.apiRoute = new api_1.ApiRoutes();
        this.mongoUrl = process.env.DB_CONN_STRING;
        /* Swagger files start */
        this.swaggerFile = (process.cwd() + "/docs/swagger.json");
        this.swaggerData = fs.readFileSync(this.swaggerFile, 'utf8');
        this.customCss = fs.readFileSync((process.cwd() + "/docs/swagger.css"), 'utf8');
        this.swaggerDocument = JSON.parse(this.swaggerData);
        this.app = express();
        this.config();
        this.apiRoute.routes(this.app);
        this.swaggerRoute();
        this.databaseSetup();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    databaseSetup() {
        mongoose.connect(this.mongoUrl)
            .then(res => { console.log('mongodb connected'); })
            .catch(err => { console.log('mongo error in connection:', err); });
    }
    swaggerRoute() {
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map