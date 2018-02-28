import test from 'ava'
import Vue from 'vue'
import thead, { deepClone } from '../src/thead.vue'

function createComponentInstance(propsData) {
  const Constructor = Vue.extend(thead)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm
}

test('no nested 1', t => {
  const origin = ["X1", "X2"]
  const columns = deepClone(origin)
  const vm = createComponentInstance({ columns })

  t.deepEqual(columns, origin, "columns property should not be changed")

  // verify container tag
  t.is(vm.$el.tagName, "THEAD")

  // verify tr, th tags
  const ths = vm.$el.querySelectorAll("tr > th");
  t.is(ths.length, columns.length)
  for (let i = 0; i < ths.length; i++) t.is(ths[i].textContent, columns[i])
})

test('no nested 2', t => {
  const origin = ["X1", { label: "X2" }]
  const columns = deepClone(origin)
  const vm = createComponentInstance({ columns })

  t.deepEqual(columns, origin, "columns property should not be changed")

  // verify container tag
  t.is(vm.$el.tagName, "THEAD")

  // verify tr, th tags
  const ths = vm.$el.querySelectorAll("tr > th");
  t.is(ths.length, columns.length)
  t.is(ths[0].textContent, columns[0])
  t.is(ths[0].getAttribute("rowspan"), null)
  t.is(ths[0].getAttribute("colspan"), null)
  t.is(ths[1].textContent, columns[1].label)
  t.is(ths[0].getAttribute("rowspan"), null)
  t.is(ths[0].getAttribute("colspan"), null)
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
  const columns = deepClone(origin)
  const vm = createComponentInstance({ columns })

  t.deepEqual(columns, origin, "columns property should not be changed")

  // verify container tag
  t.is(vm.$el.tagName, "THEAD")

  // verify tr tags
  const trs = vm.$el.children;
  t.is(trs.length, 2)
  for (const tr of trs) t.is(tr.tagName, "TR")

  // verify the first tr's ths tags
  let ths = trs[0].children
  t.is(ths.length, origin.length)
  t.is(ths[0].textContent, origin[0])
  t.is(ths[0].getAttribute("rowspan"), "2")
  t.is(ths[0].getAttribute("colspan"), null)
  t.is(ths[1].textContent, origin[1].label)
  t.is(ths[1].getAttribute("colspan"), "2")
  t.is(ths[1].getAttribute("rowspan"), null)

  // verify the second tr's ths tags
  ths = trs[1].children
  t.is(ths.length, origin[1].children.length)
  t.is(ths[0].textContent, origin[1].children[0])
  t.is(ths[0].getAttribute("rowspan"), null)
  t.is(ths[0].getAttribute("colspan"), null)
  t.is(ths[1].textContent, origin[1].children[1].label)
  t.is(ths[1].getAttribute("rowspan"), null)
  t.is(ths[1].getAttribute("colspan"), null)
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
  const columns = deepClone(origin)
  const vm = createComponentInstance({ columns })

  t.deepEqual(columns, origin, "columns property should not be changed")

  // verify container tag
  t.is(vm.$el.tagName, "THEAD")

  // verify tr tags
  const trs = vm.$el.children;
  t.is(trs.length, 3)
  for (const tr of trs) t.is(tr.tagName, "TR")

  // verify the first tr's ths tags
  let ths = trs[0].children
  t.is(ths.length, origin.length)
  t.is(ths[0].textContent, origin[0])
  t.is(ths[0].getAttribute("rowspan"), "3")
  t.is(ths[0].getAttribute("colspan"), null)
  t.is(ths[1].textContent, origin[1].label)
  t.is(ths[1].getAttribute("colspan"), "3")
  t.is(ths[1].getAttribute("rowspan"), null)

  // verify the second tr's ths tags
  ths = trs[1].children
  t.is(ths.length, origin[1].children.length)
  t.is(ths[0].textContent, origin[1].children[0])
  t.is(ths[0].getAttribute("rowspan"), "2")
  t.is(ths[0].getAttribute("colspan"), null)
  t.is(ths[1].textContent, origin[1].children[1].label)
  t.is(ths[1].getAttribute("colspan"), "2")
  t.is(ths[1].getAttribute("rowspan"), null)

  // verify the third tr's ths tags
  ths = trs[2].children
  t.is(ths.length, origin[1].children[1].children.length)
  t.is(ths[0].textContent, origin[1].children[1].children[0].label)
  t.is(ths[0].getAttribute("rowspan"), null)
  t.is(ths[0].getAttribute("colspan"), null)
  t.is(ths[1].textContent, origin[1].children[1].children[1])
  t.is(ths[1].getAttribute("rowspan"), null)
  t.is(ths[1].getAttribute("colspan"), null)
})