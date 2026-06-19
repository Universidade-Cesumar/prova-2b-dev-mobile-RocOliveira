   module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
      modulePathIgnorePatterns: ['<rootDir>/sysalmoxarifado/'],
     moduleNameMapper: {
       '^expo($|/.*)': '<rootDir>/__mocks__/expo.js',
       '^expo-modules-core($|/.*)': '<rootDir>/__mocks__/expo-modules-core.js'
     },
     transformIgnorePatterns: [
       'node_modules/(?!((jest-)?react-native|@react-native(-community)?))',
     ],
    setupFiles: ["<rootDir>/jest.setup.js"],
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"]
   };