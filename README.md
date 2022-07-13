# dummy-user-data
Randomly generated and customizable dummy user API data to work with.

Example:

```js
const users = generateUsers(3, {
  usernameRules: {
    symbols: true,
    allowedSymbols: ['_', '-', '.'],
    numbers: true,
    minimumLength: 4,
    maximumLength: 12
  },
  emailRules: {
    domains: ['gmail', 'yahoo', 'example'],
  },
  idRules: {
    length: 7,
    parseString: true
  }
})
```