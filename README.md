# embedprovider

Dependecy-free dectection of providers behind embed-codes.

The detection happens by analyzing the src attribute of any element inside an embed-code, see the example below.

## Example
```javascript
const embedprovider = require('./embedprovider');
const provider = embedprovider('<iframe title=\"vimeo-player\" src=\"https://player.vimeo.com/video/336812660\" width=\"640\" height=\"360\" frameborder=\"0\" allowfullscreen></iframe>');
console.log(provider);
// vimeo
```
