# get-deep-property

![license](https://img.shields.io/github/license/Orange-OpenSource/getDeepProperty)
![version](https://img.shields.io/github/package-json/v/Orange-OpenSource/getDeepProperty)
![npm](https://img.shields.io/npm/dm/get-deep-property)

**getDeepProperty** looks deep for the value of a plain JavaScript object property

* Gives access to any nested named property of plain object
* Uses exclusively a dot separated properties names list, in a string
* Array content can be addressed through index
* Returns the property value or `undefined` if it does not exist
* It should never throw an exception
* No dependency

> _Note_: it comes with its own super tiny test framework…

## Quick start

### Install

Use _npm_ as usual to install this package:

```shell
npm install @orange-opensource/get-deep-property
```

Or clone from GitHub:

```shell
$ git clone https://github.com/Orange-OpenSource/getDeepProperty.git
Cloning into 'getDeepProperty'...
[…]
```

### Syntax

> ```js
> getDeepProperty(sourceObject, propertyPath)
> ```

Parameters:

* `sourceObject`: A _JavaScript_ plain _object_ with nested properties
* `propertyPath`: The deep name of the wanted property, as a _string_ with dotted notation

### Usage

In the file requiring the tool, just add a line like:

```js
const getDeepProperty = require("@orange-opensource/get-deep-property");
```

Then you can use the only provided function as follow:

```js
let value = getDeepProperty(sourceObject, 'path.to.a.property');
```

### Examples

With the following object:

```js
{
  part: "main",
  header: {
    name: "x-example",
    type: "string"
  }
}
```

And the property list named "`header.name`"

The result will be "`x-example`"

Another working example:

```js
  const getDeepProperty = require("@orange-opensource/get-deep-property");

  const obj = {
    a: {
      b: true,
      c: 42
    }
  };

  const propertyPath = 'a.c';
  console.log("Result:", getDeepProperty(obj, propertyPath));
```

And the result will simply be:

```console
Result: 42
```

## License

This code is released under the BSD 3-clause license

Copyright (c) 2022 Orange SA

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.
* Neither the name of the copyright holder nor the
  names of its contributors may be used to endorse or promote products
  derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
