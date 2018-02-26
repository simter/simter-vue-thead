import test from 'ava'
import { transform, deepClone } from '../src/thead.vue'

test('should be a function', t => {
  t.is(typeof transform, "function")
})

test('no nested 1', t => {
  const columns = ["X1", "X2"]
  const rows = transform(columns)

  t.deepEqual(rows, [
    [{ label: "X1" }, { label: "X2" }]
  ])
})

test('no nested 2', t => {
  const columns = ["X1", { label: "X2" }]
  const rows = transform(columns)

  t.deepEqual(rows, [
    [{ label: "X1" }, { label: "X2" }]
  ])
})

test('nested 1-1', t => {
  const columns = [
    "X1",
    {
      label: "X2",
      children: [
        "X21",
        { label: "X22" }
      ]
    }
  ]
  const rows = transform(columns)
  //console.log(JSON.stringify(rows))

  t.deepEqual(rows, [
    [
      { label: "X1", rowspan: 2 },
      { label: "X2", colspan: 2 }
    ],
    [
      { label: "X21" },
      { label: "X22" }
    ]
  ])
})

test('nested 1-2', t => {
  const columns = [
    "X1",
    {
      label: "X2",
      children: [
        "X21",
        { label: "X22" }
      ]
    },
    {
      label: "X3",
      children: [
        "X31",
        { label: "X32" }
      ]
    }
  ]
  const rows = transform(columns)
  //console.log(JSON.stringify(rows))

  t.deepEqual(rows, [
    [
      { label: "X1", rowspan: 2 },
      { label: "X2", colspan: 2 },
      { label: "X3", colspan: 2 }
    ],
    [
      { label: "X21" },
      { label: "X22" },
      { label: "X31" },
      { label: "X32" }
    ]
  ])
})

test('nested 2-1', t => {
  const columns = [
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
  const rows = transform(columns)
  //console.log(JSON.stringify(rows))

  t.deepEqual(rows, [
    [
      { label: "X1", rowspan: 3 },
      { label: "X2", colspan: 3 }
    ],
    [
      { label: "X21", rowspan: 2 },
      { label: "X22", colspan: 2 }
    ],
    [
      { label: "X211" },
      { label: "X212" }
    ]
  ])
})

test('nested 2-2', t => {
  const columns = [
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
  const rows = transform(columns)
  //console.log(JSON.stringify(rows))

  t.deepEqual(rows, [
    [
      { label: "X1", rowspan: 3 },
      { label: "X2", colspan: 3 }
    ],
    [
      { label: "X21", rowspan: 2 },
      { label: "X22", colspan: 2 }
    ],
    [
      { label: "X211" },
      { label: "X212" }
    ]
  ])
})