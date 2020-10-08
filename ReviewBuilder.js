const fs = require("fs");
const { resolve } = require("path");
const { readFile, produceResult } = require("./helpers");
const result = require("./test/fixtures/result");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    return Promise.all([
      readFile("./data/products.json"),
      readFile("./data/reviews.json"),
      readFile("./data/users.json"),
    ]).then((all) => {
      const obj = {
        products: all[0],
        reviews: all[1],
        users: all[2],
      };
      return produceResult(obj);
    });
  }

  /*
  {
    productName: product.name,
    username: user.username,
    text: review.text,
    rating: review.rating
}

  */
  /*
  function getData(fileName, type) {
    return new Promise(function(resolve, reject){
      fs.readFile(fileName, type, (err, data) => {
          err ? reject(err) : resolve(data);
      });
*/
  async buildReviewsAsyncAwait() {
    // FIXME
  }
}

module.exports = ReviewBuilder;
