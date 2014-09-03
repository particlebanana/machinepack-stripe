/**
 * Module dependencies
 */

// ...



module.exports = {
  id: 'create-charge',
  machinepack: 'stripe',
  description: 'Create a new charge for a customer or recipient.',
  notes: 'To charge a credit card, you create a new charge object. If your API key is in test mode, the supplied card won\'t actually be charged, though everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).',
  moreInfoURL: 'https://stripe.com/docs/api#create_charge',
  noSideEffects: true,
  inputs: {
    amount: {
      description: 'A positive integer in the smallest currency unit (e.g 100 cents to charge $1.00, or 1 to charge ¥1, a 0-decimal currency) representing how much to charge the card. The minimum amount is $0.50 (or equivalent in charge currency).',
      example: 500,
      required: true
    },
    currency: {
      description: '3-letter ISO code for currency.',
      example: 'usd',
      required: true
    },
    customer: {
      description: 'The ID of an existing customer that will be charged in this request.'
    },
    card: {
      description: 'A card to be charged. If you also pass a customer ID, the card must be the ID of a card belonging to the customer. Otherwise, if you do not pass a customer ID, the card you provide must either be a token, like the ones returned by Stripe.js, or a dictionary containing a user\'s credit card details, with the options described below. Although not all information is required, the extra info helps prevent fraud.'
    },
    description: {
      description: 'An arbitrary string which you can attach to a charge object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the description of the charge(s) that they are describing.'
    },
    metadata: {
      description: 'A set of key/value pairs that you can attach to a charge object. It can be useful for storing additional information about the customer in a structured format. It\'s often a good idea to store an email address in metadata for tracking later.'
    },
    capture: {
      description: '',
      example: true
    },
    statement_description: {
      description: 'An arbitrary string to be displayed alongside your company name on your customer\'s credit card statement. This may be up to 15 characters.'
    },
    receipt_email: {
      description: 'The email address to send this charge\'s receipt to. The receipt will not be sent until the charge is paid. If this charge is for a customer, the email address specified here will override the customer\'s email address. Receipts will not be sent for test mode charges. If receipt_email is specified for a charge in live mode, a receipt will be sent regardless of your email settings.'
    },
    application_fee: {
      description: 'A fee in cents that will be applied to the charge and transferred to the application owner\'s Stripe account. The request must be made with an OAuth key in order to take an application fee. '
    }
  },
  exits: {
    error: {},
    success: {
      example: {
        "id": "ch_14Yged2eZvKYlo2CcRXx8khJ",
        "object": "charge",
        "created": 1409761843,
        "livemode": false,
        "paid": true,
        "amount": 500,
        "currency": "usd",
        "refunded": false,
        "card": {
          "id": "card_14Yged2eZvKYlo2CacpQy0aC",
          "object": "card",
          "last4": "4242",
          "brand": "Visa",
          "funding": "credit",
          "exp_month": 1,
          "exp_year": 2050,
          "fingerprint": "Xt5EWLLDS7FJjR1c",
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
          "customer": null
        },
        "captured": true,
        "refunds": {
          "object": "list",
          "total_count": 0,
          "has_more": false,
          "url": "/v1/charges/ch_14Yged2eZvKYlo2CcRXx8khJ/refunds",
          "data": [

          ]
        },
        "balance_transaction": "txn_14WGN92eZvKYlo2Ccrcqvafr",
        "failure_message": null,
        "failure_code": null,
        "amount_refunded": 0,
        "customer": null,
        "invoice": null,
        "description": null,
        "dispute": null,
        "metadata": {
        },
        "statement_description": null,
        "receipt_email": null
      }
    }
  },
  fn: function (inputs,cb) {
   // TODO
   return cb(null , {});
  }
};


