import { userDbController } from "../../core/database/Controller/userDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";


export class productMiddleware { }

//products
productMiddleware.Product = {
    fetchFilterProduct: async ({ body, token }) => {

        body.customerId = token || null;
        if (body.ratings != null && body.priceRange) {
            var fetched = await userDbController.Shop.getFilters(body);
            if (fetched != null && fetched != undefined && fetched.length != 0) {
                var master = [];
                for (let index = 0; index < fetched.length; index++) {

                    fetched[index].productVariants.discountPrice = JSON.parse(fetched[index].productVariants.discountPrice)
                    if (fetched[index].ratings == null || fetched[index].ratings == undefined) {
                        fetched[index].ratings = 0;
                    } else {
                        fetched[index].ratings = Math.round(fetched[index].ratings);
                    }
                    if (fetched[index].productVariants == undefined || fetched[index].productVariants == null || fetched[index].productVariants.discountPrice == null) {
                        fetched.splice(index); //remove index
                    }
                }

                // return fetched
                //filter inputs
                // var categories = body.categories;
                var ratings = body.ratings;
                var price = body.priceRange;


                function search(myArray) {
                    for (var i = 0; i < myArray.length; i++) {
                        var priceLength = fetched[i].productVariants.discountPrice.length;
                        for (let temp = 0; temp < priceLength; temp++) {
                            if (myArray[i].productVariants.discountPrice[temp] >= price[0] && myArray[i].productVariants.discountPrice[temp] <= price[1]) {
                                master.push(myArray[i])
                            }
                        }
                        for (let j = 0; j < ratings.length; j++) {
                            if (myArray[i].ratings <= ratings[j]) {
                                master.push(myArray[i])
                            }
                        }
                        // for (let k = 0; k < categories.length; k++) {
                        //     if (myArray[i].categoryName == categories[k]) {
                        //         master.push(myArray[i])
                        //     }
                        // }
                        priceLength = 0;
                        //Rewrite objects
                        myArray[i].variantName = myArray[i].productVariants.variantName;
                        myArray[i].productVariants.discountPrice = myArray[i].productVariants.discountPrice.sort((a, b) => (a > b) ? 1 : -1);
                        myArray[i].discountPrice = myArray[i].productVariants.discountPrice[0];
                        delete myArray[i].productVariants.variantName;
                        delete myArray[i].productVariants.variantImage;
                        delete myArray[i].productVariants;
                    }
                }

                search(fetched); //function call
                // var fetched = [...new Set(master)];//only unique
                //remove dupicate arrayObjects
                var keys = ['id'];
                var fetched = master.filter((s => o => (k => !s.has(k) && s.add(k))
                    (keys.map(k => o[k]).join('|')))
                    (new Set));

                if (fetched.length != 0 && fetched != null && fetched != undefined) {
                    //Array sort
                    switch (body.sort) {
                        case 1:
                            //price Desc
                            return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? -1 : 1);
                        case 2:
                            //price Asc
                            return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1 : -1);
                        case 3:
                            //productname Asc
                            return fetched.sort((a, b) => (a.productName > b.productName) ? 1 : -1);
                        case 4:
                            //productname Desc
                            return fetched.sort((a, b) => (a.productName > b.productName) ? -1 : 1);
                        default:
                            //price Asc
                            return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? -1 : 1);
                    }
                } else {
                    return "No Products Found..!"
                }
            } else {
                return "No Products Found..!"
            }

        } else {
            var fetched = await userDbController.Shop.getFilters(body);
            // var fetched = await userDbController.Shop.getWishlistedProducts(body);

            if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
                for (var index = 0; index < fetched.length; index++) {
                    //replace null to 0 for wishlist
                    if (fetched[index].favourites == null) {
                        fetched[index].favourites = 0;
                    }
                    //replace  product variant - price null to 0 
                    if (fetched[index].productVariants.discountPrice == null) {
                        fetched[index].discountPrice = 0;
                    } else {
                        fetched[index].productVariants.discountPrice = JSON.parse(fetched[index].productVariants.discountPrice);
                        fetched[index].discountPrice = Number(fetched[index].productVariants.discountPrice[0]);
                    }
                    if (fetched[index].productVariants.actualPrice == null) {
                        fetched[index].actualPrice = 0;
                    } else {
                        fetched[index].productVariants.actualPrice = JSON.parse(fetched[index].productVariants.actualPrice);
                        fetched[index].actualPrice = Number(fetched[index].productVariants.actualPrice[0]);
                    }
                    if (fetched[index].ratings == null) {
                        fetched[index].ratings = 0;
                    } else {
                        //convert ratings- 2.3000 to 2.3
                        fetched[index].ratings = Math.sign(fetched[index].ratings) * Math.abs(fetched[index].ratings);
                        fetched[index].ratings = Number(fetched[index].ratings.toFixed(1));
                    }
                    fetched[index].variantName = fetched[index].productVariants.variantName;
                    delete fetched[index].productVariants;

                }
                //remove dupicate arrayObjects
                var keys = ['id'];
                var fetched = fetched.filter((s => o => (k => !s.has(k) && s.add(k))
                    (keys.map(k => o[k]).join('|')))
                    (new Set));
                // Array Sort
                switch (body.sort) {
                    case 1:
                        //price Desc
                        return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? -1 : 1);
                    case 2:
                        //price Asc
                        return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1 : -1);
                    case 3:
                        //productname Asc
                        return fetched.sort((a, b) => (a.productName > b.productName) ? 1 : -1);
                    case 4:
                        //productname Desc
                        return fetched.sort((a, b) => (a.productName > b.productName) ? -1 : 1);
                    default:
                        //price Asc
                        return fetched.sort((a, b) => (a.discountPrice > b.discountPrice) ? -1 : 1);
                }
            } else {
                return "No Products Found"
            }
        }

    },
    fetchSpecs: async ({ body }) => {
        const fetched = await userDbController.Shop.fetchProductSpecs(body);
        const fetchDetails = await userDbController.Shop.fetchProductDetails(body);
        fetched.moreInfo = fetchDetails.moreInfo;
        fetched.productDescription = fetchDetails.productDescription;
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            return fetched;
        } else {
            return "No Specifiations Found"
        }
    },
    fetchRecommended: async ({ body }) => {
        const getRecommended = await userDbController.Shop.getAllRecommended()
        var productIds = [];
        for (let index = 0; index < getRecommended.length; index++) {
            productIds.push(getRecommended[index].productId);
        }
        const fetchProductArray = await userDbController.Shop.fetchProductArray(productIds)
        if (fetchProductArray != null && fetchProductArray != undefined && Object.keys(fetchProductArray).length != 0) {
            return fetchProductArray;
        } else {
            throw Error.SomethingWentWrong("No Recommended Products Found");
        }
    },
};


//prodct variants
productMiddleware.Variant = {
    fetchVariant: async ({ body, token }) => {
        const fetched = await userDbController.Shop.fetchVariants(body, token);
        if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
            for (let index = 0; index < fetched.length; index++) {
                if (fetched[index].favourites == null) {
                    fetched[index].favourites = 0
                }
            }
            return fetched;
        } else {
            return "No Variants Found"
        }
    },

};


