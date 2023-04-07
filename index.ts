export { import_ }
export default import_

function isPathSeparator(code: number) {
  return code === 47 /* / */ || code === 92 /* \ */;
}

function isWindowsDeviceRoot(code: number) {
  return (code >= 65 /* A */ && code <= 90 /* Z */) ||
         (code >= 97 /* a */ && code <= 122 /* z */);
}

// https://github.com/nodejs/node/blob/49a77a5a996a49e8cb728eed42e55a7c1a9eef6e/lib/path.js#L402-L403
function win32IsAbsolute(path: string) {
  const len = path.length;
  if (len === 0)
    return false;

  const code = path.charCodeAt(0);
  return isPathSeparator(code) ||
    // Possible device root
    (len > 2 &&
    isWindowsDeviceRoot(code) &&
    path.charCodeAt(1) === 58 /* : */ &&
    isPathSeparator(path.charCodeAt(2)));
}

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
  if (process.platform === 'win32' && win32IsAbsolute(id) && !id.startsWith(prefix)) {
    return prefix + id
  } else {
    return id
  }
}
