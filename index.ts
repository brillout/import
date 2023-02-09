export { import_ }
export default import_

import path from 'path'

function import_(id: string) {
  id = fixWindowsBug(id)
  return import(/*webpackIgnore: true*/ id)
}

// Avoid:
// ```
// Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only file and data URLs are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
// ```
// https://stackoverflow.com/questions/69665780/error-err-unsupported-esm-url-scheme-only-file-and-data-urls-are-supported-by/70057245#70057245
const prefix = 'file://'
function fixWindowsBug(id: string): string {
  if (process.platform === 'win32' && path.isAbsolute(id) && !id.startsWith(prefix)) {
    return prefix + id
  } else {
    return id
  }
}
