const express = require('express');
const Router = express.Router();
const request = require('superagent');
const cheerio = require('cheerio');
const _ = require('lodash');

const url = 'https://www.gutenberg.org/files/59036/59036-h/59036-h.htm';
//const url = 'https://www.youtube.com/watch?v=fCn8zs912OE';

async function fetch(url) {
  try {
    const response = await request.get(url);
    const responseBody = response.res.text;
    const $ = cheerio.load(responseBody);

    return $('body p')
      .remove('table')
      .remove('img')
      .remove('#footer')
      .remove('')
      .text()
      .trimLeft()
      .trimRight();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function processWords(url) {
  let textBody = await fetch(url);
  if (textBody !== null) {
    let words = textBody
      .replace(/(\.|,|:|\n|-)/gi, ' ')
      .replace(/(\'|\[|\])/gi, '')
      .split(' ')
      .filter(word => word.length !== 0)
      .map(word => word.toLowerCase());

    const data = words
      .map(word => {
        let count = 0;
        words.forEach(item => {
          if (item === word) {
            count++;
          }
        });
        return {
          word,
          count,
        };
      })
      .sort((a, b) => (a.count > b.count ? -1 : a.count < b.count ? 1 : 0));

    return _.uniqBy(data, 'word');
  } else {
    return null;
  }
}

Router.get('/', (req, res) => {
  res.sendStatus(200);
});

Router.post('/', async (req, res) => {
  let test = [];
  req.body.map(async url => {
    let result = processWords(url);
    if (result !== null) {
      test.push(result);
    }
  });

  let data = await Promise.all(test);
  res.send(data);
});

module.exports = Router;
