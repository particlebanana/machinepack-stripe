module.exports = {

  friendlyName: 'Subscibe Customer',
  description: 'Subscribe a customer to a pre-existing plan.',
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
      required: true
    },
    card: {
      description: 'The Stripe id of a saved card to charge.',
      extendedDescription: 'If you also pass a customer ID, the card must be the ID of a card belonging to the customer. Otherwise, if you do not pass a customer ID, the card you provide must either be a Stripe token, like the ones returned by Stripe.js.',
      example: 'tok_someCardIdjsd2isnsd',
      required: true
    },
    customer: {
      description: 'The Stripe id of an existing customer to subscribe to the plan.',
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
      variableName: 'newSubscription',
      example:    { id: 'sub_6EOW9GHkrQ53Z2',
  plan: 
   { interval: 'month',
     name: 'Gold Plan',
     created: 1431566401,
     amount: 2000,
     currency: 'gbp',
     id: 'gold',
     object: 'plan',
     livemode: false,
     interval_count: 1,
     trial_period_days: null,
     metadata: {},
     statement_descriptor: null },
  object: 'subscription',
  start: 1431505346,
  status: 'active',
  customer: 'cus_654EF6eI4JFErdS',
  cancel_at_period_end: false,
  current_period_start: 1431507646,
  current_period_end: 1434186046,
  ended_at: null,
  trial_start: null,
  trial_end: null,
  canceled_at: null,
  quantity: 2,
  application_fee_percent: null,
  discount: null,
  tax_percent: null,
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
      card: inputs.card
    };


    stripe.customers.createSubscription(inputs.customer, options, function(err, charge) {
      if (err) return exits.error(err);
      return exits.success(charge);
    });

  }

};
