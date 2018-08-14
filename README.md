

# Solutions for Vue separation of concerns.

This project is a sandbox for multiple solutions to separate template, code and style from vue files.

This project uses:
- Vue CLI 3 : https://cli.vuejs.org/
- Webpack 4
- TypeScript
- Sass

You can separate files in 3 way:
- vue-template-loader: https://github.com/ktsn/vue-template-loader
- A custom loader (vue-pre-loader)
- Linking files with `<script lang="ts" src="./myfile.ts">`

## vue-pre-loader

Mustache is used to pre-process the template and change it before vue-loader.

TODO Documentation

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Debug webpack build (windows)

https://webpack.js.org/contribute/debugging/

Start server:
```
node[-nightly] --inspect-brk .\node_modules\webpack\bin\webpack.js --config .\node_modules\@vue\cli-service\webpack.config.js
```
Then: In chrome, enter address: chrome://inspect


### Cheat sheet doc and links
- inspect final webpack config:

    `vue inspect > inspect.config.js`
    
- webpack chain:

    https://github.com/mozilla-neutrino/webpack-chain

- vue webpack chain modification

    https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
    
- loaders how-to

    https://survivejs.com/webpack/loading/loader-definitions/
    
- loaders

    https://webpack.js.org/loaders/    
    https://webpack.js.org/api/loaders/
    https://webpack.js.org/contribute/writing-a-loader/#guidelines
    https://github.com/webpack/docs/wiki/how-to-write-a-loader
    
- Templates review from LinkedIn (old)

    https://engineering.linkedin.com/frontend/client-side-templating-throwdown-mustache-handlebars-dustjs-and-more