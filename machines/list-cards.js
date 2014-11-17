module.exports = {

  identity: 'list-cards',
  friendlyName: 'List cards',
  description: 'See a list of the cards belonging to a customer or recipient.',
  extendedDescription: 'Note that the 10 most recent cards are always available by default on the customer or recipient object. If you need more than those 10, you can use this API method and the limit and starting_after parameters to page through additional cards.',
  cacheable: true,

  inputs: {
    apiKey: {
      description: 'Valid Stripe API key.',
      example: 'somestring837483749blah',
      required: true
    },
    customer: {
      description: 'ID of customer tp list cards for.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    error: {
      example: {
        message: ''
      }
    },
    success: {
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
            "address_line1": null,
            "address_line2": null,
            "address_city": null,
            "address_state": null,
            "address_zip": null,
            "address_country": null,
            "cvc_check": "pass",
            "address_line1_check": null,
            "address_zip_check": null,
            "customer": "cus_4i4zVBclvGqTAN"
          }
        ]
      }
    }
  },

  fn: function (inputs, exits) {

    var stripe = require('stripe')(inputs.apiKey);

    stripe.customers.listCards(inputs.customer, function(err, response) {
      if (err) return exits.error(err);
      return exits.success(response);
    });

  }

};
