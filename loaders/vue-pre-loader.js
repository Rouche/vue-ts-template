
const path  = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

const Mustache = require('mustache');

const loaderName = 'vue-pre-loader Loader';

const schema = {
    type: 'object',
    properties: {
        debug: {
            type: 'boolean'
        },
        useDefault: {
            type: 'boolean'
        },
        startTag: {
            type: 'string'
        },
        endTag: {
            type: 'string'
        },
    },
    additionalProperties: false
};


const defaultOptions = {
    debug: false,
    useDefault: false,
    startTag: '__{{',
    endTag: '}}__',
};

const defaultTemplate = `
    <template src="__{{{src.template}}}__">
    </template>

    <script lang="ts" src="__{{{src.ts}}}__">
    </script>

    <style scoped lang="scss" src="__{{{src.scss}}}__">
    </style>
`;

const getFileNameIfExists = (ressourcePath, type) => {
    let filePath = Object.assign({}, ressourcePath);
    filePath.ext = type;
    filePath.base = undefined;

    let fileName = path.format(filePath);
    console.debug('Filename: ' + JSON.stringify(filePath));
    console.debug('Filename: ' + fileName);
    if(fs.existsSync(fileName)) {
        return './' + filePath.name + filePath.ext;
    }

    return '';
};

module.exports = function (content) {

    let _this = this;
    let debug = function debug(message, obj) {
        if(options.debug) {
            console.debug();
            console.debug('***** ' + loaderName + ' ' + message + ' *****');
            console.debug('Resource: ' + _this.resourcePath);

            if(obj) {
                console.debug(obj);
            }
        }
    };

    _this.cacheable();

    let options = loaderUtils.getOptions(_this);
    options = Object.assign({}, defaultOptions, options);
    validateOptions(schema, options, loaderName);

    Mustache.tags = [options.startTag,options.endTag];

    let ressourcePath = path.parse(_this.resourcePath);
    let data = {
        context: _this.context,
        path: ressourcePath,
        src: {
            template: getFileNameIfExists(ressourcePath, '.vue.html'),
            ts: getFileNameIfExists(ressourcePath, '.ts'),
            scss: getFileNameIfExists(ressourcePath, '.scoped.scss'),
        }
    };


    let template = (options.useDefault || content.trim().length === 0) ? defaultTemplate : content;
    if(options.debug) {
        debug('template used', template);
    }
    content = Mustache.render(template, data);

    if(options.debug) {
        debug('result', content);
    }

    return content;
}