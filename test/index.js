const getAll = require('../');
const GH = require('github');
const github = new GH({version: "3.0.0"});
const expect = require('chai').expect;

describe('getAll', function () {
  this.timeout(10000);
  it('should get all results from a paged API', function (done) {
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
      page: 0,
      perPage: 30,
      request: myRequestFn
    }, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        expect(results.length).to.be.above(30);
        done();
      }
    });
  });

});
