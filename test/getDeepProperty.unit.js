/**
 * Testing getDeepProperty module
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

const getDeepProperty = require('../index');
const assert = require('assert');
const {describe, it} = require('./testFramework');

describe('Nominal cases', () => {
  it('should return the attribute value for a simple object', () => {
    // Given
    const input = {a: 1};
    // When
    const expected = 1;
    const lookup = 'a';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  it('Should get a deep property of a complex object', function () {
    // Given
    const input = {
      body: {
        all: true,
        deep: {
          name: 'deep',
          values: {
            next: {
              end: 'OK'
            }
          }
        }
      }
    };
    const expected = 'OK';
    const lookup = 'body.deep.values.next.end';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  it('Should get a deep sub-object of a complex object', function () {
    // Given
    const input = {
      body: {
        all: true,
        deep: {
          name: 'deep',
          values: {
            next: {
              end: 'OK'
            }
          }
        }
      }
    };
    const expected = {next: {end: 'OK'}};
    const lookup = 'body.deep.values';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.deepStrictEqual(res, expected);
  });

  it('Should get a deep property with special names of a complex object', function () {
    // Given
    const input = {
      'all-special': {
        'somewhat deep': {
          last_name: 'OK'
        }
      }
    };
    const expected = 'OK';
    const lookup = 'all-special.somewhat deep.last_name';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  it('Should actually return "null" (without error) when looking for a deep property that has value "null"', function () {
    // Given
    const input = {
      body: {
        a: null,
      }
    };
    const expected = null;
    const lookup = 'body.a';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  it('Should get a deep property even when the property is named with an empty string', function () {
    // Given
    let input = {
      body: {
        all: true,
        deep: {
          name: 'deep',
          '': {
            next: {
              end: 'OK'
              }
            }
          }
        }
      };
    const expected = 'OK';
    const lookup = 'body.deep..next.end';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  describe('With array', () => {
    it('should return the array attribute value', () => {
      // Given
      const obj = {a: [1, 2, 3, 4]};
      const expected = 3;
      const lookup = 'a.2';
      // When
      const result = getDeepProperty(obj, lookup);
      // Then
      assert.strictEqual(result, expected);
    });

    it('should return the whole array as property value', () => {
      // Given
      const obj = {a: [1, 2]};
      const expected = obj.a;
      const lookup = 'a';
      // When
      const result = getDeepProperty(obj, lookup);
      // Then
      assert.deepStrictEqual(result, expected);
    });

    it('should return the array attribute value for index "0', () => {
      // Given
      const obj = {a: [1, 2]};
      const expected = 1;
      const lookup = 'a.0';
      // When
      const result = getDeepProperty(obj, lookup);
      // Then
      assert.strictEqual(result, expected);
    });

    it('should return the property of an an object embedded in an array', () => {
      // Given
      const obj = {a: null, b: [{x: 1}, {x: 2}]};
      const lookup = 'b.0.x';
      const expected = 1;
      // When
      const result = getDeepProperty(obj, lookup);
      // Then
      assert.strictEqual(result, expected);
    });

  });  
});

describe('Special cases', () => {
  it('Should return "undefined" (without error) when a deep property does not exist', function () {
    // Given
    const input = {
      body: {
        all: true,
        deep: {
          name: 'deep',
          values: {
            next: {
              end: 'OK'
            }
          }
        }
      }
    };
    const expected = undefined;
    const lookup = 'body.deep.IDONTEXIST.next.end';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  it('Should return "undefined" (without error) when looking for a deep property in "undefined"', function () {
    // Given
    const input = undefined;
    const expected = undefined;
    const lookup = 'body.deep.IDONTEXIST.next.end';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  it('Should return "undefined" (without error) when looking for a void deep property', function () {
    // Given
    const input = undefined;
    const expected = undefined;
    const lookup = '';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  it('Should return "undefined" (without error) when looking for an undefined deep property', function () {
    // Given
    const input = undefined;
    const expected = undefined;
    const lookup = undefined;
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  describe('With array', () => {
    it('should return "undefined" for an index outside the array size', () => {
      // Given
      const obj = {a: [1, 2]};
      const lookup = "a.42";
      const expected = undefined;
      // When
      const result = getDeepProperty(obj, lookup);
      // Then
      assert.strictEqual(result, expected);
    });
  });

});
