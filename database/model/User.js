"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const purchaseHistorySchema = new mongoose_1.Schema({
    dishName: String,
    restaurantName: String,
    transactionAmount: Number,
    transactionDate: String
}, { _id: false });
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true },
    cashBalance: { type: Number },
    purchaseHistory: [purchaseHistorySchema],
});
exports.UserModel = (0, mongoose_1.model)("users", UserSchema);
//# sourceMappingURL=User.js.map