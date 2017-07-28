module.exports = {


  friendlyName: 'Set global credentials',


  description: 'Save the specified developer credentials in a process-wide global variable for future, automatic (and easier) use of other methods.',


  extendedDescription:
  'If you only need to interact with one developer account (one API key), '+
  'we recommend using this method to simplify your userland code.  It allows you to avoid the headache '+
  'of making sure the configured API key is always consistently applied.  '+
  '(One notable (yet rare) exception is if you need to manually manage multiple sets of dev credentials.  '+
  'In that case, just pass in the API key directly when you call each method.)',


  sync: true,


  inputs: {

    apiKey: {
      friendlyName: 'API Key',
      description: 'A valid Stripe API key (aka Secret Key).',
      extendedDescription: 'This can be omitted if you\'ve used .setGlobalCredentials().',
      whereToGet: {
        url: 'https://dashboard.stripe.com/account/apikeys',
        description: 'Copy either "Test Secret Key" or "Live Secret Key" from your Stripe dashboard.',
        extendedDescription: 'Make sure you are logged in to your Stripe account, or create an account if you have not already done so.'
      },
      example: 'somestring837483749blah',
      protect: true,
      required: true
    }

  },


  exits: {

    success: {
      description: 'Credentials have been cached for future use in other method calls.'
    },

  },


  fn: function(inputs, exits) {

    var cache = require('./private/cache');

    cache.apiKey = inputs.apiKey;

    return exits.success();

  }

};
