export { import_ }
export default import_

function import_(id: string) {
  id = fixWindowsBug(id)
  // - For TypeScript to not transpile `import()` to `require()` for CJS builds, it needs to be configured with `"moduleResolution": "nodenext"`, see https://github.com/microsoft/TypeScript/issues/43329#issuecomment-1079559627
  // - Skip webpack from forcefully bunlding dynamic imports with unknown IDs: https://github.com/webpack/webpack/issues/7644#issuecomment-402123392
  return import(/*webpackIgnore: true*/ id)
}

// Avoid:
// ```
// Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only file and data URLs are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
// ```
// https://stackoverflow.com/questions/69665780/error-err-unsupported-esm-url-scheme-only-file-and-data-urls-are-supported-by/70057245#70057245
const prefix = 'file://'
function fixWindowsBug(id: string): string {
  if (process.platform === 'win32' && isAbsolute(id) && !id.startsWith(prefix)) {
    return prefix + id
  } else {
    return id
  }
}

// Copied from https://github.com/unjs/pathe/blob/ae583c899ed9ebf44c94ab451da5fd7c3094dea9/src/path.ts#L14
// Alternative: https://github.com/nodejs/node/blob/49a77a5a996a49e8cb728eed42e55a7c1a9eef6e/lib/path.js#L402
// - Extracted version: https://github.com/brillout/import/commit/6127f900bb769354727115cd7ba433fb04815a1b
function isAbsolute(path: string) {
  return /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/.test(path)
}
