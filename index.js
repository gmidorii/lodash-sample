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
   const y = Object.values(x)
   if (y.length === 0) {
     return true
   }
   if (y.filter(z => z !== undefined).length === 0) {
     return true
   }
   return false
}

/**
 * ネスト要素を含めてemptyまたはundefinedのkeyを削除します
 * 空文字はemptyと判定しません
 *
 * @param x
 */
const omitEmptyDeep = x => {
  if (isPrimitive(x)) {
      return x;
  }

  return _.isArray(x) ?
      _.map(_.reject(x, isEmptyDeep), omitEmptyDeep) :
      _.mapValues(_.omitBy(x, isEmptyDeep), omitEmptyDeep);
};

console.log(omitEmptyDeep(a))