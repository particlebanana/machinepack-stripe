module.exports = {

  identity: 'capture-charge',
  friendlyName: 'Capture charge',
  description: 'Capture a charge on the Stripe API.',
  cacheable: false,

  inputs: {
    apiKey: {
      example: 'somestring837483749blah',
      required: true
    },
    charge: {
      example: 'sdjasnd928u8duasd',
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
