/* eslint-disable no-console */
const nodemon = require('nodemon');
const { exec } = require('child_process');

nodemon('--exec "echo Starting app" --watch ./src/server');

const getProcess = cmd => {
  const _process = exec(cmd);
  _process.stdout.on('data', data => {
    console.log(data);
  });

  _process.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });

  if (cmd.indexOf('babel') === -1) {
    _process.on('exit', code => {
      console.log(`Process "${cmd}" exited with code ${code}`);
    });
  }

  return _process;
};

const run = async () => {
  return new Promise(res => res(getProcess('npm run runserver')));
};

const buildRun = async () => {
  const _build = getProcess('npm run build-server');
  await new Promise((res, rej) => {
    _build.addListener('error', rej);
    _build.addListener('exit', res);
  });
  return run();
};

let _run = buildRun();
(async () => console.log('PID ==> ', (await _run).pid))();

let counter = 1;
nodemon
  .on('start', () => {})
  .on('quit', async () => {
    console.log('Killing all process!');
    await exec('npm run stop');
  })
  .on('restart', async files => {
    console.log(`Running restart [${counter}]`);
    counter += 1;
    console.log('App restarted due to: ', files);
    await Promise.all(
      files.map(async file => {
        return new Promise(res =>
          res(
            getProcess(
              `npx babel ${file} --out-dir ${file.replace('/src/', '/lib/')}`
            )
          )
        );
      })
    );
    (await _run).kill();
    _run = run();
  });
