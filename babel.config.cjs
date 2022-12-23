module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
        },
      ],
    ],
  };
  
  // npm install --save-dev babel-jest @babel/core @babel/preset-env
  