module.exports = {


  friendlyName: 'Create Stripe account',


  description: 'Create a new Stripe Connect account for a customer.',


  extendedDescription: 'This method creates a Custom Account.',


  moreInfoUrl: 'https://stripe.com/docs/api#create_account',


  inputs: {

    apiKey: require('../constants/apiKey.input'),

    email: {
      description: 'The email address of the account holder.',
      extendedDescription: 'For Custom accounts, this is only to make the account easier to identify to you: Stripe will never directly reach out to your users.',
      example: 'bob@example.com',
      required: true
    },

    // TODO

  },


  exits: {

    success: {
      outputFriendlyName: 'Account info',
      outputDescription: 'Details for the new Stripe account that was created.',
      outputExample: {}
    }

  },

  fn: function (inputs, exits) {

    // Import `stripe`, and initialize it with the given API key.
    var stripe = require('stripe')(inputs.apiKey);

    // Make the API call via the Stripe module.
    stripe.accounts.create({
      type: 'custom',
      country: 'US',
      email: inputs.email,
      // TODO: all of the other necessary props
      payout_schedule: {// eslint-disable-line camelcase
        interval: 'manual'
      }
    }, function(err, newAccountInfo) {
      if (err) { return exits.error(err); }
      return exits.success(newAccountInfo);
    });

  }

};
