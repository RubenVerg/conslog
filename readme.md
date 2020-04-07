# ConsLog

The console, rewritten from scratch.

# Usage

To install, 
```
npm install conslog
```
or
```
yarn add conslog
```

After that, there are three ways to use ConsLog. The first way is to replace the `console` object.
```javascript
delete console;
const console = require('conslog');
```
The second, semi-safe way is to move the `console` object.
```javascript
const v8 = require('v8');
const clone = obj => {
  return v8.deserialize(v8.serialize(obj));
};
const oldConsole = clone(console) // Or however you want to deepclone.
delete console;
const console = require('conslog')
```
The third, safer way, is to include it as a separate package.
```javascript
const cons = require('conslog');
```

# Functions

* `console` is ConsLog, `oldC` is the original `console`.

## `log`

```typescript
console.log(msg: any, ...optionalParams?: any[]);
```

Logs to `stdout`. Works exactly like `oldC.log` except for the indentation.