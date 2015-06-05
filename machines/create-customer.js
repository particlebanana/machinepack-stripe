module.exports = {

  friendlyName: 'Create customer',
  description: 'Create a new customer in Stripe',
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

    description: {
      description: 'Arbitrary string to attach to the customer in Stripe',
      example: 'sdjasnd928u8duasd'
    }

  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error',
      variableName: 'err'
    },

    success: {

      description: 'New customer created',
      variableName: 'newCustomer',
      example: {
        id: "cus_4kmLwU2PvQBeqq",
        object: "customer",
        created: 1410377376,
        livemode: false,
        description: "Customer for weatherforensics@wdtinc.com",
        email: "foo@foo.com",
        delinquent: false,
        metadata: {
        },
        subscriptions: {
          object: "list",
          total_count: 0,
          has_more: false,
          url: "/v1/customers/cus_4kmLwU2PvQBeqq/subscriptions"
        },
        discount: 0,
        account_balance: 0,
        currency: "usd",
        cards: {
          object: "list",
          total_count: 1,
          has_more: false,
          url: "/v1/customers/cus_4kmLwU2PvQBeqq/cards",
          data: [{
            id: "card_14bGkv2eZvKYlo2Co1ndeHIy",
            object: "card",
            last4: "4242",
            brand: "Visa",
            funding: "credit",
            exp_month: 9,
            exp_year: 2014,
            fingerprint: "Xt5EWLLDS7FJjR1c",
            country: "US",
            name: "test",
            address_line1: "2324 SW 137th Street",
            address_line2: "",
            address_city: "73170",
            address_state: "OK",
            address_zip: "73170",
            address_country: "US",
            cvc_check: "pass",
            address_line1_check: "pass",
            address_zip_check: "pass",
            customer: "cus_4kmLwU2PvQBeqq"
          }]
        },
        default_card: "card_14bGkv2eZvKYlo2Co1ndeHIy"
      }
    }
  },

  fn: function (inputs, exits) {

    // TODO: handle more specific exits (i.e. rate limit, invalid API key, etc.)

    var stripe = require('stripe')(inputs.apiKey);

    // Get the base options
    var options = {
      description: inputs.description
    };

    stripe.customers.create(options, function(err, customer) {
      if (err) return exits.error(err);
      return exits.success(customer);
    });

  }

};
