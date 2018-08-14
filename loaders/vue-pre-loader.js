
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

const defaultSections = {

    template: {
        lang: 'html',
        src: `
            <template src="__{{{sections.template.src}}}__">
            </template>`,
        ext: '.vue.html',
    },

    script: {
        lang: 'ts',
        src: `
            <script lang="__{{{sections.script.lang}}}__" src="__{{{sections.script.src}}}__">
            </script>`,
        ext: '.ts',
    },

    style: {
        lang: 'scss',
        src: `
            <style scoped lang="__{{{sections.style.lang}}}__" src="__{{{sections.style.src}}}__">
            </style>`,
        ext: '.scss',
    }
};

const processSection = (resourcePath, section) => {
    let filePath = Object.assign({}, resourcePath);
    filePath.ext = section.ext;
    filePath.base = undefined;

    let fileName = path.format(filePath);
    let sectionInfo = {
        lang: '',
        src: '',
        fileExists: fs.existsSync(fileName),
    };
    if(sectionInfo.fileExists) {
        sectionInfo.src = './' + filePath.name + filePath.ext;
        sectionInfo.lang = section.lang;
    }

    return sectionInfo;
};

module.exports = function (content) {

    this.cacheable();

    let options = loaderUtils.getOptions(this);
    options = Object.assign({}, defaultOptions, options);
    validateOptions(schema, options, loaderName);

    Mustache.tags = [options.startTag,options.endTag];

    let resourcePath = path.parse(this.resourcePath);

    let mustacheData = {
        path: resourcePath,
        sections: {},
    };

    Object.keys(defaultSections).forEach( (key) => {

        let section = defaultSections[key];

        // TODO extract lang attribute from section if present, to provide customization and use it as extension
        let regExp = new RegExp('<\\s*' + key + '[^>]*>([\\S\\s]*?)<\\s*\\/\\s*' + key + '>');
        let sectionInfo = processSection(resourcePath, section);

        if(sectionInfo.fileExists) {
            if(!regExp.test(content)) {
                content += defaultSections[key].src;
            }
            mustacheData.sections[key] = sectionInfo;
        }
    });

    let result = Mustache.render(content, mustacheData);

    return result;
}