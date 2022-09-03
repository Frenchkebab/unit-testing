## 1. Test Every State Change

This includes

- ethereum balance changes
- events emitted : check not only that event was emitted, but also what was included as an argument inside of that event.
- storage variables

## 2. Aim for 100% code coverage **and** branch coverage

But remember, coverd != tested. Coverage doesn't say anything about state changes

It is possible for code to be "covered" but no expect statements were actually executed.

## 3. Make sure each test is isolated from the others. Re-deploy the smart contracts and reset the accounts before each test. Don't make one test reloy on state changes from another.

## 4. Always test return values. Use bignumbers, not regular numbers. Ideally, check the return type also.

Remember testing a return value on an external function requires you using the callStatic.
But remember that callStatic will not make state change.

## 5. Make your Code Clean

This makes you look more professional.

- use solhint to catch dumb bugs and unused variables

- Use eslint to make your test legible

- use prettier to format your solidity code

legibility = easier to catch bugs and it makes your code look more professional
