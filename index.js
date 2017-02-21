const exec = require('child_process').exec;
const path = require('path');

module.exports = function(source) {
  var callback = this.async();
  const tmp = path.join(__dirname, 'tmp');
  const mod = path.basename(this.resourcePath, '.exjs');
  const cmd = `elixirscript '${source.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}' --elixir -o '${tmp}'`;

  exec(cmd, function (error, stdout, stderr) {
    if (error) {
      return callback(error, null);
    }
    const out = `import ${mod} from '${path.join(tmp, 'app', `Elixir.${mod}.js`)}'; export default ${mod};`
    return callback(null, out);
  });
};
