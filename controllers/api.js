"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const RestaurantRepo_1 = require("../database/repository/RestaurantRepo");
const User_1 = require("../database/model/User");
const Restaurant_1 = require("../database/model/Restaurant");
// const Restaurant = mongoose.model('restaurants', RestaurantSchema);
class ApiController {
    getRestaurants(req, res) {
        const allRestaurants = RestaurantRepo_1.RestaurantRepo.getAllRestaurants();
        var i = 0;
        allRestaurants.then(function (restaurant) {
            let strDatetime = req.body.strDatetime ? req.body.strDatetime : null;
            let openingRestaurants = [];
            // var key = 0;
            for (let i in restaurant) {
                let isOpening = RestaurantRepo_1.RestaurantRepo.isOpening(strDatetime, restaurant[i].openingHours);
                //  console.log('index', i);
                //  console.log('isOpening', isOpening);
                if (isOpening) {
                    //     delete restaurant[i];
                    // }else{
                    delete restaurant[i]['menu'];
                    delete restaurant[i]['cashBalance'];
                    openingRestaurants.push(restaurant[i]);
                }
            }
            res.json((openingRestaurants));
            //return res.send(restaurant);              
        });
    }
    getTopRestaurants(req, res) {
        let limit = parseInt(req.body.limit);
        let dishCount = req.body.dishCount;
        let fromPrice = parseFloat(req.body.fromPrice);
        let toPrice = parseFloat(req.body.toPrice);
        // const restaurants =  RestaurantModel.aggregate()
        //     .match({ "menu.price": { $gte: fromPrice, $lte: toPrice} })
        //     //.unwind('menu')
        //     .sortByCount('menu')
        //         // [
        //         //     { $match: { "menu.price": { $gte: fromPrice, $lte: toPrice} } },
        //         //     // { $unwind: "menu.price" }, { $sortByCount: "menu.price" },
        //         //     // { $count: "dishCount" },
        //         // ]
        //     .limit(limit).exec();
        //     restaurants.then(
        //         function(restaurant) {
        //             console.log('hi',restaurant);
        //             if(restaurant){
        //             res.json(restaurant); 
        //             }
        //         }
        //     );
        //     res.json({}); 
        /*
        .then(
            function(restaurant) {
                console.log('hi');
                res.json((restaurant));
            },
            function(err) {
                console.log('hoo');
                res.json({});
            }
        );*/
        const restaurants = Restaurant_1.RestaurantModel.aggregate([
            { $match: { 'menu.price': { $gte: fromPrice, $lte: toPrice } } },
            { $unwind: '$menu' },
            { $project: { _id: 0, "restaurantName": 1, "cashBalance": 1, 'openingHours': 1, } },
            { $sort: { 'StudentDetails.StudentScore': 1 } },
            { $limit: 5 }
        ])
            .exec();
        restaurants.then(function (restaurant) {
            console.log('hi', restaurant);
            if (restaurant) {
                res.json(restaurant);
            }
        });
        res.json({});
        //  const restaurants = RestaurantRepo.getTopRestaurantsByOptions(limit,dishCount,fromPrice,toPrice);
        //  restaurants.then(function(restaurant) {
        //          res.json((restaurant)); 
        //  });
    }
    search(req, res) {
        let searchTerm = req.body.searchTerm;
        if (searchTerm && searchTerm.length > 1) {
            const restaurants = RestaurantRepo_1.RestaurantRepo.searchByName(searchTerm);
            restaurants.then(function (restaurant) {
                res.json((restaurant));
            });
        }
        else {
            res.json({});
        }
    }
    purchase(req, res) {
        let userId = req.body.userId;
        let restaurantName = req.body.restaurantName;
        let dishName = req.body.dishName;
        let price = req.body.price;
        const user = User_1.UserModel.findOne({ id: userId });
        user.then(function (userDocument) {
            if (userDocument.cashBalance >= price) {
                let today = new Date();
                let d = today.getDate();
                let m = (today.getMonth() + 1);
                const yyyy = today.getFullYear();
                let dd = d.toString();
                let mm = m.toString();
                if (d < 10)
                    dd = `0${d}`;
                if (m < 10)
                    mm = `0${m}`;
                let purchaseDate = `${mm}/${dd}/${yyyy}`;
                let purchaseDateTime = purchaseDate + ' ' + today.toTimeString().substr(0, 5) + ' ' + today.toLocaleTimeString().slice(-2);
                let purchaseData = {
                    "restaurantName": restaurantName,
                    "dishName": dishName,
                    "transactionAmount": price,
                    "transactionDate": purchaseDateTime
                };
                //add purchase history
                userDocument.purchaseHistory.push(purchaseData);
                //deduct user cashBalance
                userDocument.cashBalance = (userDocument.cashBalance - price);
                userDocument.save();
                const restaurant = Restaurant_1.RestaurantModel.findOne({ restaurantName: restaurantName });
                restaurant.then(function (restaurantDocument) {
                    //add restaurant balanace
                    let balance = (restaurantDocument.cashBalance / 1) + (price / 1);
                    restaurantDocument.cashBalance = balance;
                    restaurantDocument.save();
                    res.json({
                        "statusCode": "0",
                        "message": "Purchase Successful",
                        "user": userDocument,
                        "restaurant": restaurantDocument
                    });
                });
            }
            else {
                res.json({ "statusCode": "100", "message": "Insufficial balance" });
            }
        });
    }
}
exports.ApiController = ApiController;
//# sourceMappingURL=api.js.map