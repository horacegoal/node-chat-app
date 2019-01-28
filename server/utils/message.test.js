var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message Object', () => {
    var res = generateMessage('Horace', 'Testing');
    expect(res.from).toBe('Horace');
    expect(res.text).toBe('Testing');
    expect(res.createdAt).toBeA('number');

  })
})

describe('generateLocationMessage', () => {
  it('should genereate current location message', () => {
    var from = 'user'
    var res = generateLocationMessage(from, 1, 1);
    expect(res.from).toBe(from);
    expect(res.uri).toBe('https://www.google.com/maps?q=1,1')
    expect(res.createdAt).toBeA('number');
  })
})
