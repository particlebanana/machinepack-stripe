module.exports = {
  'id': 'cus_92418YMzH9wiaI',
  'object': 'customer',
  'account_balance': 0,
  'created': 1471562736,
  'currency': 'usd',
  'default_source': '',
  'delinquent': false,
  'description': 'Stripe Test Customer #5',
  'discount': 0,
  'email': 'somebody@email.com',
  'livemode': false,
  'metadata': {},
  'shipping': 0,
  'sources': {
    'object': 'list',
    'data': [require('./source.object')],
    'has_more': false,
    'total_count': 0,
    'url': '/v1/customers/cus_92418YMzH9wiaI/sources'
  },
  'subscriptions': {
    'object': 'list',
    'data': [require('./subscription.object')],
    'has_more': false,
    'total_count': 0,
    'url': '/v1/customers/cus_92418YMzH9wiaI/subscriptions'
  }
};
