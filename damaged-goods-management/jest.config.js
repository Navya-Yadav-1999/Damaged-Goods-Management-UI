// module.exports = {
//     transform: {
//         "^.+\\.jsx?$": "babel-jest",
//     },
//     transformIgnorePatterns: [
//         "/node_modules/(?!(react-router-dom|axios)/)"
//     ],
// };


module.exports = {
    setupFilesAfterEnv: ["<rootDir>/src/setup.jests.js"], // Update path if necessary
    moduleNameMapper: {
      "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.js" // Map react-router-dom to your mock
    }
  };
  