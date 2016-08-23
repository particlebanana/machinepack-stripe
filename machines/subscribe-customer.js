module.exports = {


  friendlyName: 'Subscribe Customer',


  description: 'Subscribe a customer to a pre-existing plan.',


  extendedDescription: 'To subscribe a customer, you must first create a customer object with a saved card and a subscription plan (You can do this in your Stripe control panel). If your API key is in test mode, the supplied card won\'t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).  Also note that you can use one of the [test cards provided by Stripe](https://stripe.com/docs/testing#cards), each of which always fails in one predetermined ways.',


  sideEffects: 'idempotent',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    customer: {
      description: 'The ID of an existing customer to subscribe to the plan.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    },

    plan: {
      description: 'The ID of a plan to subscribe the customer to.',
      extendedDescription: 'You can find this in your stripe control panel after creating a subscription.',
      example: 'premium',
      required: true
    },

    source: {
      description: 'The ID of a saved payment source to charge.',
      extendedDescription: 'The ID of a payment source token.  If provided, this will become the customer\'s new default payment source.  If not provided, the customer must already have a payment source added, or else the subscription creation will fail.',
      example: 'tok_someCardIdjsd2isnsd',
    },

    quantity: {
      description: 'If using a plan with multiple users or other dynamic elements, specify the quantity.',
      example: 20,
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

    metadata: {
      description: 'Metadata to attach to the subscription.',
      example: {}
    }

  },

  exits: {

    success: {
      outputFriendlyName: 'New Stripe subscription',
      outputDescription: 'Details of the Stripe subscription that has been added to the customer.',
      outputExample: require('../constants/subscription.object')
    }
  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Set the base options for the API request.
    var options = {
      customer: inputs.customer,
      plan: inputs.plan
    };

    // Add in source if provided.
    if (inputs.source) {
      options.source = inputs.source;
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

    // Use the Stripe API to create the new subscription.
    stripe.subscriptions.create(options, function(err, subscription) {
      if (err) return exits.error(err);
      return exits.success(subscription);
    });

  }

};
