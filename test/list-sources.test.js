var util = require('util');
var assert = require('assert');
var _ = require('@sailshq/lodash');
var Stripe = require('../');


if (!process.env.STRIPE_API_KEY_FOR_TESTS) {
  throw new Error('In order to run tests, the `STRIPE_API_KEY_FOR_TESTS` environment variable must be set!');
}



describe('Stripe.listSources()', function (){


  //  ██████╗ ███████╗███████╗ ██████╗ ██████╗ ███████╗██╗  ██╗ █████╗ ███╗   ██╗██████╗
  //  ██╔══██╗██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗████╗  ██║██╔══██╗
  //  ██████╔╝█████╗  █████╗  ██║   ██║██████╔╝█████╗  ███████║███████║██╔██╗ ██║██║  ██║
  //  ██╔══██╗██╔══╝  ██╔══╝  ██║   ██║██╔══██╗██╔══╝  ██╔══██║██╔══██║██║╚██╗██║██║  ██║
  //  ██████╔╝███████╗██║     ╚██████╔╝██║  ██║███████╗██║  ██║██║  ██║██║ ╚████║██████╔╝██╗██╗██╗
  //  ╚═════╝ ╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝╚═╝╚═╝
  //
  before(function (done){

    // Do any setup that is necessary before ANY of the tests below run.
    //
    // > e.g. create some fake customers, give them fake credit cards, sign them up
    // > for fake subscriptions, etc.)
    // TODO


    // Done with setup!
    return done();

  });//</before>


  //  ██████╗  █████╗ ███████╗██╗ ██████╗    ██╗   ██╗███████╗ █████╗  ██████╗ ███████╗
  //  ██╔══██╗██╔══██╗██╔════╝██║██╔════╝    ██║   ██║██╔════╝██╔══██╗██╔════╝ ██╔════╝
  //  ██████╔╝███████║███████╗██║██║         ██║   ██║███████╗███████║██║  ███╗█████╗
  //  ██╔══██╗██╔══██║╚════██║██║██║         ██║   ██║╚════██║██╔══██║██║   ██║██╔══╝
  //  ██████╔╝██║  ██║███████║██║╚██████╗    ╚██████╔╝███████║██║  ██║╚██████╔╝███████╗
  //  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝     ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
  //
  describe('with basic usage', function (){

    it('should work', function (done){
      Stripe.listSources({
        apiKey: process.env.STRIPE_API_KEY_FOR_TESTS,
        // ...   (TODO: add other argins)
      }).exec(function (err, outputIfRelevant) {
        if (err) { return done(err); }
        try {

          // Check output.
          // TODO
          // (^^ only if relevant-- e.g. not necessary for `listSources`)
          // assert.deepEqual(37, outputIfRelevant.foo.bar);
          // assert.deepEqual('hello', outputIfRelevant.foo.beep);


          // Hit Stripe API again to check that this actually happened.
          // TODO
          // (^^ only if relevant-- e.g. not necessary for `listSources`)
          setTimeout(function pretendStripeAPICall(err, doubleCheckResult){
            if (err) { return done(err); }
            try {

              // Finish verifying the double-check results, if relevant.
              // TODO

              // All good.
              return done();

            } catch (e) { return done(e); }
          }, 1000);//</setTimeout>
        } catch (e) { return done(e); }
      });//</call to Stripe machine>
    });//</it>
  });//</describe :: with basic usage>



  //  ███████╗██╗  ██╗ ██████╗███████╗██████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
  //  ██╔════╝╚██╗██╔╝██╔════╝██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
  //  █████╗   ╚███╔╝ ██║     █████╗  ██████╔╝   ██║   ██║██║   ██║██╔██╗ ██║███████╗
  //  ██╔══╝   ██╔██╗ ██║     ██╔══╝  ██╔═══╝    ██║   ██║██║   ██║██║╚██╗██║╚════██║
  //  ███████╗██╔╝ ██╗╚██████╗███████╗██║        ██║   ██║╚██████╔╝██║ ╚████║███████║
  //  ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝        ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
  //
  //     ██╗       ███████╗██████╗  ██████╗ ███████╗     ██████╗ █████╗ ███████╗███████╗███████╗
  //     ██║       ██╔════╝██╔══██╗██╔════╝ ██╔════╝    ██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝
  //  ████████╗    █████╗  ██║  ██║██║  ███╗█████╗      ██║     ███████║███████╗█████╗  ███████╗
  //  ██╔═██╔═╝    ██╔══╝  ██║  ██║██║   ██║██╔══╝      ██║     ██╔══██║╚════██║██╔══╝  ╚════██║
  //  ██████║      ███████╗██████╔╝╚██████╔╝███████╗    ╚██████╗██║  ██║███████║███████╗███████║
  //  ╚═════╝      ╚══════╝╚═════╝  ╚═════╝ ╚══════╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
  //
  describe('exceptions & edge cases', function (){

    //  ┬ ┬┬┌┬┐┬ ┬  ╦╔╗╔╦  ╦╔═╗╦  ╦╔╦╗  ╔═╗╔═╗╦  ╦╔═╔═╗╦ ╦
    //  ││││ │ ├─┤  ║║║║╚╗╔╝╠═╣║  ║ ║║  ╠═╣╠═╝║  ╠╩╗║╣ ╚╦╝
    //  └┴┘┴ ┴ ┴ ┴  ╩╝╚╝ ╚╝ ╩ ╩╩═╝╩═╩╝  ╩ ╩╩  ╩  ╩ ╩╚═╝ ╩
    describe('with invalid API key', function (){
      it('should NOT work', function (done){
        Stripe.listSources({
          apiKey: 't0t4lly_FAKE!!',
          // ...   (TODO: add other argins)
        }).exec({
          error: function (/*err*/) {
            return done();
          },
          success: function (){
            return done(new Error('Should not have triggered success exit!'));
          }//</--• on success>
        });//</call to Stripe machine>
      });//</it>
    });//</describe :: with invalid API key>


    // =====================================================================
    //  ┌─┐┌┬┐┌─┐
    //  ├┤  │ │
    //  └─┘ ┴ └─┘ooo
    // TODO: Tests for any other exceptions and edge cases.
    // describe('with todo TODO todo TODO', function (){
    //   it('should exit via `foobar`', function (done){
    //     Stripe.listSources({
    //       apiKey: process.env.STRIPE_API_KEY_FOR_TESTS,
    //       // ...   (TODO: add other argins)
    //     }).exec({
    //       error: function (err) {
    //         return done(err);
    //       },
    //       foobar: function (err) {
    //         return done();
    //       },
    //       success: function (){
    //         return done(new Error('Should not have triggered success exit!'));
    //       }//</--• on success>
    //     });//</call to Stripe machine>
    //   });//</it>
    // });//</describe :: with todo TODO todo TODO>
    // =====================================================================

  });//</describe :: exceptions & edge cases>




  //   █████╗ ███████╗████████╗███████╗██████╗ ██╗    ██╗ █████╗ ██████╗ ██████╗ ███████╗
  //  ██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗██║    ██║██╔══██╗██╔══██╗██╔══██╗██╔════╝
  //  ███████║█████╗     ██║   █████╗  ██████╔╝██║ █╗ ██║███████║██████╔╝██║  ██║███████╗
  //  ██╔══██║██╔══╝     ██║   ██╔══╝  ██╔══██╗██║███╗██║██╔══██║██╔══██╗██║  ██║╚════██║
  //  ██║  ██║██║        ██║   ███████╗██║  ██║╚███╔███╔╝██║  ██║██║  ██║██████╔╝███████║██╗██╗██╗
  //  ╚═╝  ╚═╝╚═╝        ╚═╝   ╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝╚═╝╚═╝
  //
  after(function (done){

    // Do any cleanup/teardown tasks that need to be done after ALL of the tests above have run.
    //
    // > e.g. delete the fake customers created back in the `before` function, etc.
    //
    // This way, each test file is idempotent, so if one thing fails, it doesn't lead
    // to any weird/confusing consequences.
    // TODO


    // Done with cleanup!
    return done();

  });//</after>


});//</describe (outermost)>
