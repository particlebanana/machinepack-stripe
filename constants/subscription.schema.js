// Stripe API subscription object -- see https://stripe.com/docs/api#subscriptions for full documentation.
// This is used in the output from `cancelSubscription`, `subscribeCustomer` and `updateSubscription`,
// and is also embedded in the Customer schema (see customer.schema.js).
module.exports = {
  'id': 'sub_929dHmk5spqvgi',
  'object': 'subscription',
  'application_fee_percent': 0,
  'cancel_at_period_end': false,
  'canceled_at': 0,
  'created': 1471583633,
  'current_period_end': 1474262033,
  'current_period_start': 1471583633,
  'customer': 'cus_92418YMzH9wiaI',
  'discount': 0,
  'ended_at': 0,
  'livemode': false,
  'metadata': {},
  'plan': {
    'id': 'pro',
    'object': 'plan',
    'amount': 3000,
    'created': 1471559116,
    'currency': 'usd',
    'interval': 'month',
    'interval_count': 1,
    'livemode': false,
    'metadata': {
    },
    'name': 'Pro',
    'statement_descriptor': 'Pro Plan',
    'trial_period_days': 0
  },
  'quantity': 1,
  'start': 1471583633,
  'status': 'active',
  'tax_percent': 0,
  'trial_end': 0,
  'trial_start': 0
};
