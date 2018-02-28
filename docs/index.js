window.onload = function () {
  let colgroup = window["simter-vue-colgroup"];
  let thead = window["simter-vue-thead"].default;

  new Vue({
    el: "#sample1",
    data: {
      columns: ["X1", "X2", "X3"]
    },
    components: {
      "st-thead": thead
    }
  });

  new Vue({
    el: "#sample2",
    data: {
      columns: [
        "X1",
        {
          label: "X2",
          children: ["X21", "X22"]
        },
        {
          label: "X3",
          children: ["X31", "X32"]
        }
      ]
    },
    components: {
      "st-thead": thead
    }
  });

  new Vue({
    el: "#sample3",
    data: {
      columns: [
        { label: "X2", width: "50px" },
        {
          label: "X2",
          children: [
            { label: "X21", width: "50px" },
            { label: "X22", width: "50px" }
          ]
        },
        {
          label: "X3",
          children: [
            { label: "X31", width: "50px" },
            { label: "X32", width: "50px" }
          ]
        }
      ]
    },
    components: {
      "st-colgroup": colgroup,
      "st-thead": thead
    }
  });

  new Vue({
    el: "#sample4",
    data: {
      columns: [
        { label: "X1", width: "50px" },
        {
          label: "X2",
          children: [
            { label: "X21", width: "50px" },
            { label: "X22", width: "50px" }
          ]
        },
        { label: "X3", width: "50px" },
        {
          label: "X4",
          children: [
            {
              label: "X41",
              children: [
                { label: "X411", width: "100px" },
                { label: "X412", width: "100px" }
              ]
            },
            { label: "X42", width: "50px" }
          ]
        }
      ]
    },
    components: {
      "st-colgroup": colgroup,
      "st-thead": thead
    }
  });
};