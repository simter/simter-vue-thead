import test from 'ava'
import { descendantDepth } from '../src/thead.vue'

test('should be a function', t => {
  t.is(typeof descendantDepth, "function")
})

test('depth 0', t => {
  const obj = { label: "X0" }
  const depth = descendantDepth(obj)

  t.is(depth, 0)
  t.deepEqual(obj, { label: "X0", $_rowIndex: 0, $_depth: 0 })
})

test('depth 1', t => {
  const obj = { label: "X0", children: [{ label: "X1" }] }
  const depth = descendantDepth(obj)

  t.is(depth, 1)
  t.deepEqual(obj, {
    label: "X0", $_rowIndex: 0, $_depth: 1,
    children: [{ label: "X1", "$_rowIndex": 1, "$_depth": 0 }]
  })
})

test('depth 2', t => {
  const obj = {
    label: "X0",
    children: [
      {
        label: "X1",
        children: [
          { label: "X2" }
        ]
      }
    ]
  }
  const depth = descendantDepth(obj)

  t.is(depth, 2)
  t.deepEqual(obj, {
    label: "X0", $_rowIndex: 0, $_depth: 2,
    children: [
      {
        label: "X1", "$_rowIndex": 1, "$_depth": 1,
        children: [
          { label: "X2", "$_rowIndex": 2, "$_depth": 0 }
        ]
      }
    ]
  })
})