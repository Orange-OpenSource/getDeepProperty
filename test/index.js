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

const fs = require("fs");
const {writeSummary} = require('./testFramework');

const files = fs.readdirSync(__dirname);

files.forEach(file => {
  if (file.endsWith(".unit.js")) {
    require(`./${file}`);
  }
});

writeSummary();
