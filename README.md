# QiDAO/MAI.FINANCE API

This API is the [typechain for ethers with multicall](https://github.com/HOVOH/TypeChain/tree/master/packages/target-ethers-multicall) bindings 
bundled together using [EVMContractsRegistry](https://github.com/HOVOH/web3-services/tree/release/packages/EVMContractsRegistry)

## Features
- Typescript typings
- Contract addresses included
- Multichain
- Multicalls

## How to use

### install
`yarn add @hovoh/mai-finance-api ethers @hovoh/ethcall`

@hovoh/ethcall is a package for multicalls. If you're not using multicalls you don't need to install it.

### Using the api
Initialise your ProvidersRegistry from [EVMContractsRegistry](https://github.com/HOVOH/web3-services/tree/release/packages/EVMContractsRegistry)
and use the initMaiApi(providers: ProviderRegistry) to initialise the API.

```typescript
import {providers} from "@hovoh/evmcontractsregistry";
import {initMaiApi, MaiApi} from "qidaoapi";

const maiApi: MaiApi = initMaiApi(providers);
```

The MaiApi object has two NetworkContractsRegistry: 
1. `vaults` has all the vaults
2. `peripherals` has all the other contracts

**Examples:**

To query a vault (using multicalls):
```typescript
        const [symbol, closingFee] = await vaults.forNetwork(Network.OPERA_MAINNET).multiCall((get) => [
            get("WFTMVault").symbol(),
            get("WFTMVault").closingFee()
        ])
```

To query vault available funds:
```typescript
import {Network} from "@hovoh/evmcontractsregistry";
const wftmVault = maiApi.vaults.forNetwork(Network.OPERA_MAINNET)
    .getContractInstance("WFTMVault");
const maiBorrowAvailable = maiApi.peripherals.forNetwork(Network.OPERA_MAINNET).getContractInstance("MAI").balanceOf(wftmVault.address)
```


## DTS - library starter
## Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).
