module.exports = {
  testEnvironment: 'jsdom',  // Set the test environment to jsdom for React
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Set up testing environment
  moduleNameMapper: {
    // Handle static assets (images, CSS) imports inside Jest tests
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
};
