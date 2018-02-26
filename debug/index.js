import colgroup from 'simter-vue-colgroup'
import thead from '../src/thead.vue'

window.onload = function () {
  new Vue({
    el: "#sample1",
    data: {
      columns: [
        { label: "X1" },
        { label: "X2" },
        { label: "X3" }
      ]
    },
    components: {
      "st-thead": thead
    }
  });

  new Vue({
    el: "#sample-nested-1-1",
    data: {
      columns: [
        { label: "X1" },
        {
          label: "X2",
          children: [
            { label: "X21" },
            { label: "X22" }
          ]
        },
        { label: "X3" }
      ]
    },
    components: {
      "st-thead": thead
    }
  });

  new Vue({
    el: "#sample-nested-1-2",
    data: {
      columns: [
        { label: "X1" },
        {
          label: "X2",
          children: [
            { label: "X21" },
            { label: "X22" }
          ]
        },
        {
          label: "X3",
          children: [
            { label: "X31" },
            { label: "X32" }
          ]
        }
      ]
    },
    components: {
      "st-thead": thead
    }
  });

  new Vue({
    el: "#sample-nested-2",
    data: {
      columns: [
        { label: "X1" },
        {
          label: "X2",
          children: [
            { label: "X21" },
            {
              label: "X22",
              children: [
                { label: "X221" },
                "X222"
              ]
            }
          ]
        },
        { label: "X3" }
      ]
    },
    components: {
      "st-thead": thead
    }
  });

  new Vue({
    el: "#sample-complex-1",
    data: {
      columns: [
        { label: "X1", width: "100px" },
        {
          label: "X2",
          children: [
            { label: "X21", width: "100px" },
            { label: "X22", width: "100px" }
          ]
        },
        { label: "X3", width: "100px" },
        {
          label: "X4",
          children: [
            {
              label: "X41",
              children: [
                { label: "X411", width: "150px" },
                { label: "X412", width: "150px" }
              ]
            },
            { label: "X42", width: "100px" }
          ]
        }
      ]
    },
    components: {
      "st-colgroup": colgroup,
      "st-thead": thead
    }
  });
}