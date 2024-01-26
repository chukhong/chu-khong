var {minify} = require('minify')
var {tryToCatch} = require('try-to-catch')
const options = {
    html: {
        removeAttributeQuotes: false,
        removeOptionalTags: false,
    },
};
async function build(params) {
    
    const [error, data] = await tryToCatch(minify, './dialog-result-search-word.js', options);
    
    if (error)
    return console.error(error.message);

    console.log(data);
}
build()