module.exports = {


  friendlyName: 'Retrieve Customer Details',


  description: 'Retrieve details of a specific customer.',


  extendedDescription: 'Retrieves the details of an existing customer. You need only supply the unique customer identifier that was returned upon customer creation.',


  sideEffects: 'cacheable',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    customer: {
      description: 'The identifier of the customer to be retrieved.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Stripe customer details',
      outputDescription: 'The details of a Stripe customer, including payment sources and subscriptions.',
      outputExample: require('../constants/customer.schema')
    },

    notFound: {
      description: 'No Stripe customer could be found with the specified ID.'
    }
  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    // (Or fall back to the cached API key, if available)
    var stripe = require('stripe')(inputs.apiKey||require('./private/cache').apiKey);

    // Use the Stripe API to retrieve the customer's details.
    stripe.customers.retrieve(inputs.customer, function(err, customerDetails) {

      // If there's a 404 error, return through the `notFound` exit.
      if (err && err.statusCode === 404) {return exits.notFound();}

      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) {return exits.error(err);}

      // Return the customer details through the `success` exit.
      return exits.success(customerDetails);
    });

  }

};
