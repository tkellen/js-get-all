module.exports = function (opts, callback) {
  var collection = [];
  var page = opts.page;
  var perPage = opts.perPage;
  var request = opts.request;
  if (!page) {
    page = 0;
  }
  if (!perPage) {
    perPage = 100;
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
  fetch(page);
};

