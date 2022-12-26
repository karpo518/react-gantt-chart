yarn init
yarn add react react-dom
yarn add -D @babel/core babel-loader @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server html-webpack-plugin compression-webpack-plugin @welldone-software/why-did-you-render

Add to package.js

  "scripts": {
    "build": "webpack --mode production",
    "start": "webpack serve --mode development --env development --open --hot"
  },


Copy webpack.config.js, .babelrc.js, tsconfig.json, index.ts, index.css, App.tsx, App.css to src folder 