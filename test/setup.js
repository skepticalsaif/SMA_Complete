// setup testing environment before requiring anything
// also can install cross-env for all OS support
// if cross env is installed then add 'cross-env' in
// the test script before NODE_ENV=testing

// right now a temp sol. seems to work
//  "test": "set NODE_ENV=testing& mocha test/setup.js test/**/*.test.js"
process.env.NODE_ENV = 'testing'

const { db } = require('../src/db/models')
const chai = require('chai')
chai.use(require('chai-as-promised'))

before(async () => {
  await db.sync()
})