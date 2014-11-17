module.exports = {

  identity: 'delete-card',
  friendlyName: 'Delete card',
  description: 'Delete a card for a customer or recipient.',
  cacheable: false,

  inputs: {
    apiKey: {
      description: 'Valid Stripe API key.',
      example: 'somestring837483749blah',
      required: true
    },
    card: {
      description: 'ID of card to delete.',
      example: 'card_14t5VD2eZvKYlo2CbhcljD3Y',
      required: true
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    error: {
      example: {
        message: 'Error'
      }
    },
    success: {
      example: {
        message: ''
      }
    }
  },

  fn: function (inputs, exits) {

    var stripe = require('stripe')(inputs.apiKey);

    stripe.customers.deleteCard(inputs.customer, inputs.card, function(err, response) {
      if (err) return exits.error(err);
      if (response.deleted === false) return exits.error(new Error('E_CARD_NOT_DELETED'));
      return exits.sucess(response);
    });

  }

};
