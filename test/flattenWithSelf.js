import test from 'ava'
import { flattenWithSelf } from '../src/thead.vue'

test('should be a function', t => {
  t.is(typeof flattenWithSelf, "function")
})

test('no nested', t => {
  const origin = ["X1", "X2"]
  const flatten = flattenWithSelf(origin)
  t.deepEqual(flatten, origin)
})

test('nested 1 and remove children', t => {
  const origin = [{ label: "X1", children: [{ label: "X11" }, { label: "X12" }] }]
  const flatten = flattenWithSelf(origin)
  //console.log(JSON.stringify(flatten))
  t.deepEqual(flatten, [
    { label: "X1" },
    { label: "X11" },
    { label: "X12" }
  ])
})

test('nested 1 and not remove children', t => {
  const origin = [{ label: "X1", children: [{ label: "X11" }, { label: "X12" }] }]
  const flatten = flattenWithSelf(origin, false)
  //console.log(JSON.stringify(flatten))
  t.deepEqual(flatten, [
    { label: "X1", children: [{ label: "X11" }, { label: "X12" }] },
    { label: "X11" },
    { label: "X12" }
  ])
})

test('nested 2 and remove children', t => {
  const origin = [
    {
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
    },
    { label: "X2" }
  ]
  const flatten = flattenWithSelf(origin, true)
  //console.log(JSON.stringify(flatten))
  t.deepEqual(flatten, [
    { label: "X1" },
    { label: "X11" },
    { label: "X12" },
    { label: "X121" },
    { label: "X122" },
    { label: "X2" }
  ])
})

test('nested 2 and not remove children', t => {
  const origin = [
    {
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
    },
    { label: "X2" }
  ]
  const flatten = flattenWithSelf(origin, false)
  //console.log(JSON.stringify(flatten))
  t.deepEqual(flatten, [
    {
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
    },
    { label: "X11" },
    { label: "X12", "children": [{ "label": "X121" }, { "label": "X122" }] },
    { label: "X121" },
    { label: "X122" },
    { label: "X2" }
  ])
})