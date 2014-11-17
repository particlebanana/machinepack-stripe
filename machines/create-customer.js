module.exports = {

  identity: 'create-customer',
  friendlyName: 'Create customer',
  description: 'Create a new customer using the Stripe API.',
  cacheable: false,

  inputs: {
    apiKey: {
      description: 'Valid Stripe API key.',
      example: 'somestring837483749blah',
      required: true
    },
    description: {
      description: 'Arbitrary string that you can attach to a customer object.',
      example: 'sdjasnd928u8duasd'
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    error: {
      example: {
        message: 'Error'
      }
    },
    success: {
      example: {
        "object": "customer",
        "created": 1410377376,
        "id": "cus_4kmLwU2PvQBeqq",
        "livemode": false,
        "description": "Customer for weatherforensics@wdtinc.com",
        "email": null,
        "delinquent": false,
        "metadata": {
        },
        "subscriptions": {
          "object": "list",
          "total_count": 0,
          "has_more": false,
          "url": "/v1/customers/cus_4kmLwU2PvQBeqq/subscriptions",
          "data": [

          ]
        },
        "discount": null,
        "account_balance": 0,
        "currency": "usd",
        "cards": {
          "object": "list",
          "total_count": 1,
          "has_more": false,
          "url": "/v1/customers/cus_4kmLwU2PvQBeqq/cards",
          "data": [
            {
              "id": "card_14bGkv2eZvKYlo2Co1ndeHIy",
              "object": "card",
              "last4": "4242",
              "brand": "Visa",
              "funding": "credit",
              "exp_month": 9,
              "exp_year": 2014,
              "fingerprint": "Xt5EWLLDS7FJjR1c",
              "country": "US",
              "name": "test",
              "address_line1": "2324 SW 137th Street",
              "address_line2": "",
              "address_city": "73170",
              "address_state": "OK",
              "address_zip": "73170",
              "address_country": "US",
              "cvc_check": "pass",
              "address_line1_check": "pass",
              "address_zip_check": "pass",
              "customer": "cus_4kmLwU2PvQBeqq"
            }
          ]
        },
        "default_card": "card_14bGkv2eZvKYlo2Co1ndeHIy"
      }
    }
  },

  fn: function (inputs, exits) {

    var stripe = require('stripe')(inputs.apiKey);

    // Get the base options
    var options = {
      description: inputs.description
    };

    stripe.customers.create(options, function(err, customer) {
      if (err) return exits.error(err);
      return exits.success(customer);
    });

  }

};
