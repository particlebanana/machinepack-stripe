module.exports = {


  friendlyName: 'Update Stripe account',


  description: 'Patch a customer\'s managed Stripe Connect account using the provided data.',


  moreInfoUrl: 'https://stripe.com/docs/api#update_account',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    account: {
      description: 'The identifier for the Stripe Connect account that you want to update.',
      example: 'acct_1032D82eZvKYlo2C',
      required: true
    },

    props: {
      description: 'Values to set for the account.',
      moreInfoUrl: 'https://stripe.com/docs/api#update_account',
      example: {},
      required: true
    },

  },


  exits: {

    success: {
      description: 'Account updated successfully.'
    }

  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    // (Or fall back to the cached API key, if available)
    var stripe = require('stripe')(inputs.apiKey||require('./private/cache').apiKey);

    // Make the API call via the Stripe module.
    stripe.accounts.update(inputs.account, inputs.props, function(err) {
      if (err) { return exits.error(err); }
      return exits.success();
    });

  }

};
