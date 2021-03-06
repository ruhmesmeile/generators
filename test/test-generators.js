
var path = require('path'),
  events = require('events'),
  assert = require('assert'),
  grunt = require('grunt'),
  generators = require('..');

describe('Generators', function() {
  before(generators.test.before(path.join(__dirname, 'temp')));

  describe('yeoman.generators', function() {
    it('should have a Base object to extend from', function() {
      assert.ok(generators.Base);
    });

    it('should have a NamedBase object to extend from', function() {
      assert.ok(generators.NamedBase);
    });
  });

  describe('yeoman.generators.Base', function() {
    before(function() {
      this.generator = new generators.Base();
    });

    it('should be an EventEmitter', function(done) {
      assert.ok(this.generator instanceof events.EventEmitter);
      assert.ok(typeof this.generator.on === 'function');
      assert.ok(typeof this.generator.emit === 'function');
      this.generator.on('yay-o-man', done);
      this.generator.emit('yay-o-man');
    });
  });

  describe('yeoman.generators.NamedBase', function() {
    before(function() {
      this.generator = new generators.NamedBase(['namedArg']);
    });

    it('should be a Base generator', function() {
      assert.ok(this.generator instanceof generators.Base);
    });

    it('and it should have a name property', function() {
      assert.equal(this.generator.name, 'namedArg');
    });
  });

  describe('yeoman.generators.prepare', function() {

    before(function() {
      grunt.cli.tasks = ['init', 'generatorname', 'some', 'args'];
      grunt.cli.options = {
        foo: 'bar',
        bar: 'baz'
      };

      generators.prepare(grunt);

      this.tasks = grunt.cli.tasks;
      this.options = grunt.cli.options;
    });

    it('should parse out grunt.cli for arguments and options', function() {
      assert.deepEqual(generators.args, ['some', 'args']);
    });


    it('should setup the invoked generator name from arguments', function() {
      assert.equal(generators.name, 'generatorname');
    });

    it('should setup the hash options from grunt.cli.options', function() {
      assert.deepEqual(generators.options, {
        foo: 'bar',
        bar: 'baz'
      });
    });

    it('should prefix each positional arguments with `init:`', function() {
      assert.deepEqual(this.tasks, ['init:yeoman', 'init:generatorname', 'init:some', 'init:args']);
    });

    it('and turn off the internal grunt help output', function() {
      assert.equal(this.options.help, false);
      assert.equal(typeof generators.options.help, 'undefined');
    });
  });

  //
  // Comment out this step. To be re-added when the generators test suite is
  // moved to its repo. Mainly because of prompt now in app generator, should
  // be tested by the global test-build.js suite with the Runnable helper.

  // describe('yeoman.generators.init', function() {

  //   before(function(done) {
  //     yeoman.generators.name = 'app';
  //     yeoman.generators.args = ['.test'];
  //     this.cwd = process.cwd();
  //     this.generator = yeoman.generators.init(grunt);
  //     this.generators = yeoman.generators;
  //     assert.ok(this.generator, 'init app should return the specified generator');
  //     this.generator.on('end', done);
  //   });

  //   it('should setup the current working directory property', function() {
  //     assert.equal(this.generators.cwd, this.cwd);
  //   });

  //   it('should find Gruntfile throughout the file tree');
  //   it('should setup the base property and cd into that directory');
  //   it('should try to locate installed yeoman plugins');
  //   it('should ouptut help when no generator name is given');
  // });

  describe('yeoman.generators.help', function() {
    it('should output according help / usage');
  });

  describe('yeoman.generators.printList', function() {
    it('should output according help / usage');
  });

  describe('yeoman.generators.invoke', function() {
    it('should output the list of paths lookup on invalid generator');
    it('should output generator specific help on --help');
    it('should create, invoke and run the specified generator');
  });

  describe('yeoman.generators.create', function() {
    it('should return undefined on invalid generators');
    it('should properly create the specified generator');
    it('should have namespace information attached');
    it('should have name / path information attached');
    it('should have hooks registered created and available as `_hooks`');
  });

  describe('yeoman.generators.findByNamespace', function() {
    it('should do the necessary lookup and return specified generator');
  });

  describe('yeoman.generators.lookup', function() {
    it('should do the necessary lookup and return specified generator');
  });

  describe('yeoman.generators.lookupHelp', function() {
    it('should load any generator in the load path and return an array of generators');
  });

  describe('yeoman.generators.namespacesToPaths', function() {
    it('should convert namespaces to paths by replacing ":" for "/"');
  });

});
