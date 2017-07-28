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

    payoutStatementDescriptor: {
      description: 'The text that will appear on the account’s bank account statement for payouts.',
      extendedDescription: 'If not set, this will default to your platform’s bank descriptor set on the Dashboard. This can be unset by updating the value to null and then saving.',
      example: 'Sleigh ride (Mr. Claus)',
      required: true
    }

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

    firstName
    lastName
    emailAddress
    dobDay
    dobMonth
    dobYear
    addressLine1
    city
    state
    zip
    ssnLastFour

    // Make the API call via the Stripe module.
    stripe.accounts.create({
      /*eslint-disable camelcase */
      type: 'custom',
      email: inputs.email,
      payout_statement_descriptor: inputs.payoutStatementDescriptor,
      external_account: {
        object: 'bank_account',
        account_number: 'TODO',
        routing_number: 'TODO',
        country: 'US',
        currency: 'USD',
        account_holder_name: inputs.firstName+' '+inputs.lastName,
        account_holder_type: 'individual',
      },
      payout_schedule: {
        interval: 'manual'
      }
      /*eslint-enable camelcase */
    }, function(err, newAccountInfo) {
      if (err) { return exits.error(err); }
      return exits.success(newAccountInfo);
    });

  }

};
