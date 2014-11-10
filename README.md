
#machinepack-stripe

###Basic usage

```js
var stripe = require('machinepack-stripe');
stripe.createCharge({
  apiKey: 'somestring837483749blah',
  amount: 500,
  currency: 'usd',
  card: 'tok_someCardIdjsd2isnsd',
  capture: true
})
.exec({
  success: console.log,
  error: console.error
})
```
