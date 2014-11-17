module.exports = {

  identity: 'create-card',
  friendlyName: 'Create card',
  description: 'Create a new card for a customer or recipient.',
  extendedDescription: 'When you create a new credit card, you must specify a customer or recipient to create it on. Creating a new credit card will not change the card owner\'s existing default credit card; you should update the customer or recipient with a new default_card for that. If the card\'s owner has no default credit card, the added credit card will become the default.  Whenever you create a new card for a customer, Stripe will automatically validate the card.',
  cacheable: false,

  inputs: {
    apiKey: {
      description: 'Valid Stripe API key.',
      example: 'somestring837483749blah',
      required: true
    },
    token: {
      description: 'Token of a card to create for the customer, as returned by the Stripe.js SDK.',
      example: 'tok_someCardIdjsd2isnsd',
      required: true
    },
    customer: {
      description: 'ID of the customer to create the card for.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
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

  fn: function (inputs, exits) {

    var stripe = require('stripe')(inputs.apiKey);

    stripe.customers.createCard(inputs.customer, {card: inputs.token}, function(err, card) {
      if (err) return exits.error(err);
      return exits.success(card);
    });

  }

};
