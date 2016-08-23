module.exports = {
  friendlyName: 'API Key',
  description: 'A valid Stripe API key (aka Secret Key).',
  whereToGet: {
    url: 'https://dashboard.stripe.com/account/apikeys',
    description: 'Copy either "Test Secret Key" or "Live Secret Key" from your Stripe dashboard.',
    extendedDescription: 'Make sure you are logged in to your Stripe account, or create an account if you have not already done so.'
  },
  example: 'somestring837483749blah',
  required: true
};
