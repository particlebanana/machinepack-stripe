module.exports = {


  friendlyName: 'Set global defaults',


  description: 'Save the specified default options (e.g. developer credentials) in a process-wide global variable for future, automatic (and easier) use of the other methods in this package.',


  extendedDescription:
  'If you only need to interact with one developer account (one API key), '+
  'we recommend using this method to simplify your userland code by passing '+
  'that API key in here.  That way, you only have to do it once, allowing you '+
  'to avoid the headache of making sure the configured API key is always consistently '+
  'applied.\n'+
  '\n'+
  '> One notable (yet rare) exception is if you need to manually manage multiple sets\n'+
  '> of dev credentials.  In that case, just pass in the API key directly when you call\n'+
  '> each method.  (Also note that, even if you provide defaults using this method, those\n'+
  '> default credentials etc. can always be overridden on a per-use basis.)',


  sync: true,


  inputs: {

    apiKey: require('../constants/apiKey.input')

  },


  exits: {

    success: {
      description: 'These default options have been cached for future use in other method calls.'
    },

  },


  fn: function(inputs, exits) {

    var cache = require('./private/cache');

    Object.assign(cache, inputs);

    return exits.success();

  }

};
