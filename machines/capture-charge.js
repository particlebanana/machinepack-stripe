module.exports = {

  friendlyName: 'Capture a charge',
  description: 'Capture the payment of a previously-created charge in Stripe.',
  extendedDescription: 'This is the second half of the two-step payment flow, where first you created a charge with the "capture" option set to false.  Uncaptured payments expire exactly seven days after they are created. If they are not captured by that point in time, they will be marked as refunded and will no longer be capturable.',
  moreInfoUrl: 'https://stripe.com/docs/api#capture_charge',
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
    charge: {
      description: 'The Stripe id of an "uncaptured" charge',
      example: 'ch_14ziQH2eZvKYlo2Ci0BoqQvT',
      whereToGet: {
        description: 'Create a charge with the "capture" option set to false.'
      },
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
      description: 'Payment captured successfully',
      void: true
    }
  },

  fn: function (inputs, exits) {

    // TODO: handle more specific exits (i.e. rate limit, invalid API key, etc.)

    var stripe = require('stripe')(inputs.apiKey);

    stripe.charges.capture(inputs.charge, function(err, charge) {
      if (err) return exits.error(err);
      return exits.success(charge);
    });

  }

};
