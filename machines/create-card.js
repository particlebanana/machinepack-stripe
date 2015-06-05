module.exports = {

  friendlyName: 'Save new card',
  description: 'Create a new card for a customer',
  extendedDescription: 'Creating a new credit card will not change the card owner\'s existing default credit card; you should update the customer or recipient with a new default_card for that. If the card\'s owner has no default credit card, the added credit card will become the default.  Whenever you create a new card for a customer, Stripe will automatically validate the card.',
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
    token: {
      description: 'The Stripe token for the card, as returned by the Stripe.js SDK',
      whereToGet: {
        moreInfoUrl: 'https://stripe.com/docs/stripe.js'
      },
      example: 'tok_someCardIdjsd2isnsd',
      required: true
    },
    customer: {
      description: 'The Stripe id of the customer who this card belongs to',
      whereToGet: {
        description: 'Create a customer.'
      },
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
      description: 'New card was created',
      variableName: 'newCard',
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
        "name": "My Visa",
        "address_line1": "123 Fake St",
        "address_line2": "Apt 100",
        "address_city": "Austin",
        "address_state": "TX",
        "address_zip": "78701",
        "address_country": "United States",
        "cvc_check": "pass",
        "address_line1_check": "pass",
        "address_zip_check": "pass",
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
