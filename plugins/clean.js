import rimraf from "rimraf";
export default class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('CleanPlugin', (compilation, callback) => {
      console.log(compiler.options.output.path);
      return new Promise((resolve, reject) =>
        rimraf(compiler.options.output.path, {
          glob: {
            nosort: true,
            dot: true,
            ignore: ['build/.git']
          }
        }, (err, result) =>
          err ? reject(err) : resolve(result),
        ),
      );
    });
  }
}