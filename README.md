# get-deep-property

[![license](https://img.shields.io/github/license/Orange-OpenSource/getDeepProperty)]()
[![version](https://img.shields.io/github/package-json/v/Orange-OpenSource/getDeepProperty)]()
[![npm downloads](https://img.shields.io/npm/dm/@orange-opensource/get-deep-property)]()

**getDeepProperty** looks deep for the value of a plain JavaScript object property

* Gives access to any nested named property of plain objects
* Uses exclusively a dot separated properties names list, in a string
* Array content can be addressed through index
* Returns the property value or `undefined` if it does not exist
* It should never throw an exception
* No dependency

> _Note_: it comes with its own super tiny, super simple test framework…

## Quick start

### Install

Use _npm_ as usual to install this package:

```shell
npm install @orange-opensource/get-deep-property
```

Or clone it from GitHub:

```shell
$ git clone https://github.com/Orange-OpenSource/getDeepProperty.git
Cloning into 'getDeepProperty'...
[…]
```

### Syntax

> ```js
> result = getDeepProperty(sourceObject, propertyPath)
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

When ran, the result will simply be:

```console
Result: 42
```

See the `test/getDeepProperty.unit.js` file for other examples.

## Contributing

Please report any bug or feature request by [opening an issue](https://github.com/Orange-OpenSource/getDeepProperty/issues).

> _Note_:
>
> One important design goal of this module is to keep it very small and simple. So please have in mind this
> principle before creating a _feature request_.

### Building docs

A builtin documentation is available in the code (and must be maintained by contributors). Most [IDEs](https://en.wikipedia.org/wiki/Integrated_development_environment) will use this documentation to display usage guide for this module.

You may generate an HTML version of the documentation with the help of [JSDoc](https://github.com/jsdoc/jsdoc#readme).

To generate the doc, just follow below steps:

1. install `jsdoc` with (see its documentation for details)
   
   ```shell
   $ npm install -g jsdoc
   ```
2. create a [configuration file](https://jsdoc.app/about-configuring-jsdoc.html) (e.g. `jsdoc.conf.json`) in order to,
   at least, enable [the Markdown plugin](https://jsdoc.app/plugins-markdown.html)

   ```json
     {
        "plugins": ["plugins/markdown"]
     }
   ```
3. Generate the documentation with command:
   
   ```sh
   $ jsdoc --configure /path/to/jsdoc.conf.json --access all --readme README.md --destination /path/to/html/doc .
   ```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API, even when very simple.
You can run unit tests with the following command:

```sh
$ npm test
```

Any file in the `test` directory suffixed with `.unit.js` will be ran.

### Submitting code

Before submitting a Pull Request, please check that your work follows these requirements:

1. All unit tests are up to date and OK
2. The documentation is up to date
3. Your _commit_ follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) guidelines
4. You agree to the [Developer Certificate of Origin](https://developercertificate.org/) by signing-off your commit
   (use the `-s` option for `git commit`)

## License

This code is released under the terms of the _BSD 3-clause_ license

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
