module.exports = {


  friendlyName: 'Create Stripe account',


  description: 'Create a new Stripe Connect account for a customer.',


  moreInfoUrl: 'https://stripe.com/docs/api#create_account',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    props: {
      description: 'Values to set for the new account.',
      moreInfoUrl: 'https://stripe.com/docs/api#update_account',
      example: {},
      required: true
    },

  },


  exits: {

    success: {
      outputFriendlyName: 'Account info',
      outputDescription: 'Expanded details for the new Stripe account that was created.',
      outputExample: {}
    }

  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    // (Or fall back to the cached API key, if available)
    var stripe = require('stripe')(inputs.apiKey||require('./private/cache').apiKey);

    // Make the API call via the Stripe module.
    stripe.accounts.create(inputs.props, function(err, newAccountInfo) {
      if (err) { return exits.error(err); }
      return exits.success(newAccountInfo);
    });

  }

};
