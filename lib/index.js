const getSourceUri = (html) => (/src="(?<uri>.*)"/.test(html) ? /src="(?<uri>.*)"/.exec(html).groups.uri : '');
const getHrefUri = (html) => (/href="(?<uri>.*)"/.test(html) ? /href="(?<uri>.*)"/.exec(html).groups.uri : '');
const prependProtocol = (uri) => uri.replace(/^\/\//, 'https://');
const getHostname = (uri) => new URL(uri).hostname;
const getProvider = (hostname) => /(?<provider>\w+)\.\w+$/.exec(hostname).groups.provider;
const getDomain = (hostname) => /(?<domain>\w+\.\w+)$/.exec(hostname).groups.domain;


function embedprovider(embedCode) {
  if (!embedCode) return '';

  const srcUri = getSourceUri(embedCode);
  const uri = prependProtocol(srcUri || getHrefUri(embedCode));

  if (!uri) throw new Error('No src uri found in embedCode');

  try {
    const hostname = getHostname(uri);

    return {
      provider: getProvider(hostname),
      domain: getDomain(hostname),
    };
  } catch (err) {
    throw new Error(`Invalid src uri "${uri}"`);
  }
}

module.exports = embedprovider;
