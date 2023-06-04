Usage:

```js
import { import_ } from '@brillout/import'

// Same as `import()`
const module = await import_(moduleName)
```

Same as `import()` but:
 - Avoids bundlers like Webpack to bundle `moduleName`.
 - Avoids TypeScript from transpiling `import()` to `require()`.
 - Fixes Node.js windows bug `ERR_UNSUPPORTED_ESM_URL_SCHEME`.

Zero dependency. (Also doesn't dependend on any Node.js API.)
