import test from 'ava'
import { polishing, deepClone } from '../src/thead.vue'

test('should be a function', t => {
  t.is(typeof polishing, "function")
})

test('no nested', t => {
  const origin = ["X1", { label: "X2" }]
  const clone = deepClone(origin)
  const target = polishing(clone)

  t.is(target, clone)
  t.deepEqual(target, [{ label: "X1" }, { label: "X2" }])
})

test('nested 1', t => {
  const origin = [
    "X1",
    {
      label: "X2",
      children: [
        "X21",
        { label: "X22" }
      ]
    }
  ]
  const clone = deepClone(origin)
  const target = polishing(clone)

  t.is(target, clone)
  t.deepEqual(target, [
    { label: "X1" },
    {
      label: "X2",
      children: [
        { label: "X21" },
        { label: "X22" }
      ]
    }
  ])
})

test('nested 2', t => {
  const origin = [
    "X1",
    {
      label: "X2",
      children: [
        "X21",
        {
          label: "X22",
          children: [
            { label: "X211" },
            "X212"
          ]
        }
      ]
    }
  ]
  const clone = deepClone(origin)
  const target = polishing(clone)

  t.is(target, clone)
  t.deepEqual(target, [
    { label: "X1" },
    {
      label: "X2",
      children: [
        { label: "X21" },
        {
          label: "X22",
          children: [
            { label: "X211" },
            { label: "X212" }
          ]
        }
      ]
    }
  ])
})