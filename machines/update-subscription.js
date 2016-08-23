module.exports = {


  friendlyName: 'Update Subscription',


  description: 'Update a customer\'s subscription to change plan or quantity.',


  extendedDescription: 'To subscribe a customer, you must first create a customer object with a saved card and a subscription plan (You can do this in your Stripe control panel). If your API key is in test mode, the supplied card won\'t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).  Also note that you can use one of the [test cards provided by Stripe](https://stripe.com/docs/testing#cards), each of which always fails in one predetermined ways. Until this has been done, you cannot update a subscription (In other words, don\'t use this machine to create a subscription)',


  sideEffects: 'idempotent',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    subscription: {
      description: 'The subscription ID of the specific customer\'s plan.',
      extendedDescription: 'If you also pass a customer ID, the card must be the ID of a card belonging to the customer. Otherwise, if you do not pass a customer ID, the card you provide must either be a Stripe token, like the ones returned by Stripe.js.',
      example: 'sub_someSubIdjsd2isnsd',
      required: true
    },

    plan: {
      description: 'The plan ID to subscribe the customer to.',
      extendedDescription: 'You can find this in your stripe control panel after creating a subscription.',
      example: 'premium',
    },

    quantity: {
      description: 'If using a plan with multiple users or other dynamic elements, specify the quantity.',
      example: 20
    },

    coupon: {
      description: 'The code of a coupon to apply to this subscription.',
      extendedDescription: 'A coupon applied to a subscription will only affect invoices created for that particular subscription.',
      example: 'HALFOFF'
    },

    trialEnd: {
      friendlyName: 'Trial end date',
      description: 'Timestamp representing the end of the trial period the customer will get before being charged for the first time.',
      extendedDescription: 'If set, trial_end will override the default trial period of the plan the customer is being subscribed to.',
      example: 1471583633
    },

    prorate: {
      friendlyName: 'Prorate?',
      description: 'Whether the subscription should be prorated with respect to changes in plan, quantity or trial length.  Defaults to `true`.',
      extendedDescription: 'A pro-rata example situation can be seen here: https://stripe.com/docs/subscriptions#changing-a-customers-subscriptions',
      example: true,
      defaultsTo: true
    },

    prorationDate: {
      description: 'If set, the proration will be calculated as though the subscription was updated at the given time.',
      extendedDescription: 'This can be used to apply exactly the same proration that was previewed with upcoming invoice endpoint. It can also be used to implement custom proration logic, such as prorating by day instead of by second, by providing the time that you wish to use for proration calculations.',
      example: 1471583633
    },

  },

  exits: {

    success: {
      outputFriendlyName: 'Updated Stripe subscription',
      outputDescription: 'The details of the newly-updated Stripe subscription.',
      outputExample: require('../constants/subscription.object')
    }

  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the give API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Declare a var to hold options.
    var options = {
      prorate: inputs.prorate
    };

    // Add in plan if provided.
    if (inputs.plan) {
      options.plan = inputs.plan;
    }

    // Add in quantity if provided.
    if (inputs.quantity) {
      options.quantity = inputs.quantity;
    }

    // Add in coupon if provided.
    if (inputs.coupon) {
      options.coupon = inputs.coupon;
    }

    // Add in metadata if provided.
    if (inputs.metadata) {
      options.metadata = inputs.metadata;
    }

    // Add in trial end date if provided.
    if (inputs.trialEnd) {
      options.trial_end = inputs.trialEnd;
    }

    // Add in proration date if provided.
    if (inputs.prorationDate) {
      options.proration_date = inputs.prorationDate;
    }

    // Use the Stripe API to update the subscription's details.
    stripe.subscriptions.update(inputs.subscription, options, function(err, updatedSubscription) {
      // Send any errors through the `error` exit.
      // TODO: handle more specific exits (i.e. rate limit, customer does not
      // exist, etc.), possibly via a separate `negotiateError` machine.
      if (err) return exits.error(err);

      // Return the updated subscription details through the `success` exit.
      return exits.success(updatedSubscription);
    });

  }

};
