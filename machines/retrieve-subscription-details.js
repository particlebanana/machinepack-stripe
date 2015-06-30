module.exports = {

  friendlyName: 'Retrieve Subscription Details',
  description: 'Retrieve details of a specific, active subsription for a customer.',
  extendedDescription: 'By default, you can see the 10 most recent active subscriptions stored on a customer directly on the customer object, but you can also retrieve details about a specific active subscription for a customer.',
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
    sub: {
      description: 'The subscription ID of the specific customer\'s plan you wish to retrieve details for.',
      extendedDescription: 'When you create a subscription for a customer, this will have a specific ID.',
      example: 'sub_someSubIdjsd2isnsd',
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
      variableName: 'SubscriptionDetails',
      example: {
        "id": "sub_6PefH3obLtjcCV",
        "plan": {
          "interval": "year",
          "name": "New plan name",
          "created": 1432558607,
          "amount": 2000,
          "currency": "usd",
          "id": "rhohub-gold-year",
          "object": "plan",
          "livemode": false,
          "interval_count": 1,
          "trial_period_days": null,
          "metadata": {},
          "statement_descriptor": null
        },
        "object": "subscription",
        "start": 1434104747,
        "status": "active",
        "customer": "cus_6PdfAh2dIpK9G0",
        "cancel_at_period_end": false,
        "current_period_start": 1434104747,
        "current_period_end": 1465727147,
        "ended_at": null,
        "trial_start": null,
        "trial_end": null,
        "canceled_at": null,
        "quantity": 1,
        "application_fee_percent": null,
        "discount": null,
        "tax_percent": null,
        "metadata": {}
      }
    }
  },

  fn: function (inputs, exits) {

    // TODO: handle more specific exits (i.e. rate limit, customer does not exist, etc.)

    var stripe = require('stripe')(inputs.apiKey);


    stripe.customers.retrieveSubscription(inputs.customer, inputs.sub, function(err, confirmation) {
      if (err) return exits.error(err);
      return exits.success(confirmation);
    });

  }

};
