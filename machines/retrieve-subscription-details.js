module.exports = {


  friendlyName: 'Retrieve Subscription Details',


  description: 'Retrieve details of a specific, active subscription for a customer.',


  extendedDescription: 'By default, you can see the 10 most recent active subscriptions stored on a customer directly on the customer object, but you can also retrieve details about a specific active subscription for a customer.',


  sideEffects: 'cacheable',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    subscription: {
      description: 'The subscription ID of the subscription you wish to retrieve details for.',
      extendedDescription: 'When you create a subscription for a customer, this will have a specific ID.',
      example: 'sub_someSubIdjsd2isnsd',
      required: true
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Stripe subscription details',
      outputDescription: 'The details of the specified Stripe subscription.',
      outputExample: require('../constants/subscription.object')
    },

    notFound: {
      description: 'No Stripe subscription could be found with the specified ID.'
    }

  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Use the Stripe API to retrieve the subscription's details.
    stripe.subscriptions.retrieve(inputs.subscription, function(err, subscription) {
      // If there's a 404 error, return through the `notFound` exit.
      if (err && err.statusCode === 404) {return exits.notFound();}

      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) return exits.error(err);

      // Return the subscription details through the `success` exit.
      return exits.success(subscription);
    });

  }

};
