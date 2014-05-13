module.exports = function (opts, callback) {
  var collection = [];
  var startPage = opts.startPage;
  var perPage = opts.perPage;
  var request = opts.request;
  if (!startPage) {
    startPage = 0;
  }
  if (!perPage) {
    throw new Error('You must specify a number of items per page.');
  }
  if (!request) {
    throw new Error('You must provide a request function.');
  }
  var fetch = function (page) {
    request(page, perPage, function (err, chunk) {
      if (err) {
        callback(err);
      } else {
        collection = collection.concat(chunk);
        if (chunk.length < perPage) {
          callback(null, collection);
        } else {
          fetch(++page);
        }
      }
    });
  };
  fetch(startPage);
};

