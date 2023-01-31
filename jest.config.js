module.exports = {
    plugins: ["syntax-dynamic-import", "transform-runtime"],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png)$": "identity-obj-proxy",
      },
  }