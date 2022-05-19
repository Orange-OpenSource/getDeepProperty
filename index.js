/**
 * getDeepProperty
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
 * @module @orange-opensource/get-deep-property
 */

/**
 * Recursively gets the sub-properties in a object, designated by the ordered names in an array
 *
 * **Example**:
 * With the following object:
 * ```json
 * {
 *   part: "main",
 *   header: {
 *     name: "x-example",
 *     type: "string"
 *   }
 * }
 * ```
 * And the (nested) properties list: `['header', 'name']`"
 *
 * The result is:
 *
 * > "`x-example`"
 * @param {object} obj - an object with nested properties
 * @param {string[]} propList - an ordered array of property -> sub-property -> sub-sub-property
 * @returns {any} the value of the property (whatever its type) designated by `propList`, or `undefined`
 * @private
 */
const _getDeep = function (obj, propList) {
  const next = propList.shift();
  if (next != undefined && obj) {
    return _getDeep(obj[next], propList);
  } else {
    return obj;
  }
};

/**
 * Look deep for the value of an object property.
 *
 * **Example**:
 * With the following object:
 * ```json
 * {
 *   part: "main",
 *   header: {
 *     name: "x-example",
 *     type: "string"
 *   }
 * }
 * ```
 * And the property named "`header.name`"
 *
 * The result is:
 *
 * > "`x-example`"
 *
 * @param {object} obj - the object into which the property is available
 * @param {string} dottedPropName - the deep name of a property, with dotted notation
 * @returns {any} The property value or `undefined` if it does not exist
 */
const getDeepProperty = function (obj, dottedPropName) {
  if (!dottedPropName || !obj) {
    return undefined;
  }
  const propList = dottedPropName.split('.');
  return _getDeep(obj, propList);
};

module.exports = getDeepProperty;
