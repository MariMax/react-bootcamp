const loremIpsum = require('lorem-ipsum');
const v4 = require('uuid').v4;

export const listData = (categoryId) => [...(new Array(30)).keys()].map((_, i) => ({
  title: v4(),
  description: loremIpsum({
    count: 1,
    units: 'sentences',
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
    format: 'plain',
    random: Math.random,
  }),
  id: v4(),
  categoryId,
  done: Math.random() > .5,
}));