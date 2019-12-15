var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
const multer = require("multer");
const config = require("../config");
var mysql = require('./db/sql');
var moment = require('moment');

const cors = require("cors");
const stripe = require("stripe")("sk_test_j7e4yqH3k2HPxsPOok2jbmcu00ml3G0tfR");
const uuid = require("uuid/v4");


router.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Payment for the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
    res.statusMessage = "Payment Complete";
    res.status(200).send({result: charge});
  
  } catch (error) {
    console.error(error);
    status = "failure";
    res.status(403);
    res.send({msg: 'Something Went Worng'});
  }
});


module.exports = router;