// Angular Mocks workaround to the issue
// "angular tried to load more than once".

'use strict'

require('angular')
require('angular-mocks')
let context = require.context('./app', true, /-test$/)
context.keys().forEach(context)
