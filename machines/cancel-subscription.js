module.exports = {

  friendlyName: 'Cancel Subscription',
  description: 'Cancel an existing subscription attached to a customer.',
  extendedDescription: 'To subscribe a customer, you must first create a customer object with a saved card and a subscription plan (You can do this in your Stripe control panel). If your API key is in test mode, the supplied card won\'t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).  Also note that you can use one of the [test cards provided by Stripe](https://stripe.com/docs/testing#cards), each of which always fails in one predetermined ways. Once this subscription is attached, you may use this machine to cancel the subscription at any time.',
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
      description: 'The subscription ID of the specific customers plan you wish to cancel.',
      extendedDescription: 'When you create a subscription for a customer, this will have a specific ID. You must still provide the customer ID to successfully cancel the subscription.',
      example: 'sub_someSubIdjsd2isnsd',
      required: true
    },
    instant: {
      description: '(true/false) Should the subscription be cancelled instantly, or at the end of the subscription period?',
      extendedDescription: 'True/false - More information: https://stripe.com/docs/api#cancel_subscription',
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
      variableName: 'cancelledSubscription',
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
          "metadata": {
          },
          "statement_descriptor": null
        },
        "object": "subscription",
        "start": 1434104747,
        "status": "canceled",
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
        "metadata": {
        }
      }
  },

  fn: function (inputs, exits) {

    // TODO: handle more specific exits (i.e. rate limit, customer does not exist, etc.)

    var stripe = require('stripe')(inputs.apiKey);

    // Get the base options
    var options = {
      at_period_end: inputs.instant
    };


    stripe.customers.cancelSubscription(inputs.customer, inputs.sub, options, function(err, confirmation) {
      if (err) return exits.error(err);
      return exits.success(confirmation);
    });

  }

};
