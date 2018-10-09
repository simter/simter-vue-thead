import Vue from 'vue'
import example1 from './example1.vue'
import example2 from './example2.vue'
import example3 from './example3.vue'
import example4 from './example4.vue'
import example5 from './example5.vue'
import example6 from './example6.vue'

new Vue({
  el: "#sample1",
  render: h => h(example1)
})

new Vue({
  el: "#sample2",
  render: h => h(example2)
})

new Vue({
  el: "#sample3",
  render: h => h(example3)
})

new Vue({
  el: "#sample4",
  render: h => h(example4)
})

new Vue({
  el: "#sample5",
  render: h => h(example5)
})

new Vue({
  el: "#sample6",
  render: h => h(example6)
})