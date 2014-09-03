/**
 * Module dependencies
 */

// ...



module.exports = {
  id: 'create-card',
  machinepack: 'stripe',
  description: 'Create a new card for a customer or recipient.',
  notes: 'When you create a new credit card, you must specify a customer or recipient to create it on. Creating a new credit card will not change the card owner\'s existing default credit card; you should update the customer or recipient with a new default_card for that. If the card\'s owner has no default credit card, the added credit card will become the default.  Whenever you create a new card for a customer, Stripe will automatically validate the card.',
  moreInfoURL: 'https://stripe.com/docs/api#create_card',
  noSideEffects: true,
  inputs: {
    token: {
      description: 'The card should be specified as a token returned by the `Stripe.js` client.  More about tokens: https://stripe.com/docs/stripe.js',
      example: 'blahblahblahthetoken'
    }
  },
  exits: {
    error: {},
    success: {
      example: {
        "id": "card_14Ye1j2eZvKYlo2CJOPrAfPP",
        "object": "card",
        "last4": "4242",
        "brand": "Visa",
        "funding": "credit",
        "exp_month": 12,
        "exp_year": 2016,
        "fingerprint": "Xt5EWLLDS7FJjR1c",
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
        "customer": "cus_4i4AvLpWDpiivV"
      }
    }
  },
  fn: function (inputs,cb) {
   // TODO
   return cb(null , {});
  }
};


