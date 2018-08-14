const path = require('path');

module.exports = {

    lintOnSave: true,

    configureWebpack: (config) => {

        if (process.env.NODE_ENV === 'production') {
            //config.mode = 'development';
            // mutate config for production...
        } else {
            //config.mode = 'development';
            // mutate for development...
        }
    },

    chainWebpack: (config) => {

        //config.cache = false;

        // Add our custom loaders
        config.resolveLoader.modules
            .add(path.resolve(__dirname, 'loaders'))
            .end();

        // Configure vue-template-loader
        // @Important not compatible with <template src="./template.html">
        // https://github.com/vuejs/vueify/issues/35
        config.module
            .rule('html')
            .test(/\.html$/)
            .exclude.add(/index\.html/)
                .add(/\.vue\.html/).end()
            .set('loader', 'vue-template-loader')
            .set('options', {
                scoped: false
            })
            .end();

        // Add custom loader to be able to pre-process *.vue files
        config.module
            .rule('vue')
            .use('vue-pre-loader')
            .loader('vue-pre-loader')
            .options({
                debug: true
            })
            .end();
    }
}