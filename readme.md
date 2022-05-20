```js
// index.js

var loadModule = id => import(/*webpackIgnore: true*/ id)
module.exports = loadModule
module.exports.loadModule = loadModule
```

This package will be obsolete once this TypeScript issue is solved:
 - [GitHub - TypeScript - Add flag to not transpile dynamic import() when module is CommonJS #43329](https://github.com/microsoft/TypeScript/issues/43329)
