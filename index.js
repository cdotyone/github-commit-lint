const core = require('@actions/core');
const load = require('@commitlint/load').default;
const read = require('@commitlint/read').default;
const lint = require('@commitlint/lint').default;
const format = require('@commitlint/format').default;

let message = core.getInput('message');
if(!message) {
    console.error("commit-lint: bad commit message");
    console.error("message: is a required parameter");
    process.exit(1);
}

load({extends: ['./commitlint.config']}).then(({rules, parserPreset}) => {
    return lint(
        message,
        rules,
        parserPreset
    );
}).then((report)=> {

    console.log(JSON.stringify(report));
    if(report.valid) {
        console.log("commit-lint: good commit message");
        if(report.warnings && report.warnings.length>0) console.log(report.warnings);
        process.exit(0);
    }

    console.error("commit-lint: bad commit message");
    console.error(report.errors);
    process.exit(1);
});


