const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  const callback = this.async();
  const tmp = path.join(__dirname, 'tmp');
  const mod = path.basename(this.resourcePath, '.exjs');
  const cmd = `elixirscript '${this.context}' -o '${tmp}'`;
  child_process.execSync(`rm -rf ${tmp}`);

  child_process.exec(cmd, function (error, stdout, stderr) {
    if (error) { return callback(error, null); }
    const out = fs.readFileSync(path.join(tmp, 'app', `Elixir.${mod}.js`), 'utf8')
      .replace(/from '\.\.\/elixir\//g, `from '${tmp}/elixir/`)
      .replace(/from '\.\.\/app\//g, `from '${tmp}/app/`);
    callback(null, out);
  });
};

