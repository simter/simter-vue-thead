import test from 'ava'
import { leafCount } from '../src/thead.vue'

test('should be a function', t => {
  t.is(typeof leafCount, "function")
})

test('leaf count should be 1', t => {
  const obj = { label: "X0" }
  const count = leafCount(obj)

  t.is(count, 1)
  t.deepEqual(obj, { label: "X0" })
})

test('leaf count should be 2', t => {
  const obj = { label: "X1", children: [{ label: "X11" }, { label: "X12" }] }
  const count = leafCount(obj)

  t.is(count, 2)
  t.deepEqual(obj, {
    label: "X1", colspan: 2,
    children: [{ label: "X11" }, { label: "X12" }]
  })
})

test('leaf count should be 3', t => {
  const obj = {
    label: "X1",
    children: [
      { label: "X11" },
      {
        label: "X12",
        children: [
          { label: "X121" },
          { label: "X122" }
        ]
      }
    ]
  }
  const count = leafCount(obj)

  t.is(count, 3)
  t.deepEqual(obj, {
    label: "X1",
    colspan: 3,
    children: [
      { label: "X11" },
      {
        label: "X12",
        colspan: 2,
        children: [
          { label: "X121" },
          { label: "X122" }
        ]
      }
    ]
  })
})