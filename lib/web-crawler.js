'use strict'

const webCrawler = function (jsonWeb) {
  // Initialize an object to store the success, skipped, and error arrays
  const results = {
    success: [],
    skipped: [],
    error: []
  }
  // Initialize a queue to store links that haven't been checked yet for validity
  // or previous parsing
  const linkQueue = []
  // Start with the first page in the list of pages
  const firstPage = jsonWeb['pages'][0]
  // Add it's address to the list of successfull URLs
  results.success.push(firstPage['address'])
  // Add all of the first page's links to the queue
  firstPage['links'].forEach(function (url) {
    linkQueue.push(url)
  })
  // until the queue is empty do:
  while (linkQueue.length > 0) {
    // shift the first address off the queue into variable currentUrl
    const currentUrl = linkQueue.shift()
    // `query the internet` for the currentURL: will be `undefined` if it's invalid
    const validUrl = jsonWeb.pages.find((page) => page.address === currentUrl)
    // if currentURL is valid, and it's not already in the success list:
    if (validUrl !== undefined &&
        results.success.indexOf(currentUrl) === -1) {
      // add the URL to the success list
      results.success.push(currentUrl)
      // and parse the page for links, adding them to back of queue
      validUrl.links.forEach(function (url) {
        linkQueue.push(url)
      })
    // elsif the url but is already on the success list do:
    } else if (validUrl !== undefined) {
      // If currentURL is not already in skipped array, add it to that list
      if (results.skipped.indexOf(currentUrl) === -1) {
        results.skipped.push(currentUrl)
      }
    // If URL not valid, add it to error array
    } else {
      results.error.push(currentUrl)
    }
  }
  // return results object containing the three populated arrays
  return results
}

// the first set of example data
const internetOne = {
  "pages": [
    {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5", "http://foo.bar.com/p1", "http://foo.bar.com/p6"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": []
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p7", "http://foo.bar.com/p4", "http://foo.bar.com/p5"]
    }
  ]
}

// the second set of example data
const internetTwo = {
  "pages": [
      {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p3"]
    },
    {
      "address":"http://foo.bar.com/p3",
      "links": ["http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": ["http://foo.bar.com/p1"]
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p1"]
    }
  ]
}

console.log('The results of the first example are:\n', webCrawler(internetOne))
console.log('The results of the second example are:\n', webCrawler(internetTwo))

// Used by testing
module.exports = webCrawler
