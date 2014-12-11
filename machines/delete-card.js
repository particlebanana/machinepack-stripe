module.exports = {

  friendlyName: 'Delete card',

  description: 'Delete a card in Stripe for a customer',

  moreInfoUrl: 'https://stripe.com/docs/api#delete_card',

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

    card: {
      description: 'The Stripe id of the card to delete',
      example: 'card_14t5VD2eZvKYlo2CbhcljD3Y',
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
      description: 'Card deleted successfully',
      void: true
    }
  },

  fn: function (inputs, exits) {

    // TODO: handle more specific exits (i.e. rate limit, card does not exist, etc.)

    var stripe = require('stripe')(inputs.apiKey);

    stripe.customers.deleteCard(inputs.customer, inputs.card, function(err, response) {
      if (err) return exits.error(err);
      if (response.deleted === false) return exits.error(new Error('E_CARD_NOT_DELETED'));
      return exits.success(response);
    });

  }

};
