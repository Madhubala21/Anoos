import { userDbController } from "../../core/database/Controller/userDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
// import { PayloadCompiler } from "../access/PayloadCompiler.js";


export class cartMiddleware { }

//products
cartMiddleware.Cart = {
    fetchCart: async ({ token }) => {
        const cart = await userDbController.Cart.getCart(token);
        if (cart != null && cart != undefined && Object.keys(cart).length != 0) {
            var subtotal = 0;
            var totalPrice = 0;
            var price = 0;
            var gst = 0;
            for (let index = 0; index < cart.length; index++) {

                //type conversion
                cart[index].units = Number(cart[index].units);
                var stockPosition = Number(cart[index].index);

                //parse stock
                cart[index].productVariant.availableStock = JSON.parse(cart[index].productVariant.availableStock);

                //compare stock and units
                //if unit - greaterthan stock --- assign current stock as units
                if (cart[index].productVariant.availableStock[stockPosition] < cart[index].units) {
                    cart[index].units = 0;
                }
                delete cart[index].productVariant
                price = Number(price) + Number(cart[index].actualPrice);//mrp
                subtotal = (Number(subtotal) + Number(cart[index].singleProductPrice)) * (cart[index].units);
                totalPrice = Number(totalPrice) + Number(cart[index].totalPrice);//offer
                gst = Number(gst) + Number((cart[index].inclusiveGST) * cart[index].units);
            }
            var discount = price - totalPrice;
            var gst = gst;
            return { cart, price, discount, subtotal, gst, totalPrice };
        } else {
            throw Error.SomethingWentWrong("No Products Found on Cart");
        }
    },

    fetchCount: async ({ token }) => {
        var fetched = await userDbController.Cart.getCount(token);
        if (fetched != null && fetched != undefined && fetched != 0) {
            return {
                count: fetched
            };
        } else {
            return 0;
        }
    },

    createCart: async ({ body, token }) => {
        if (token == false) {
            throw Error.AuthenticationFailed();
        }
        body.customerId = token;
        const userFetched = await userDbController.Customer.fetchCustomer(body);
        if (userFetched.isMailVerified == "no") {
            throw Error.SomethingWentWrong("Email not Verified..!");
        }

        const cartFound = await userDbController.Cart.checkCartExists(body);
        if (cartFound != null && cartFound != undefined && Object.keys(cartFound).length != 0) {
            // throw Error.SomethingWentWrong("Already Added to Cart");
            return "Already Added to Cart"
        }
        else {
            const productFound = await userDbController.Shop.checkProductAvailability(body);
            if (productFound != null && productFound != undefined && Object.keys(productFound).length != 0) {
                if (productFound.availableStock == 0 || productFound.availableStock == null || productFound.availableStock == undefined) {
                    throw Error.SomethingWentWrong("Out of Stock");
                } else {
                    productFound.variantColor = JSON.parse(productFound.variantColor);
                    productFound.availableStock = JSON.parse(productFound.availableStock);
                    var colorLength = productFound.variantColor.length;
                    for (let index = 0; index < colorLength; index++) {
                        if (productFound.variantColor[index] === body.variantColor) {
                            var pricePosition = index;
                        }
                    }

                    //Message for Limited stocks
                    if (productFound.availableStock[pricePosition] < body.units) {
                        const stock = productFound.availableStock[pricePosition];
                        if (stock == 1) {
                            throw Error.SomethingWentWrong("Only " + stock + " Product " + "Available")
                        } else {
                            throw Error.SomethingWentWrong("Only " + stock + " Products " + "Available")
                        }
                    }

                    //parse string
                    productFound.discountPrice = JSON.parse(productFound.discountPrice);
                    productFound.variantImage = JSON.parse(productFound.variantImage);
                    productFound.actualPrice = JSON.parse(productFound.actualPrice);

                    const singleProductPrice = Number(productFound.discountPrice[pricePosition]);//price
                    const actualPrice = Number(productFound.actualPrice[pricePosition]);//price
                    const variantImage = productFound.variantImage[pricePosition];//image
                    const noOfProducts = Number(body.units);//quantity
                    const variant = productFound.id;//variant
                    const totalPrice = singleProductPrice * noOfProducts;

                    //rewrite objects
                    body.customerId = token;
                    body.variantId = variant;
                    body.variantImage = variantImage;
                    body.productId = productFound.productId;
                    body.productName = productFound.productName;
                    body.productId = productFound.productId;
                    // body.singleProductPrice = singleProductPrice;
                    body.actualPrice = actualPrice * noOfProducts;
                    body.totalPrice = totalPrice;
                    body.variantColor = body.variantColor;
                    body.units = noOfProducts;
                    body.tax = Number(productFound.tax);
                    body.index = pricePosition;
                    body.status = "active";

                    // var insp =  body.totalPrice* 100/(100 + (Number(productFound.tax)));
                    // console.log(insp);

                    body.inclusiveGST = Math.round((totalPrice) - (totalPrice * 100 / (100 + (Number(productFound.tax)))));
                    body.singleProductPrice = Math.round((totalPrice * 100 / (100 + (Number(productFound.tax)))));
                    // body.withGST = totalPrice + (totalPrice * (Number(productFound.tax) / 100));
                    const created = await userDbController.Cart.createCart(body);
                    if (created != null && created != undefined && Object.keys(created).length != 0) {
                        return "Added to Cart"
                    } else {
                        throw Error.SomethingWentWrong("Failed to Add Cart");
                    }
                }
            }
            else {
                throw Error.SomethingWentWrong("Product Not found");
            }
        }
    },

    updateCart: async ({ body, token }) => {
        if (token == null || token == undefined) {
            throw Error.AuthenticationFailed();
        }
        const cartExists = await userDbController.Cart.checkCartIdExists(body);
        if (cartExists != null && cartExists != undefined && Object.keys(cartExists).length != 0) {
            const productFound = await userDbController.Shop.checkProductAvailability(cartExists);
            if (productFound != null && productFound != undefined && Object.keys(productFound).length != 0) {

                if (productFound.availableStock == 0 || productFound.availableStock == null || productFound.availableStock == undefined) {
                    throw Error.SomethingWentWrong("Out of Stock")
                } else {
                    var colorLength = JSON.parse(productFound.variantColor);
                    var discountPrice = JSON.parse(productFound.discountPrice);
                    var availableStock = JSON.parse(productFound.availableStock);


                    var actualPrice = JSON.parse(productFound.actualPrice);
                    for (let index = 0; index < colorLength.length; index++) {
                        if (colorLength[index] == cartExists.variantColor) {
                            var position = index;
                        }
                    }

                    const singleProductPrice = Number(discountPrice[position]);//price
                    var actualPrice = Number(actualPrice[position]);//price
                    var availableStock = Number(availableStock[position]);//stock

                    if (body.units === "add") {
                        var noOfProducts = Number(cartExists.units) + Number(1);//quantity
                    } else if (body.units === "sub") {
                        var noOfProducts = Number(cartExists.units) - Number(1);//quantity
                    }

                    const totalPrice = singleProductPrice * noOfProducts;
                    var actualPrice = actualPrice * noOfProducts;

                    body.totalPrice = totalPrice;
                    body.actualPrice = actualPrice;
                    body.units = noOfProducts;
                    body.withGST = totalPrice + (totalPrice * (Number(productFound.tax) / 100));

                    if (noOfProducts === 0) {
                        throw Error.SomethingWentWrong("Minimum Quantity should be 1")
                    }

                    if (availableStock >= noOfProducts) {
                        var updated = await userDbController.Cart.putCart(body);
                        if (updated[0] != 0) {
                            return true;
                        }
                        else {
                            throw Error.SomethingWentWrong("Cart Update Failed");
                        }
                    } else {
                        if (availableStock == 1) {
                            throw Error.SomethingWentWrong("Only " + availableStock + " Product " + "Available")
                        } else {
                            throw Error.SomethingWentWrong("Only " + availableStock + " Products " + "Available")
                        }
                    }
                }

            } else {
                throw Error.SomethingWentWrong("Product Not found");
            }
        } else {
            throw Error.SomethingWentWrong("Cart UnAvailable");
        }
    },
    removeCart: async ({ body, token }) => {
        body.customerId = token;
        var destroyed = await userDbController.Cart.destroyCart(body);
        if (destroyed[0] != 0) {
            return "Removed From Cart";
        }
    },

};
