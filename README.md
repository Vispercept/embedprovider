# embedprovider

Dependecy-free dectection of providers behind embed-codes.

The detection happens by analyzing the src attribute of any element inside an embed-code, see the example below. (As a fallback the href attribute is also analyzed)

## Example
```javascript
const embedprovider = require('embedprovider');
const result = embedprovider('<iframe title=\"vimeo-player\" src=\"https://player.vimeo.com/video/336812660\" width=\"640\" height=\"360\" frameborder=\"0\" allowfullscreen></iframe>');
console.log(result);
// { provider: 'vimeo', domain: 'vimeo.com' }
```

### Custom mapper
```javascript
const customProviderMap = [{
  from: {
    domain: 'mystr.com',
    provider: 'mystr',
  },
  to: {
    domain: 'servus.com',
    provider: 'servus',
  },
}];
const provider = embedprovider('<html><script src="https://asdfasdf.afdfasdfadf.mystr.com" /></html>', { customProviderMap }),
console.log(provider)
// { domain: 'servus.com', provider: 'servus' }
```
