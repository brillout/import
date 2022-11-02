```js
// node_modules/@brillout/import/index.js

var import_ = id => import(/*webpackIgnore: true*/ id)
module.exports = import_
module.exports.import_ = import_
```

Workaround for:
 - [GitHub - TypeScript - Add flag to not transpile dynamic import() when module is CommonJS #43329](https://github.com/microsoft/TypeScript/issues/43329)
 - [GitHub - TypeScript - Allow ES Module Type-Only Imports from CJS Modules #49721](https://github.com/microsoft/TypeScript/issues/49721)

Usage:

```js
import { import_ } from '@brillout/import'

// Same as `import()`
const module = await import_(moduleName)
```
