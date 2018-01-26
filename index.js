'use strict'

const _ = require('lodash')

const a = {
  b : {
    c: {
      d: undefined
    },
  },
  e : {
    f: undefined,
  },
  g : {
    h: {
      i: 'hoge',
    },
  },
}

const isPrimitive = x => typeof x !== 'object'

/**
 * {} を判定すれば良いはず? => x
 * @param {*} x 
 */
const isEmptyDeep = x => {
  if (x === undefined) {
    return true
  }
  Object.values(x)
    .filter(v => {
      if (typeof v === 'object') {
        return isEmptyDeep(v)
      }
    })
  return Object.keys(x).length === 0
}

/**
 * ネスト要素を含めてemptyまたはundefinedのkeyを削除します
 * 空文字はemptyと判定しません
 *
 * @param x
 */
const omitEmptyDeep = x => {
  if (isPrimitive(x)) {
      console.log('p:', x)
      return x;
  }

  console.log('o', x)
  console.log(_.mapValues(x, omitEmptyDeep))
  return _.isArray(x) ?
      _.map(_.reject(x, isEmptyDeep), omitEmptyDeep) :
      _.mapValues(_.omitBy(x, isEmptyDeep), omitEmptyDeep);
};

console.log(omitEmptyDeep(a))