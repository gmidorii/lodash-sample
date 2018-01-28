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
 * undefined or 空オブジェクトの場合falseにすれば良いはず
 * @param {*} x 
 */
const isEmptyDeep = x => {
  if (typeof x === 'object') {
    return false
  }
  if (x === undefined) {
    return true
  }
  if (Object.values(x).length === 0) {
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

  // Object or Array
  return _.isArray(x) ?
      _.map(_.reject(x, isEmptyDeep), omitEmptyDeep) :
      _.mapValues(_.omitBy(x, isEmptyDeep), omitEmptyDeep);
};

console.log(omitEmptyDeep(a))