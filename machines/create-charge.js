module.exports = {


  friendlyName: 'Create charge',


  description: 'Create a new charge for a customer.',


  extendedDescription: 'To charge a source (e.g. a credit card), you create a new charge object. If your API key is in test mode, the supplied source won\'t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).  Also note that you can use one of the [test cards provided by Stripe](https://stripe.com/docs/testing#cards), each of which always fails in one predetermined ways.',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    amount: {
      description: 'The amount to charge, in the smallest currency unit (e.g. 500 to charge $5.00).',
      extendedDescription: 'A positive integer in the smallest currency unit (e.g 100 cents to charge $1.00, or 1 to charge ¥1, a 0-decimal currency) representing how much to charge the source. The minimum amount is $0.50 (or equivalent in charge currency).',
      example: 500,
      required: true
    },

    currency: {
      description: '3-letter ISO code for currency.',
      example: 'usd',
      required: true
    },

    source: {
      description: 'The Stripe id of a saved source to charge.',
      extendedDescription: 'If you also pass a customer ID, the card must be the ID of a card belonging to the customer. Otherwise, if you do not pass a customer ID, the card you provide must be a Stripe token, like the ones returned by Stripe.js.',
      example: 'tok_someCardIdjsd2isnsd',
      required: true
    },

    customer: {
      description: 'The Stripe id of an existing customer to charge.',
      example: 'cus_4kmLwU2PvQBeqq'
    },

    capture: {
      friendlyName: 'Capture?',
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

    metadata: {
      description: 'Arbitrary metadata to attach to the new customer.',
      example: {}
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'New Stripe charge',
      outputDescription: 'Details of the new Stripe charge that was created.',
      outputExample: {
        'id': 'ch_18k5K7AE8iIXJx4mUZo8Pqgf',
        'object': 'charge',
        'amount': 100,
        'amount_refunded': 0,
        'application_fee': 0,
        'balance_transaction': 'txn_18k5K7AE8iIXJx4mrCfIcn0X',
        'captured': true,
        'created': 1471583623,
        'currency': 'usd',
        'customer': 'cus_92418YMzH9wiaI',
        'description': 'My First Test Charge (created for API docs)',
        'failure_code': '',
        'failure_message': '',
        'livemode': false,
        'metadata': {},
        'paid': true,
        'receipt_email': '',
        'receipt_number': '',
        'shipping': '',
        'source': {
          'id': 'card_18epPlAE8iIXJx4mjtBTiliY',
          'object': 'card',
          'address_city': '',
          'address_country': '',
          'address_line1': '',
          'address_line1_check': '',
          'address_line2': '',
          'address_state': '',
          'address_zip': '',
          'address_zip_check': '',
          'brand': 'Visa',
          'country': 'US',
          'customer': 'cus_92418YMzH9wiaI',
          'cvc_check': '',
          'dynamic_last4': '',
          'exp_month': 8,
          'exp_year': 2017,
          'funding': 'credit',
          'last4': '4242',
          'metadata': {},
          'name': '',
          'tokenization_method': ''
        },
        'source_transfer': '',
        'statement_descriptor': '',
        'status': 'succeeded'
      }
    }
  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Set the base options for the API call.
    var options = {
      amount: inputs.amount,
      currency: inputs.currency,
      card: inputs.card,
      description: inputs.description || '',
      capture: inputs.capture
    };

    // Add customer if it's sent in.
    if (inputs.customer) {
      options.customer = inputs.customer;
    }

    // Make the API call via the Stripe module.
    stripe.charges.create(options, function(err, chargeId) {

      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) return exits.error(err);

      // Send the new charge ID through the `success` exit.
      return exits.success(chargeId);

    });

  }

};
