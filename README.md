# get-all [![Build Status](https://secure.travis-ci.org/tkellen/node-get-all.png?branch=master)](http://travis-ci.org/tkellen/node-get-all)
> Get all results from a paged API.

[![NPM](https://nodei.co/npm/get-all.png)](https://nodei.co/npm/get-all/)

## Example
```js
const getAll = require('get-all');
const GH = require('github');
const github = new GH({version: "3.0.0"});

var myRequestFn = function (page, perPage, callback) {
  github.repos.getFromOrg({
    org: 'github',
    page: page
  }, function (err, repos) {
    if (err) {
      callback(err);
    } else {
      callback(null, repos);
    }
  })
};

getAll({
  startPage: 0,
  perPage: 30,
  request: myRequestFn
}, function (err, results) {
  if (err) {
    console.log(err);
  } else {
    console.log('The github org has '+results.length+' public repos.');
  }
});
```

## Release History

* 2014-05-12 - v0.2.0 - require perPage, rename page to startPage
* 2014-05-12 - v0.1.0 - initial release
