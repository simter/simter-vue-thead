import colgroup from 'simter-vue-colgroup'
import thead from '../src/thead.vue'

window.onload = function () {
  Vue.component('st-colgroup', colgroup)
  Vue.component('st-thead', thead)

  new Vue({
    el: "#demo",
    data: {
      simpleColumns: [
        { label: "X1", width: "100px" },
        { label: "X2", width: "100px" },
        { label: "X3", width: "100px" }
      ],
      complexColumns: [
        { label: "X1", width: "100px" },
        {
          label: "X2", width: "100px",
          children: [
            { label: "X21", width: "100px" },
            { label: "X22", width: "100px" }
          ]
        },
        { label: "X3", width: "100px" },
        {
          label: "X4", width: "100px",
          children: [
            {
              label: "X41", width: "100px",
              children: [
                { label: "X411", width: "100px" },
                { label: "X412", width: "100px" }
              ]
            },
            { label: "X42", width: "100px" }
          ]
        }
      ]
    }
  })
}