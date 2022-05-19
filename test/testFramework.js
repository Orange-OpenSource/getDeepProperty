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

const errors = [];
var testCount = 0;
var errorCount = 0;

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
