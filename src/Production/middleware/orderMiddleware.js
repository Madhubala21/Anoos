import { userDbController } from "../../core/database/Controller/userDbController.js";
import * as Error from "../../core/errors/ErrorConstant.js";
import require from "requirejs"
import moment from "moment";
// const Stripe = require('stripe');
import Paytm from "paytm-pg-node-sdk"

export class orderMiddleware { }

//products
orderMiddleware.Order = {
  fetchOrders: async ({ token }) => {
    if (token == false) {
      throw Error.AuthenticationFailed();
    }
    var fetched = await userDbController.Order.fetchOrders(token);
    var fetchedLength = fetched.length;
    var cartIds = [];
    var image = [];
    for (let index = 0; index < fetchedLength; index++) {
      fetched[index].cartId = JSON.parse(fetched[index].cartId);
      var slave = fetched[index].cartId.length;
      for (let cartIndex = 0; cartIndex < slave; cartIndex++) {
        cartIds.push(fetched[index].cartId[cartIndex]);
      }

      var fetchCart = await userDbController.Cart.fetchUserCartArray(cartIds, token);
      for (let temp = 0; temp < fetchCart.length; temp++) {
        image.push(fetchCart[temp].variantImage);
      }

      fetched[index].variantImages = image;
      fetched[index].units = cartIds.length;
      fetched[index].timestamp = moment(fetched[index].createdAt).format("MMM Do, Y");
      delete fetched[index].cartId;
      delete fetched[index].createdAt;

      var cartIds = [];
      var image = [];

    }
    return fetched;
  },
  fetchOrderDetails: async ({ body, token }) => {
    if (token === false) {
      throw Error.AuthenticationFailed();
    }
    body.customerId = token;
    var orderInfo = await userDbController.Order.getOrderDetails(body);
    if (orderInfo != null && orderInfo != undefined && Object.keys(orderInfo).length != 0) {
      var cartIds = JSON.parse(orderInfo.cartId);
      var isReviewed = JSON.parse(orderInfo.isReviewed);
      const productInfo = await userDbController.Cart.fetchCartArray(cartIds);
      for (let index = 0; index < isReviewed.length; index++) {
        productInfo[index].isReviewed = isReviewed[index];
        productInfo[index].createdAt = moment(productInfo[index].createdAt).fromNow();
      }
      orderInfo.createdAt = moment(orderInfo.createdAt).format("MMM D ddd Y");
      delete orderInfo.isReviewed;
      delete orderInfo.cartId;
      return { orderInfo, productInfo };
    } else {
      return "Orders Summary Not Found";
    }
  },
};
orderMiddleware.Checkout = {
  checkOutAll: async ({ token, body }) => {
    if (token == false) {
      throw Error.AuthenticationFailed();
    }
    body.customerId = token;
    if (token != false && token != undefined && token != null) {
      const fetchCart = await userDbController.Cart.getCartforCheckout(body);
      if (fetchCart.length != 0) {
        var master = [];
        var isReviewed = [];
        var sum = 0;
        // var mrp = 0;
        for (let index = 0; index < fetchCart.length; index++) {
          master.push(fetchCart[index].id)
          if (fetchCart[index]) {
            isReviewed.push(0)
          }
          sum = Number(sum) + Number(fetchCart[index].totalPrice)
        }
        // var offerPrice=mrp-sum;
        const userFetched = await userDbController.Customer.fetchCustomer(body);

        if (userFetched.status == "inactive" || userFetched.status == "terminated") {
          throw Error.SomethingWentWrong("Account Inactive..Contact Admin!")
        } else if (userFetched.length != 0) {

          // Generate Order
          var timestamp = JSON.stringify(Date.now());
          var order = "ORD" + timestamp;
          var environment = Paytm.LibraryConstants.STAGING_ENVIRONMENT;
          var mid = configs.paymentGatewayId;
          var key = configs.paymentGatewaySecret;
          var website = "WEBSTAGING";
          var callbackUrl = configs.paymentCallback + order + "";


          Paytm.MerchantProperties.setCallbackUrl(callbackUrl);
          Paytm.MerchantProperties.initialize(environment, mid, key, website);
          Paytm.Config.logName = "[PAYTM]";

          //paytm Block
          try {
            //initiate payment 
            var channelId = Paytm.EChannelId.WEB;
            var orderId = order;
            var shippingFee = Number(configs.shippingFee);
            var amount = sum + shippingFee;
            var amount = JSON.stringify(amount)
            var txnAmount = Paytm.Money.constructWithCurrencyAndValue(Paytm.EnumCurrency.INR, amount);
            var userInfo = new Paytm.UserInfo(JSON.stringify(userFetched.id));
            userInfo.setEmail(JSON.stringify(userFetched.email));
            userInfo.setFirstName(JSON.stringify(userFetched.usereName));
            userInfo.setMobile(JSON.stringify(userFetched.phone));

            var paymentDetailBuilder = new Paytm.PaymentDetailBuilder(channelId, orderId, txnAmount, userInfo);
            var paymentDetail = paymentDetailBuilder.build();
            var response = await Paytm.Payment.createTxnToken(paymentDetail);
            var checkout = {
              orderId: orderId,
              price: amount,
              shippingFee: shippingFee,
              txnToken: response.responseObject.body.txnToken,
            }
            // subtotal:body.singleProductPrice,
            // gst:body.inclusiveGST,

            var paytmTxntoken = checkout.txnToken;
            var cartId = JSON.stringify(master);
            var isReviewed = JSON.stringify(isReviewed);
            var token = body.customerId;
            var orderdetails = { orderId, token, cartId, amount, paytmTxntoken, isReviewed }
            //create Order
            const orderCreated = await userDbController.Order.createOrder(orderdetails);
            if (orderCreated.length != 0) {
              return checkout;
            } else {
              throw Error.SomethingWentWrong("Failed To Create Order")
            }

          } catch (error) {
            throw Error.SomethingWentWrong("Payment Server Error")
          }
        }
      } else {
        throw Error.SomethingWentWrong("Ooops..Cart Empty !");
      }

    } else {
      throw Error.AuthenticationFailed();
    }
  },
};
orderMiddleware.Payment = {
  makePayment: async ({ body, token }) => {
    if (token == false) {
      throw Error.AuthenticationFailed();
    }
    body.customerId = token;
    var fetched = await userDbController.Order.fetchOrderbyId(body);
    if (fetched != null && fetched != undefined && Object.keys(fetched).length != 0) {
      var fetchedcartId = [];
      for (let index = 0; index < fetched.length; index++) {
        fetched[index].cartId = JSON.parse(fetched[index].cartId);
        var fetchedLength = fetched[index].cartId.length;

        for (let temp = 0; temp < fetchedLength; temp++) {
          fetchedcartId.push(fetched[index].cartId[temp]);
        }
        body.cartIds = fetchedcartId;
        var fetchedcartId = [];
      }
    } else {
      throw Error.SomethingWentWrong("No Orders found");
    }

    // console.log(fetched);
    if (body.deliveryType === "PAYNOW") {
      let orderId = body.orderId;
      let readTimeout = 80000;
      let paymentStatusDetailBuilder = new Paytm.PaymentStatusDetailBuilder(orderId);
      let paymentStatusDetail = paymentStatusDetailBuilder.setReadTimeout(readTimeout).build();
      let response = await Paytm.Payment.getPaymentStatus(paymentStatusDetail);
      let orderStatus = response.responseObject.body.resultInfo.resultStatus;
      let amountPaid = response.responseObject.body.txnAmount;
      let orderedId = response.responseObject.body.orderId;
      body.txnAmount = fetched[0].totalAmount;
      if (orderStatus === "TXN_SUCCESS" && Math.round(amountPaid) == body.txnAmount && orderedId == body.orderId) {
        body.txnStatus = orderStatus;
        let updateOrder = await userDbController.Order.updatePaynowOrder(body);
        if (updateOrder[0] != 0) {
          //update Cart
          const cartArchieved = await userDbController.Cart.archiveCart(body);
          if (cartArchieved[0] != 0) {
            return "Order Placed Successfully"
          }
        } else {
          throw Error.SomethingWentWrong("Unable to Place Order");
        }
      } else {
        throw Error.SomethingWentWrong("Unable to Place Order");
      }
    } else if (body.deliveryType == "COD") {
      let updateOrder = await userDbController.Order.updateCODOrder(body);
      if (updateOrder[0] != 0) {
        //update Cart
        const cartArchieved = await userDbController.Cart.archiveCart(body);
        if (cartArchieved[0] != 0) {
          return "Order Placed Successfully"
        }
      } else {
        throw Error.SomethingWentWrong("Unable to Place Order");
      }
    }
  },
}
