/**
 * Overly simple test framework
 *
 * Copyright (C) 2022 Orange
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * This software is distributed under the terms and conditions of the
 * BSD 3-clause license (https://opensource.org/licenses/BSD-3-Clause)
 *
 * @author Benoît BAILLEUX <benoit.bailleux@orange.com>
 */

/**
 * @module @orange-opensource/super-tiny-test-framework
 */

const errors = [];
var testCount = 0;
var errorCount = 0;

/**
 * Group of `it()` test cases with common semantic (e.g. error cases or tests with wrong input).
 *
 * Can be nested.
 *
 * The group description is written on the console.
 *
 * @param {string} desc - the tests group description
 * @param {function} fn - a function without parameter containing a series of `it()` test cases
 */
const describe = (desc, fn) => {
  try {
    console.log('  '.repeat(describe.indent) + desc);
    describe.indent++;
    fn();
    describe.indent--;
  } catch (testError) {
    throw testError
  }
}
describe.indent = 1;

/**
 * A test case to run individually.
 *
 * Each test case should test one and only one feature and behavior.
 *
 * The test result is written on the console, with color according to the result.
 * Errors are numbered to reference details in the "summary" section.
 *
 * @param {string} desc - the description of the test case, starting with "Should…"
 * @param {function} fn - a function without parameter with the unit test code
 */
const it = (desc, fn) => {
  testCount++;
  try {
    fn();
    console.log(`${'  '.repeat(describe.indent)}\x1b[32m\u2714 ${desc}\x1b[0m`);
  } catch (error) {
    errorCount++;
    console.log(`${'  '.repeat(describe.indent)}\x1b[31m${errorCount})\u2718 ${desc}\x1b[0m`);
    errors.push({desc, error});
  }
};

/**
 * Write on the console a summary of the whole test campaign execution,
 *
 * This summary contains:
 * * The number of successful tests
 * * The number of failed tests
 * * the numbered list of errors for failed tests, with difference between expected and real output
 */
const writeSummary = () => {
  console.log(`\n\x1b[32m${testCount - errorCount} passing\x1b[0m`);
  if (errorCount) {
    console.log(`\x1b[31m${errorCount} failing\x1b[0m`);
  }
  if (errors.length) {
    console.error(''); // Empty line
    errors.forEach((err, idx) => {
      console.error(`${idx + 1}) ${err.desc}`);
      console.error(err.error);
    })
  }
}

module.exports = {
  describe,
  it,
  writeSummary
}
