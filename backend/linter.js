var _ = require("lodash");
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));

var Checker = require("jscs");
function initChecker() {
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
  return checker;
}


var express = require('express');
var app = express();

app.get('/paths', function(req, res) {
  var user = req.query['user'];
  var repo = req.query['repo'];
  request.getAsync({
    url: 'https://api.github.com/repos/' + user + '/' + repo + '/git/trees/master?recursive=1',
    headers: {
      'User-Agent': 'request'
    }
  }).then(function(response) {
    console.log('Getting ghPath list for: ' + user + '/' + repo);
    var result = _(JSON.parse(response.body)['tree'])
      .map(function(file) {
        return user + '/' + repo + '/master/' + file['path'];
      })
      .filter(function(ghPath) {
        return ghPath.split('.').pop() === 'js';
      });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  });
})

app.get('/lint', function (req, res) {
  var ghPath = req.query['ghpath'];
  request.getAsync('https://raw.githubusercontent.com/' + ghPath)
    .then(function(response) {
      console.log('Linting: ' + ghPath)
      var checker = initChecker();
      var code = response.body;
      var results = checker.checkString(code, ghPath);
      var errors = results.getErrorList();


      var result = {
        code: code,
        errors: errors,
      };

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result));
    })
    .catch(function(err) {
      console.log("Error: " + JSON.stringify(err));
    });
});

app.listen(3000, function () {
  console.log('Repo file ls on localhost:3000/paths?user=username&repo=reponame');
  console.log('Linter on localhost:3000/lint?ghPath=username/reponame/branch/filepath...');
});

