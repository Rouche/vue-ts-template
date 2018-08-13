const path = require('path');

module.exports = {
    lintOnSave: true,

    chainWebpack: function(config) {

        // Add our custom loaders
        config.resolveLoader.modules
            .add(path.resolve(__dirname, 'loaders'))
            .end();

        // Configure vue-template-loader
        config.module
            .rule('html')
            .test(/\.html$/)
            .exclude.add(/index\.html/).end()
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