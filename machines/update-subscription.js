module.exports = {

  friendlyName: 'Update Subscription',
  description: 'Update a customers subscription to change plan or quantity.',
  extendedDescription: 'To subscribe a customer, you must first create a customer object with a saved card and a subscription plan (You can do this in your Stripe control panel). If your API key is in test mode, the supplied card won\'t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).  Also note that you can use one of the [test cards provided by Stripe](https://stripe.com/docs/testing#cards), each of which always fails in one predetermined ways.',
  cacheable: false,

  inputs: {
    apiKey: {
      description: 'Your Stripe API key',
      whereToGet: {
        url: 'https://dashboard.stripe.com/account/apikeys',
        description: 'Copy either "Test Secret Key" or "Live Secret Key" from your Stripe dashboard.',
        extendedDescription: 'Make sure you are logged in to your Stripe account, or create an account if you have not already done so.'
      },
      example: 'somestring837483749blah',
      required: true
    },
    plan: {
      description: 'The plan id to subscribe the customer to.',
      extendedDescription: 'You can find this in your stripe control panel after creating a subscription.',
      example: 'premium',
      required: true
    },
    quantity: {
      description: 'If using a plan with multiple users or other dynamic elements, specify the quantity.',
      example: 20,
      required: false
    },
    sub: {
      description: 'The subscription ID of the specific customer plan.',
      extendedDescription: 'If you also pass a customer ID, the card must be the ID of a card belonging to the customer. Otherwise, if you do not pass a customer ID, the card you provide must either be a Stripe token, like the ones returned by Stripe.js.',
      example: 'sub_someSubIdjsd2isnsd',
      required: true
    },
    prorate: {
      description: 'Should the subscription be prorated during the switch? true/false',
      extendedDescription: 'A pro-rata example situation can be seen here: https://stripe.com/docs/subscriptions#changing-a-customers-subscriptions',
      example: 'true',
      required: true
    },
    customer: {
      description: 'The Stripe id of an existing customer whom is subscribed to the plan.',
      example: 'cus_4kmLwU2PvQBeqq',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error',
      variableName: 'err'
    },
    success: {
      variableName: 'updatedSubscription',
      example: {
        id: 'sub_6EOW9IIKIM3Z2',
        plan: {
          interval: 'month',
          name: 'Gold Plan',
          created: 1431126401,
          amount: 2000,
          currency: 'gbp',
          id: 'gold',
          object: 'plan',
          livemode: false,
          interval_count: 1,
          trial_period_days: 0,
          metadata: {},
          statement_descriptor: 0
        },
        object: 'subscription',
        start: 1431503203,
        status: 'active',
        customer: 'cus_6E4F9eI4JFErtsE',
        cancel_at_period_end: false,
        current_period_start: 1431507646,
        current_period_end: 1434186046,
        ended_at: 0,
        trial_start: 0,
        trial_end: 0,
        canceled_at: 0,
        quantity: 48,
        application_fee_percent: 0,
        discount: 0,
        tax_percent: 0,
        metadata: {}
      }
    }
  },

  fn: function (inputs, exits) {

    // TODO: handle more specific exits (i.e. rate limit, customer does not exist, etc.)

    var stripe = require('stripe')(inputs.apiKey);

    // Get the base options
    var options = {
      plan: inputs.plan,
      quantity: inputs.quantity,
      prorate: inputs.prorate
    };


    stripe.customers.updateSubscription(inputs.customer, inputs.sub, options, function(err, charge) {
      if (err) return exits.error(err);
      return exits.success(charge);
    });

  }

};
