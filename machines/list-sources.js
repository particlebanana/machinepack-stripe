module.exports = {


  friendlyName: 'List sources',


  description: 'List all payment sources for a customer.',


  moreInfoUrl: 'https://stripe.com/docs/api#list_source',


  sideEffects: 'cacheable',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    customer: {
      description: 'The Stripe ID of the customer whose sources will be listed.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Stripe customer payment sources',
      outputDescription: 'An array of Stripe payment sources for the specified customer.',
      outputExample: {
        'object': 'list',
        'url': '/v1/customers/cu_14YepJ2eZvKYlo2CUJrwelj2/sources',
        'has_more': false,
        'data': [require('../constants/source.object')]
      }
    }
  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Use the Stripe API to list the customer's payment sources.
    stripe.customers.listSources(inputs.customer, function(err, sources) {

      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) return exits.error(err);

      // Return the list of payment sources through the `success` exit.
      return exits.success(sources);
    });

  }

};
