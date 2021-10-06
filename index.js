const core = require('@actions/core');
const lint = require('@commitlint/lint').default;
const config = require('./commitlint.config')
let message = core.getInput('message');
if(!message) {
    console.error("commit-lint: bad commit message");
    console.error("message: is a required parameter");
    process.exit(1);
}

lint(
    message,
    config.rules,
    config.prompt
).then((report)=> {
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


