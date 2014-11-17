module.exports = {

  identity: 'create-charge',
  friendlyName: 'Create charge',
  description: 'Create a new charge for a customer or recipient.',
  extendedDescription: 'To charge a credit card, you create a new charge object. If your API key is in test mode, the supplied card won\'t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).',
  cacheable: false,

  inputs: {
    apiKey: {
      description: 'Valid Stripe API key.',
      example: 'somestring837483749blah',
      required: true
    },
    amount: {
      description: 'A positive integer in the smallest currency unit (e.g 100 cents to charge $1.00, or 1 to charge ¥1, a 0-decimal currency) representing how much to charge the card. The minimum amount is $0.50 (or equivalent in charge currency).',
      example: 500,
      required: true
    },
    currency: {
      description: '3-letter ISO code for currency.',
      example: 'usd',
      required: true
    },
    card: {
      description: 'A card to be charged. If you also pass a customer ID, the card must be the ID of a card belonging to the customer. Otherwise, if you do not pass a customer ID, the card you provide must either be a token, like the ones returned by Stripe.js, or a dictionary containing a user\'s credit card details, with the options described below. Although not all information is required, the extra info helps prevent fraud.',
      example: 'tok_someCardIdjsd2isnsd',
      required: true
    },
    capture: {
      description: 'Whether to capture the charge immediately, or just authorize it.  Defaults to false.',
      example: true,
      required: true
    },
    description: {
      description: 'An arbitrary string which you can attach to a charge object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the description of the charge(s) that they are describing.',
      example: 'This is a charge description'
    },
    customer: {
      description: 'The ID of an existing customer that will be charged in this request.',
      example: 'cus_4kmLwU2PvQBeqq'
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
          "url": "/v1/charges/ch_14Yged2eZvKYlo2CcRXx8khJ/refunds",
          "data": [

          ]
        },
        "balance_transaction": "txn_14WGN92eZvKYlo2Ccrcqvafr",
        "failure_message": null,
        "failure_code": null,
        "amount_refunded": 0,
        "customer": null,
        "invoice": null,
        "description": null,
        "dispute": null,
        "metadata": {
        },
        "statement_description": null,
        "receipt_email": null
      }
    }
  },

  fn: function (inputs, exits) {

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
