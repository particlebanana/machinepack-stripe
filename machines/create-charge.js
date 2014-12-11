module.exports = {

  friendlyName: 'Create charge',
  description: 'Create a new charge for a customer',
  extendedDescription: 'To charge a credit card, you create a new charge object. If your API key is in test mode, the supplied card won\'t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).  Also note that you can use one of the [test cards provided by Stripe](https://stripe.com/docs/testing#cards), each of which always fails in one predetermined ways.',
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
    card: {
      description: 'The Stripe id of a saved card to charge.',
      extendedDescription: 'If you also pass a customer ID, the card must be the ID of a card belonging to the customer. Otherwise, if you do not pass a customer ID, the card you provide must either be a Stripe token, like the ones returned by Stripe.js.',
      example: 'tok_someCardIdjsd2isnsd',
      required: true
    },
    capture: {
      description: 'Whether to capture payment immediately, or just authorize it.',
      extendedDescription: 'If the payment is not captured, you will need to capture it within 7 days in order for payment to be collected.',
      example: true,
      required: true
    },
    description: {
      description: 'An arbitrary string to attach to the charge object in Stripe.',
      extendedDescription: 'It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the description of the charge(s) that they are describing.',
      example: 'This notable charge was for several gallons of mayonnaise!'
    },
    customer: {
      description: 'The Stripe id of an existing customer to charge.',
      example: 'cus_4kmLwU2PvQBeqq'
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
        "id": "ch_14Yged2eZvKYlo2CcRXx8khJ",
        "object": "charge",
        "created": 1409761843,
        "livemode": false,
        "paid": true,
        "amount": 500,
        "currency": "usd",
        "refunded": false,
        "card": {
          "id": "card_14Yged2eZvKYlo2CacpQy0aC",
          "object": "card",
          "last4": "4242",
          "brand": "Visa",
          "funding": "credit",
          "exp_month": 1,
          "exp_year": 2050,
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
          "customer": null
        },
        "captured": true,
        "refunds": {
          "object": "list",
          "total_count": 0,
          "has_more": false,
          "url": "/v1/charges/ch_14Yged2eZvKYlo2CcRXx8khJ/refunds"
        },
        "balance_transaction": "txn_14WGN92eZvKYlo2Ccrcqvafr",
        "failure_message": null,
        "failure_code": null,
        "amount_refunded": 0,
        "customer": null,
        "invoice": null,
        "description": null,
        "dispute": null,
        "statement_description": null,
        "receipt_email": null
      }
    }
  },

  fn: function (inputs, exits) {

    // TODO: handle more specific exits (i.e. rate limit, customer does not exist, etc.)

    var stripe = require('stripe')(inputs.apiKey);

    // Get the base options
    var options = {
      amount: inputs.amount,
      currency: inputs.currency,
      card: inputs.card,
      description: inputs.description || '',
      capture: inputs.capture
    };

    // Add customer if it's sent in
    if (inputs.customer) {
      options.customer = inputs.customer;
    }

    stripe.charges.create(options, function(err, charge) {
      if (err) return exits.error(err);
      return exits.success(charge);
    });

  }

};
