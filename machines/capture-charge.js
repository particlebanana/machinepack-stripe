module.exports = {

  friendlyName: 'Capture charge',


  description: 'Capture the payment of a previously-created charge.',


  extendedDescription: 'This is the second half of the two-step payment flow, where first you created a charge with the "capture" option set to false.  Uncaptured payments expire exactly seven days after they are created. If they are not captured by that point in time, they will be marked as refunded and will no longer be capturable.',


  moreInfoUrl: 'https://stripe.com/docs/api#capture_charge',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    charge: {
      description: 'The Stripe ID of an "uncaptured" charge.',
      example: 'ch_14ziQH2eZvKYlo2Ci0BoqQvT',
      whereToGet: {
        description: 'Create a charge with the "capture" option set to false.'
      },
      required: true
    }
  },


  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Make the API call via the Stripe module.
    stripe.charges.capture(inputs.charge, function(err) {

      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) return exits.error(err);

      // Return through the `success` exit.
      return exits.success();
    });

  }

};
