const load = require('@commitlint/load').default;
const read = require('@commitlint/read').default;
const lint = require('@commitlint/lint').default;
const format = require('@commitlint/format').default;

Promise.all([load(), read({from: 'HEAD~1'})])
    .then((tasks) => {
        const [{rules, parserPreset}, [commit]] = tasks;
        return lint(
            commit,
            rules,
            parserPreset ? {parserOpts: parserPreset.parserOpts } : {}
        );
    }).then((report)=> {
        if(report.valid) {
            console.log("commit-lint: good commit message");
            if(report.warnings && report.warnings.length>0) console.log(report.warnings);
            process.exit(0);
        }

        console.log("commit-lint: bad commit message");
        console.log(report.errors);
        process.exit(1);
});

