"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
app_1.default.listen(port, () => {
    console.log('API server listening on port ', process.env.PORT);
});
//# sourceMappingURL=server.js.map