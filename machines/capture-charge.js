module.exports = {

  identity: 'capture-charge',
  friendlyName: 'Capture charge',
  description: 'Capture a charge on the Stripe API.',
  cacheable: false,

  inputs: {
    apiKey: {
      description: 'Valid Stripe API key.',
      example: 'somestring837483749blah',
      required: true
    },
    charge: {
      description: 'ID of a charge to capture',
      example: 'ch_14ziQH2eZvKYlo2Ci0BoqQvT',
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
        message: ''
      }
    }
  },

  fn: function (inputs, exits) {

    var stripe = require('stripe')(inputs.apiKey);

    stripe.charges.capture(inputs.charge, function(err, charge) {
      if (err) return exits.error(err);
      return exits.success(charge);
    });

  }

};
