module.exports = {

friendlyName: 'One-Off Charge',
description: 'Create a new charge without storing customer or card objects in Stripe.',
extendedDescription: 'If your Stripe API key is in test mode, the supplied card won\'t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).  Also note that you can use one of the [test cards provided by Stripe](https://stripe.com/docs/testing#cards), each of which always fails in one predetermined ways.',
cacheable: false,

inputs: {
    apiKey: {
        description: 'Your Stripe API key',
        whereToGet: {
            url: 'https://dashboard.stripe.com/account/apikeys',
            description: 'Copy either "Test Secret Key" or "Live Secret Key" from your Stripe dashboard.',
            extendedDescription: 'Make sure you are logged in to your Stripe account, or create an account if you have not already done so.'
        },
        example: 'somestring837483749blah',
        required: true
    },
    amount: {
        description: 'The amount to charge, in the smallest currency unit (e.g. 500 to charge $5.00)',
        extendedDescription: 'A positive integer in the smallest currency unit (e.g 100 cents to charge $1.00, or 1 to charge ¥1, a 0-decimal currency) representing how much to charge the card. The minimum amount is $0.50 (or equivalent in charge currency).',
        example: 500,
        required: true
    },
    currency: {
        description: '3-letter ISO code for currency.',
        example: 'usd',
        required: true
    },
    cardnumber: {
        description: 'The Credit Card number to charge.',
        extendedDescription: 'If you also pass a customer ID, the card must be the ID of a card belonging to the customer. Otherwise, if you do not pass a customer ID, the card you provide must either be a Stripe token, like the ones returned by Stripe.js.',
        example: '4242424242424242',
        required: true
    },
    cardexpmonth: {
        description: 'The credit card expiration month.',
        example: 12,
        required: true
    },
    cardexpyear: {
        description: 'The credit card expiration year.',
        example: 2016,
        required: true
    },
    cardcvc: {
        description: 'The credit card CVC.',
        example: '123',
        required: true
    },
    description: {
        description: 'An arbitrary string to attach to the charge object in Stripe.',
        extendedDescription: 'It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the description of the charge(s) that they are describing.',
        example: 'This notable charge was for several gallons of mayonnaise!'
    }
},
defaultExit: 'success',
exits: {
    error: {
        description: 'Unexpected error',
        variableName: 'err'
    },
    success: {
        variableName: 'newCharge',
        example: {
            "id": "ch_15snH1EzNPZriN1fcZdf93yd",
            "object": "charge",
            "created": 1429330183,
            "livemode": false,
            "paid": true,
            "status": "succeeded",
            "amount": 400,
            "currency": "usd",
            "refunded": false,
            //"card": {
            //    "id": "card_15sQnPEzNPZriN1fankryJ0u",
            "source": {
                "id": "card_15snH1EzNPZriN1fnGOVlXd2",
                "object": "card",
                "last4": "4242",
                "brand": "Visa",
                "funding": "credit",
                "exp_month": 12,
                "exp_year": 2017,
                "fingerprint": "IbpuqGziWHHlfWgO",
                "country": "US",
                "name": null,
                "address_line1": null,
                "address_line2": null,
                "address_city": null,
                "address_state": null,
                "address_zip": null,
                "address_country": null,
                "cvc_check": "pass",
                "address_line1_check": null,
                "address_zip_check": null,
                "dynamic_last4": null,
                "metadata": {},
                "customer": null
            },
            "captured": true,
            "balance_transaction": "txn_15snH1EzNPZriN1fGyl94sFF",
            "failure_message": null,
            "failure_code": null,
            "amount_refunded": 0,
            "customer": null,
            "invoice": null,
            "description": "Charge for test@example.com",
            "dispute": null,
            "metadata": {},
            "statement_descriptor": null,
            "fraud_details": {},
            "receipt_email": null,
            "receipt_number": null,
            "shipping": null,
            "application_fee": null,
            "refunds": {
                "object": "list",
                "total_count": 0,
                "has_more": false,
                "url": "/v1/charges/ch_15snH1EzNPZriN1fcZdf93yd/refunds"
            }
        }
    }
},

  fn: function (inputs, exits) {


      // TODO: handle more specific exits (i.e. rate limit, customer does not exist, etc.)
      var stripe = require("stripe")(
          inputs.apiKey
      );

      stripe.charges.create({
        amount: inputs.amount,
        currency: "usd",
        source: {
            number:   inputs.cardnumber,
            exp_month:inputs.cardexpmonth,
            exp_year: inputs.cardexpyear,
            cvc: inputs.cardcvc
        },
          description: inputs.description
      }, function(err, charge) {
          // asynchronously called
          if (err) return exits.error(err);
          return exits.success(charge);
      });
  }
};