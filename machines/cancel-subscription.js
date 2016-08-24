module.exports = {


  friendlyName: 'Cancel Subscription',


  description: 'Cancel an existing subscription attached to a customer.',


  sideEffects: 'idempotent',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    subscription: {
      friendlyName: 'Subscription ID',
      description: 'The subscription ID of the specific customers plan you wish to cancel.',
      example: 'sub_someSubIdjsd2isnsd',
      required: true
    },

    instant: {
      friendlyName: 'Cancel immediately?',
      description: 'Whether the subscription be cancelled instantly, or at the end of the subscription period.  Defaults to `true`.',
      example: true,
      defaultsTo: true
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'Cancelled Stripe subscription',
      outputDescription: 'Details of the Stripe subscription that was cancelled.',
      outputExample: require('../constants/subscription.schema')
    }
  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Declare a var to hold the `instant` option.
    var options = {
      at_period_end: !inputs.instant
    };

    // Make the API call via the Stripe module.
    stripe.subscriptions.del(inputs.subscription, options, function(err, cancelledSubscription) {

      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) return exits.error(err);

      // Send information about the cancelled subscription through the `success` exit.
      return exits.success(cancelledSubscription);

    });

  }

};
