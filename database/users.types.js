"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IPurchaseHistorySchema = new mongoose_1.Schema({
    dishName: String,
    restaurantName: String,
    transactionAmount: Number,
    transactionDate: Date,
});
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true },
    cashBalance: { type: Number },
    purchaseHistory: [IPurchaseHistorySchema],
});
exports.default = (0, mongoose_1.model)("users", UserSchema);
//# sourceMappingURL=users.types.js.map