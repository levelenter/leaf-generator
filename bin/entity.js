#!/usr/bin/env node 

require = require('esm')(module /*, オプション*/); 
require('../src/cli').cli(process.argv);
