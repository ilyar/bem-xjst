var fixtures = require('./fixtures')('bemhtml');
var test = fixtures.test;
var assert = require('assert');
var BEMXJSTError = require('../lib/bemxjst/error').BEMXJSTError;

describe('Templates syntax', function() {
  it('should support block without mode()', function() {
    test(function() {
      block('b1')(function() {
        return '{' + applyNext() + '}';
      });
    }, { block: 'b1' }, '{<div class="b1"></div>}');
  });

  it('should support mixed direct/nested bodies', function() {
    test(function() {
      block('page')(
        content()(
          function() { return 'ok'; },
          match(function() { return true; })(function() {
            return applyNext();
          })
        )
      );
    }, { block: 'page' }, '<div class="page">ok</div>');
  });

  it('should expect other templates as template body', function() {
    test(function() {
      block('b')(tag()('b'), bem()(false));
    },
    { block: 'b' },
    '<b></b>');
  });

  it('should throw error when no block subpredicate', function() {
    assert.throws(function() {
      fixtures.compile(function() {
        // No block() subpredicate
        elem('e').tag()('b');
      });
    }, BEMXJSTError);
  });
});
