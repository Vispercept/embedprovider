const getSourceUri = (html) => (/src="(?<uri>.*)"/.test(html) ? /src="(?<uri>.*)"/.exec(html).groups.uri : '');
const prependProtocol = (uri) => uri.replace(/^\/\//, 'https://');
const getHostname = (uri) => new URL(uri).hostname;
const getProvider = (hostname) => /(?<provider>\w+)\.\w+$/.exec(hostname).groups.provider;


function embedprovider(embedCode) {
  if (!embedCode) return '';

  const uri = prependProtocol(getSourceUri(embedCode));

  if (!uri) throw new Error('No src uri found in embedCode');

  try {
    const hostname = getHostname(uri);

    return getProvider(hostname);
  } catch (err) {
    throw new Error(`Invalid src uri "${uri}"`);
  }
}

module.exports = embedprovider;
