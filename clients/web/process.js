const exec = require('await-exec')

const run = async (cmd, cwd) => {
    const { stdout, stderr } = await exec(cmd, {cwd});
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
}

const myArgs = process.argv.slice(2);

const doIt = async () => {
    const apps = [ 'admin', 'base-app', 'general-layout' ];
    for (const app of apps ) {
        console.log(`In app ${app}`);
        await run(myArgs[0], app);
    }
}
doIt().then();


