var loadModule = id => import(/*webpackIgnore: true*/ id)
module.exports = loadModule
module.exports.loadModule = loadModule
