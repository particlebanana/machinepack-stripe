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

    // TODO

  },


  exits: {

    success: {
      description: 'Account updated successfully.'
    }

  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Make the API call via the Stripe module.
    stripe.accounts.update({
      // TODO: all of the other necessary props
    }, function(err) {
      if (err) { return exits.error(err); }
      return exits.success();
    });

  }

};
