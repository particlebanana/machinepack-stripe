module.exports = {


  friendlyName: 'Add source to customer',


  description: 'Add a new payment source (e.g. credit card or bank account) to a customer.',


  extendedDescription: 'Creating a new source will not change the customer\'s existing default source; you should update the customer or recipient with a new "Default source" for that. If the customer has no default source, the added source will become the default.  Whenever you create a new card source for a customer, Stripe will automatically validate the card.',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    token: {
      description: 'The Stripe token for the source, as returned by the Stripe.js SDK.',
      whereToGet: {
        url: 'https://stripe.com/docs/stripe.js'
      },
      example: 'tok_somesourceIdjsd2isnsd',
      required: true
    },

    customer: {
      description: 'The Stripe ID of the customer who this source belongs to.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    }
  },

  exits: {

    success: {
      outputFriendlyName: 'New Stripe payment source',
      outputDescription: 'Details of the newly-created Stripe payment source.',
      outputExample: require('../constants/source.object')
    }
  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Use the Stripe API to create the new source.
    stripe.customers.createSource(inputs.customer, {source: inputs.token}, function(err, source) {
      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) return exits.error(err);

      // Send the new source object through the `success` exit.
      return exits.success(source);
    });

  }

};
