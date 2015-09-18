module.exports = {

  friendlyName: 'Retrieve Customer Details',
  description: 'Retrieve details of a specific customer.',
  extendedDescription: 'Retrieves the details of an existing customer. You need only supply the unique customer identifier that was returned upon customer creation.',
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
    customer: {
      description: 'The identifier of the customer to be retrieved.',
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
     "object": "customer",
     "created": 1442577004,
     "id": "cus_70O9szaefdsh0TZ",
     "livemode": false,
     "description": null,
     "email": null,
     "shipping": null,
     "delinquent": false,
     "metadata": {},
     "subscriptions": {
        "object": "list",
        "total_count": 0,
        "has_more": false,
        "url": "/v1/customers/cus_70O9szY57bh0TZ/subscriptions",
        "data": []
     },
     "discount": null,
     "account_balance": 0,
     "currency": null,
     "sources": {
        "object": "list",
        "total_count": 1,
        "has_more": false,
        "url": "/v1/customers/cus_70O9szY57bh0TZ/sources",
        "data": [
           {
              "id": "card_16mNNPH3RtMvL54SaaS9EaZX",
              "object": "card",
              "last4": "4242",
              "brand": "Visa",
              "funding": "credit",
              "exp_month": 10,
              "exp_year": 2020,
              "fingerprint": "PkKUd4Jwwe2OYDY5",
              "country": "US",
              "name": null,
              "address_line1": null,
              "address_line2": null,
              "address_city": null,
              "address_state": null,
              "address_zip": null,
              "address_country": null,
              "cvc_check": "pass",
              "address_line1_check": null,
              "address_zip_check": null,
              "tokenization_method": null,
              "dynamic_last4": null,
              "metadata": {},
              "customer": "cus_70O9szY57bh0TZ"
           }
        ]
     },
     "default_source": "card_16mNNPH3RtMvL54SaaS9EaZX"
    }
  },

  fn: function (inputs, exits) {

    var stripe = require('stripe')(inputs.apiKey);

    stripe.customers.retrieve(inputs.customer, function(err, customerDetails) {
      if (err) return exits.error(err);
      return exits.success(customerDetails);
    });

  }

};
