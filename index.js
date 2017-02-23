const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  const callback = this.async();
  const tmp = path.join(__dirname, 'tmp');
  const cmd = `elixirscript '${this.context}' -o '${tmp}'`;
  child_process.execSync(`rm -rf ${tmp}`);

  child_process.exec(cmd, function (error, stdout, stderr) {
    if (error) { return callback(error, null); }
    const out = fs.readFileSync(path.join(tmp, 'Elixir.App.js'), 'utf8')
                  .replace(/import ([a-z]+) from '\.\//gi, `import $1 from '${tmp}/`)
                  .replace(/Elixir\.Enum\.member__qmark__/g, 'Bootstrap.Enum.member__qmark__');
    callback(null, out);
  });
};
