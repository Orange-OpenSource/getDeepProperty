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

/**
 * @ignore
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

  it('should return the attribute value for a simple object when the Path is a String object', () => {
    // Given
    const input = {a: {b: 42}};
    // When
    const expected = 42;
    const lookup = new String('a.b');
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
          'last_*': 'OK'
        }
      }
    };
    const expected = 'OK';
    const lookup = 'all-special.somewhat deep.last_*';
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

    it('should return the property value of an object embedded in an array', () => {
      // Given
      const obj = {a: null, b: [{x: 1}, {x: 2}]};
      const lookup = 'b.0.x';
      const expected = 1;
      // When
      const result = getDeepProperty(obj, lookup);
      // Then
      assert.strictEqual(result, expected);
    });

    it('should process array as an object', () => {
      // Given
      const obj = [{x: 1}, {x: 42}, {x: 3}, {x: 4}];
      const lookup = '1.x';
      const expected = 42;
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
    const lookup = 'body.deep.I_DO_NOT_EXIST.next.end';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  it('Should return "undefined" (without error) when looking for a deep property in a string scalar (thus not an object)', function () {
    // Given
    const input = "I am a string, not an object";
    const expected = undefined;
    const lookup = 'body.deep.I_DO_NOT_EXIST.next.end';
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  it('Should return "undefined" (without error) when looking for a deep property in a boolean scalar (thus not an object)', function () {
    // Given
    const input = true;
    const expected = undefined;
    const lookup = 'body.deep.I_DO_NOT_EXIST.next.end';
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

  it('Should return "undefined" (without error) when looking for a non string property path', () => {
    // Given
    const input = {
      '1': 1
    };
    // When
    const expected = undefined;
    const lookup = 1;
    // when
    const res = getDeepProperty(input, lookup);
    // Then
    assert.strictEqual(res, expected);
  });

  describe('With array', () => {
    it('should return "undefined" (without error) for an index outside the array limit', () => {
      // Given
      const obj = {a: [1, 2]};
      const lookup = "a.42";
      const expected = undefined;
      // When
      const result = getDeepProperty(obj, lookup);
      // Then
      assert.strictEqual(result, expected);
    });

    it('should return "undefined" (without error) for an index that is not an integer', () => {
      // Given
      const obj = ['a', 'b', 'c'];
      const lookup = "a";
      const expected = undefined;
      // When
      const result = getDeepProperty(obj, lookup);
      // Then
      assert.strictEqual(result, expected);
    });
  });

});
