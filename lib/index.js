const providerMap = require('./providerMap');

const getSourceUri = (html) => (/src="(?<uri>.*)"/.test(html) ? /src="(?<uri>.*)"/.exec(html).groups.uri : '');
const getHrefUri = (html) => (/href="(?<uri>.*)"/.test(html) ? /href="(?<uri>.*)"/.exec(html).groups.uri : '');
const prependProtocol = (uri) => uri.replace(/^\/\//, 'https://');
const getHostname = (uri) => new URL(uri).hostname;
const getProvider = (hostname) => /(?<provider>\w+)\.\w+$/.exec(hostname).groups.provider;
const getDomain = (hostname) => /(?<domain>\w+\.\w+)$/.exec(hostname).groups.domain;
const findMappedProvider = (providerInfo, map) => map.find(({ from: { domain } }) => providerInfo.domain === domain);
const mapProviderInfo = (providerInfo, map) => {
  const mappedProvider = findMappedProvider(providerInfo, map);
  if (!mappedProvider) return providerInfo;
  return mappedProvider.to;
};

function embedprovider(embedCode, { customProviderMap } = {}) {
  if (!embedCode) return '';
  const map = customProviderMap ? providerMap.concat(...customProviderMap) : providerMap;

  const srcUri = getSourceUri(embedCode);
  const uri = prependProtocol(srcUri || getHrefUri(embedCode));

  if (!uri) throw new Error('No src uri found in embedCode');

  try {
    const hostname = getHostname(uri);

    const providerInfo = {
      provider: getProvider(hostname),
      domain: getDomain(hostname),
    };

    return mapProviderInfo(providerInfo, map);
  } catch (err) {
    throw new Error(`Invalid src uri "${uri}"`);
  }
}

module.exports = embedprovider;
