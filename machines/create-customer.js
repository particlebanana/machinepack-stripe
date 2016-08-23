module.exports = {


  friendlyName: 'Create customer',


  description: 'Create a new customer.',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    email: {
      description: 'An email address to associate with the customer.',
      example: 'john.doe@somebody.com'
    },

    description: {
      description: 'Arbitrary string to attach to the customer in Stripe.',
      example: 'sdjasnd928u8duasd'
    },

    source: {
      description: 'A token used to set the new customer\'s default charging source.',
      whereToGet: {
        url: 'https://stripe.com/docs/stripe.js',
        description: 'Use stripe.js to create a source token.'
      },
      example: 'tok_18epPlAE8iIXJx4mLWRYLRj6'
    },

    plan: {
      description: 'The identifier of a plan to subscribe the customer to.',
      example: 'pro'
    },

    metadata: {
      description: 'Arbitrary metadata to attach to the new customer.',
      example: {}
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'New Stripe customer',
      outputDescription: 'Details of the newly-created Stripe customer, including payment sources and subscriptions.',
      outputExample: require('../constants/customer.object')
    }
  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Declare a var to hold options for the API call.
    var options = {};

    // Add the `email` option if provided.
    if (inputs.email) {
      options.email = inputs.email;
    }

    // Add the `description` option if provided.
    if (inputs.description) {
      options.description = inputs.description;
    }

    // Add the `plan` option if provided.
    if (inputs.plan) {
      options.plan = inputs.plan;
    }

    // Add the `source` option if provided.
    if (inputs.source) {
      options.source = inputs.source;
    }

    // Add the `metadata` option if provided.
    if (inputs.metadata) {
      options.metadata = inputs.metadata;
    }

    // Use the Stripe API to create the new customer.
    stripe.customers.create(options, function(err, customer) {

      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) return exits.error(err);

      // Send the new customer object through the `success` exit.
      return exits.success(customer);

    });

  }

};
