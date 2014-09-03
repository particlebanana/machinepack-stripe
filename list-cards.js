/**
 * Module dependencies
 */

// ...



module.exports = {
  id: 'list-cards',
  machinepack: 'stripe',
  description: 'See a list of the cards belonging to a customer or recipient.',
  notes: ' Note that the 10 most recent cards are always available by default on the customer or recipient object. If you need more than those 10, you can use this API method and the limit and starting_after parameters to page through additional cards.',
  moreInfoURL: 'https://stripe.com/docs/api#list_cards',
  noSideEffects: true,
  //??
  inputs: {
    id: {
      description: 'The ID of the customer whose cards will be retrieved',
      example: 'card_14Yfhj2eZvKYlo2CDMqmQSc6',
      required: true
    },
    limit: {
      description: 'A limit on the number of objects to be returned. Limit can range between 1 and 100 items.',
      example: 10
    }
  },
  exits: {
    error: {},
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
  fn: function (inputs,cb) {
   // TODO
   return cb(null , {});
  }
};