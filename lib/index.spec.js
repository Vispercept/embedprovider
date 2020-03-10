const { expect } = require('chai');
const embedprovider = require('./index');
const testEmbeds = require('../test/testEmbeds');


describe('embedprovider', () => {
  describe('should detected common embeds, such as', () => testEmbeds.map(({ expected, embedCode }) => it(expected.provider, () => expect(embedprovider(embedCode)).to.deep.equal(expected))));
  describe('should handle incorrect input', () => {
    it('empty string', () => embedprovider(''));
    it('invalid src in embed code', () => expect(() => embedprovider('<html><script src="adfadk.sssssssss" /></html>')).to.throw('Invalid src uri "adfadk.sssssssss"'));
    it('missing src in embed code', () => expect(() => embedprovider('<html></html>')).to.throw('No src uri found in embedCode'));
    it('should detect href attributes as fallback', () => expect(embedprovider('<html><a href="//abc.com">abc</a></html>').provider).to.be.equal('abc'));
  });
});
