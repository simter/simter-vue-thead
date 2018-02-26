import test from 'ava'
import { deepClone } from '../src/thead.vue'

test('should be a function', t => {
  t.is(typeof deepClone, "function")
})

test('Array: no nested', t => {
  const origin = ["a", "b"]
  const actual = deepClone(origin)
  t.not(actual, origin)
  t.deepEqual(actual, origin)
})

test('Array: nested 1', t => {
  const origin = ["a", { id: "b" }]
  const actual = deepClone(origin)
  t.not(actual, origin)
  t.not(actual[1], origin[1])
  t.deepEqual(actual, origin)
})

test('Object: no nested', t => {
  const origin = { key: "v" }
  const actual = deepClone(origin)
  t.not(actual, origin)
  t.deepEqual(actual, origin)
})

test('Object: nested 1', t => {
  const origin = { key1: "v1", key2: { key21: "v21" } }
  const actual = deepClone(origin)
  t.not(actual, origin)
  t.not(actual.key2, origin.key2)
  t.deepEqual(actual, origin)
})