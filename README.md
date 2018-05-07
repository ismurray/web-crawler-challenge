# Project: Web Crawler

By [Ian Murray](mailto:ismurray@bu.edu)

[ismurray.github.io](http://ismurray.github.io)

## Instructions

1. Navigate to [repo](https://github.com/ismurray/web-crawler-challenge)
2. Clone locally using
   `git clone git@github.com:ismurray/web-crawler-challenge.git`
3. Install dependencies using `npm install`
4. Run tests using `grunt test`
5. To see the output of the examples given in the challenge prompt, run
   `node ./lib/web-crawler`
6. Enjoy!


## Assumptions:
1. Even if a link has multiple duplicates, it should only be listed in the
   `skipped` array once.
  * Reasoning: In Example One, link `p4` has 2 duplicates, but is listed in the
    `Expected output` `skipped` array only once.
2. Since the output format was not explicitly given, I assumed returning the
   `success`, `skipped`, and `error` arrays as properties of a single plain old
   javascript object would be acceptable.

## Technologies used:
* JavaScript ES6
* Node
* Grunt
* Mocha
* Chai
