"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
const mongoose_1 = require("mongoose");
const RestaurantSchema = new mongoose_1.Schema({
    restaurantName: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    cashBalance: {
        type: mongoose_1.Schema.Types.Number,
        default: 0.00,
    },
    openingHours: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    menu: [{
            dishName: mongoose_1.Schema.Types.String,
            price: mongoose_1.Schema.Types.Number,
        }],
}).index({ "restaurantName": "text", "menu.dishName": "text" });
exports.RestaurantModel = (0, mongoose_1.model)('restaurants', RestaurantSchema);
//# sourceMappingURL=Restaurant.js.map