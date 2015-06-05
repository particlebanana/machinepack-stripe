module.exports = {

  friendlyName: 'List cards',

  description: 'List all cards in Stripe for a customer.',

  moreInfoUrl: 'https://stripe.com/docs/api#list_cards',

  cacheable: true,

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
    customer: {
      description: 'The Stripe id of the customer whose cards will be listed',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error',
      variableName: 'err'
    },

    success: {
      description: 'Got list of cards',
      variableName: 'cards',
      example: {
        "object": "list",
        "url": "/v1/customers/cu_14YepJ2eZvKYlo2CUJrwelj2/cards",
        "has_more": false,
        "data": [
          {
            "id": "card_14Yfhj2eZvKYlo2CDMqmQSc6",
            "object": "card",
            "last4": "4242",
            "brand": "Visa",
            "funding": "credit",
            "exp_month": 8,
            "exp_year": 2016,
            "fingerprint": "Xt5EWLLDS7FJjR1c",
            "country": "US",
            "name": "c_brennan@me.com",
            "address_line1": "123 Fake St",
            "address_line2": "Apt 100",
            "address_city": "Austin",
            "address_state": "TX",
            "address_zip": 78701,
            "address_country": "United States",
            "cvc_check": "pass",
            "address_line1_check": "pass",
            "address_zip_check": "pass",
            "customer": "cus_4i4zVBclvGqTAN"
          }
        ]
      }
    }
  },

  fn: function (inputs, exits) {

    // TODO: handle more specific exits (i.e. rate limit, customer does not exist, etc.)

    var stripe = require('stripe')(inputs.apiKey);

    stripe.customers.listCards(inputs.customer, function(err, response) {
      if (err) return exits.error(err);
      return exits.success(response);
    });

  }

};
