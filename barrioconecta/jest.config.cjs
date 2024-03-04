module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        // ... otras mapeaciones de nombres de módulos
        '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub',
        '\\.css$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
};
