module.exports = {


  friendlyName: 'Delete source',


  description: 'Delete a payment source from a customer.',


  moreInfoUrl: 'https://stripe.com/docs/api#delete_card',


  sideEffects: 'idempotent',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    source: {
      description: 'The Stripe ID of the source to delete.',
      example: 'card_14t5VD2eZvKYlo2CbhcljD3Y',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Deleted Stripe payment source',
      outputDescription: 'Details of the just-deleted Stripe payment source.',
      outputExample: require('../constants/source.schema')
    }
  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Use the Stripe API to delete the source.
    stripe.customers.deleteCard(inputs.customer, inputs.card, function(err, source) {
      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) {return exits.error(err);}

      // Return info about the deleted source through the `success` exit.
      return exits.success(source);
    });

  }

};
