# Otsimo AAC SPECS App

An app that helps kids with autism to compose phrases.

Otsimo AAC is an application that ables kids with autism who can not speak to compose phrases by tapping on the words. Otsimo AAC uses picture exchange communication system.

This project was tested with the latest version of nodeJS and npm, please make sure you have atleast node.js 5+ and NPM 3+ installed.

## Usage & Develop

- Clone or fork this repository
- run `npm install` to install dependencies
- run `npm run start` to fire up dev server
- open browser to [`http://localhost:3001`](http://localhost:3001)

## Build

to create a ready production distribution package of the project please run:

```
npm run build
```

after running build the generated files will be available at `/dist`

## Testing

This seed is has protractor and karma for end to end testing and unit testing respectively.

### Unit Testing

make sure your tests are named with a `-test.js` suffix then. to run karma simply run:

```
npm test
```

### End to end Testing

to start protractor tests please run:

```
npm run protractor
```

### Update Symbols

to update the symbols:

```
npm run update-symbols
```
