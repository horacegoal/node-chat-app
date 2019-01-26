var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message Object', () => {
    var res = generateMessage('Horace', 'Testing');
    expect(res.from).toBe('Horace');
    expect(res.text).toBe('Testing');
    expect(res.createdAt).toBeA('number');

  })
})
