var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));

var Checker = require("jscs");
var checker = new Checker();
checker.registerDefaultRules();

// Configure the checker with an options object
checker.configure({
    "requireCurlyBraces": [
        "if",
        "else",
        "for"
    ]
});

// Use the jQuery preset
checker.configure({
    preset: "jquery"
});

// Use the Google preset, but override or remove some options
checker.configure({
    preset: "google",
    disallowMultipleLineBreaks: null, // or false
    validateIndentation: "\t"
});


var express = require('express');
var app = express();

app.get('/lint', function (req, res) {
  var ghPath = req.query['ghpath'];
  request.getAsync('https://raw.githubusercontent.com/' + ghPath)
    .then(function(response) {
      console.log('Linting: ' + ghPath)
      var code = response.body;
      var results = checker.checkString(code);
      var errors = results.getErrorList();


      var result = {
        code: code,
        errors: errors,
      };

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result));

      //console.log(results.getErrorList())

      //results.getErrorList().forEach(function(error) {
      //var colorizeOutput = true;
      //console.log(results.explainError(error, colorizeOutput) + "\n");
      //});
    })
    .catch(function(err) {
      console.log("Error: " + JSON.stringify(err));
    });
});

app.listen(3000, function () {
  console.log('Linter listening on localhost:3000/lint!');
});

