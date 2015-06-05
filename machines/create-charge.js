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
        "id": "ch_16AL6A2eZvKYlo2CLDZnoiSU",
        "object": "charge",
        "created": 1433511782,
        "livemode": false,
        "paid": true,
        "status": "succeeded",
        "amount": 99,
        "currency": "usd",
        "refunded": false,
        "source": {
          "id": "card_14Rjcz2eZvKYlo2C4xiaguSo",
          "object": "card",
          "last4": "4242",
          "brand": "Visa",
          "funding": "credit",
          "exp_month": 8,
          "exp_year": 2015,
          "country": "US",
          "name": "My Visa",
          "address_line1": "123 Fake St",
          "address_line2": "Apt 100",
          "address_city": "Austin",
          "address_state": "TX",
          "address_zip": 78701,
          "address_country": "United States",
          "cvc_check": "pass",
          "address_line1_check": "pasS",
          "address_zip_check": "pass",
          "dynamic_last4": 1234,
          "metadata": {
          },
          "customer": "cus_4avTrwptEHCD5w"
        },
        "captured": true,
        "balance_transaction": "txn_1680Ie2eZvKYlo2CZ2PMxNpk",
        "amount_refunded": 0,
        "customer": "cus_4avTrwptEHCD5w",
        "invoice": "in_16AJzV2eZvKYlo2CQWIMEIo3",
        "description": "abc",
        "dispute": "abc",
        "metadata": {
        },
        "statement_descriptor": "Run Club",
        "fraud_details": {
        },
        "receipt_email": "foo@foo.com",
        "receipt_number": "abc123",
        "shipping": "shipping",
        "destination": "dest",
        "application_fee": 0,
        "refunds": {
          "object": "list",
          "total_count": 0,
          "has_more": false,
          "url": "/v1/charges/ch_16AL6A2eZvKYlo2CLDZnoiSU/refunds",
          "data": [

          ]
        }
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
