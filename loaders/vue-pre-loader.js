
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
    <template src="./__{{path.name}}__.html">
    </template>

    <script lang="ts" src="./__{{path.name}}__.ts">
    </script>

    <style scoped lang="scss" src="./__{{path.name}}__.scoped.scss">
    </style>
`;

const defaultFlag = '<vue-pre-default/>';

module.exports = function (content) {

    let _this = this;
    let debug = function debug(message, ...other) {
        if(options.debug) {
            console.debug();
            console.debug('***** ' + loaderName + ' ' + message + ' *****');
            console.debug('Resource: ' + _this.resourcePath);

            if(other) {
                other.forEach(console.debug);
            }
        }
    };

    _this.cacheable();

    let options = loaderUtils.getOptions(_this);
    options = Object.assign({}, defaultOptions, options);
    validateOptions(schema, options, loaderName);

    Mustache.tags = [options.startTag,options.endTag];

    let data = {
        context: _this.context,
        path: path.parse(_this.resourcePath)
    };

    let template = (options.useDefault || content === defaultFlag) ? defaultTemplate : content;
    if(options.debug) {
        debug('template used', template);
    }
    content = Mustache.render(template, data);

    if(options.debug) {
        debug('result', content);
    }

    return content;
}