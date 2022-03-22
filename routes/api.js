"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoutes = void 0;
const api_1 = require("../controllers/api");
class ApiRoutes {
    constructor() {
        this.apiController = new api_1.ApiController();
    }
    routes(app) {
        app.route('/api/get_opening_restaurants').post(this.apiController.getRestaurants);
        app.route('/api/get_top_restaurants').post(this.apiController.getTopRestaurants);
        app.route('/api/search').post(this.apiController.search);
        app.route('/api/purchase').post(this.apiController.purchase);
    }
}
exports.ApiRoutes = ApiRoutes;
//# sourceMappingURL=api.js.map