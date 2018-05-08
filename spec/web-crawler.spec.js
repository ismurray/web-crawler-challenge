'use strict'

// Allow chai syntax like `expect(foo).to.be.ok;`

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

const webCrawler = require('../lib/web-crawler')

describe('Web Crawler Example Internet One', function () {
  const internetOne = {
    'pages': [
      {
        'address': 'http://foo.bar.com/p1',
        'links': ['http://foo.bar.com/p2', 'http://foo.bar.com/p3', 'http://foo.bar.com/p4']
      },
      {
        'address': 'http://foo.bar.com/p2',
        'links': ['http://foo.bar.com/p2', 'http://foo.bar.com/p4']
      },
      {
        'address': 'http://foo.bar.com/p4',
        'links': ['http://foo.bar.com/p5', 'http://foo.bar.com/p1', 'http://foo.bar.com/p6']
      },
      {
        'address': 'http://foo.bar.com/p5',
        'links': []
      },
      {
        'address': 'http://foo.bar.com/p6',
        'links': ['http://foo.bar.com/p7', 'http://foo.bar.com/p4', 'http://foo.bar.com/p5']
      }
    ]
  }

  const results = webCrawler(internetOne)

  describe('returns the right success URLs', function () {
    it('returns the right number of success URLs', function () {
      expect(results).to.have.property('success').with.lengthOf(5)
    })
    it('includes URL p1 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p1')).to.not.equal(-1)
    })
    it('includes URL p2 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p2')).to.not.equal(-1)
    })
    it('includes URL p4 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p4')).to.not.equal(-1)
    })
    it('includes URL p5 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p5')).to.not.equal(-1)
    })
    it('includes URL p6 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p6')).to.not.equal(-1)
    })
  })

  describe('returns the right skipped URLs', function () {
    it('returns the right number of skipped URLs', function () {
      expect(results).to.have.property('skipped').with.lengthOf(4)
    })
    it('includes URL p2 in the skipped array', function () {
      expect(results.skipped.indexOf('http://foo.bar.com/p2')).to.not.equal(-1)
    })
    it('includes URL p4 in the skipped array', function () {
      expect(results.skipped.indexOf('http://foo.bar.com/p4')).to.not.equal(-1)
    })
    it('includes URL p1 in the skipped array', function () {
      expect(results.skipped.indexOf('http://foo.bar.com/p1')).to.not.equal(-1)
    })
    it('includes URL p5 in the skipped array', function () {
      expect(results.skipped.indexOf('http://foo.bar.com/p5')).to.not.equal(-1)
    })
  })

  describe('returns the right errors', function () {
    it('returns the right number of error URLs', function () {
      expect(results).to.have.property('error').with.lengthOf(2)
    })
    it('includes URL p7 in the error array', function () {
      expect(results.error.indexOf('http://foo.bar.com/p7')).to.not.equal(-1)
    })
    it('includes URL p3 in the error array', function () {
      expect(results.error.indexOf('http://foo.bar.com/p3')).to.not.equal(-1)
    })
  })
})

describe('Web Crawler Example Internet Two', function () {
  const internetTwo = {
    'pages': [
      {
        'address': 'http://foo.bar.com/p1',
        'links': ['http://foo.bar.com/p2']
      },
      {
        'address': 'http://foo.bar.com/p2',
        'links': ['http://foo.bar.com/p3']
      },
      {
        'address': 'http://foo.bar.com/p3',
        'links': ['http://foo.bar.com/p4']
      },
      {
        'address': 'http://foo.bar.com/p4',
        'links': ['http://foo.bar.com/p5']
      },
      {
        'address': 'http://foo.bar.com/p5',
        'links': ['http://foo.bar.com/p1']
      },
      {
        'address': 'http://foo.bar.com/p6',
        'links': ['http://foo.bar.com/p1']
      }
    ]
  }
  const results = webCrawler(internetTwo)

  describe('returns the right success URLs', function () {
    it('returns the right number of success URLs', function () {
      expect(results).to.have.property('success').with.lengthOf(5)
    })
    it('includes URL p1 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p1')).to.not.equal(-1)
    })
    it('includes URL p2 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p2')).to.not.equal(-1)
    })
    it('includes URL p3 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p3')).to.not.equal(-1)
    })
    it('includes URL p4 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p4')).to.not.equal(-1)
    })
    it('includes URL p5 in the success array', function () {
      expect(results.success.indexOf('http://foo.bar.com/p5')).to.not.equal(-1)
    })
  })

  describe('returns the right skipped URLs', function () {
    it('returns the right number of skipped URLs', function () {
      expect(results).to.have.property('skipped').with.lengthOf(1)
    })
    it('includes URL p1 in the skipped array', function () {
      expect(results.skipped.indexOf('http://foo.bar.com/p1')).to.not.equal(-1)
    })
  })

  describe('returns the right errors', function () {
    it('returns the right number of error URLs', function () {
      expect(results).to.have.property('error').with.lengthOf(0)
    })
  })
})
