window.onload = function () {
  Vue.component("st-colgroup", window["simter-vue-colgroup"]);
  Vue.component("st-thead", window["simter-vue-thead"]);

  new Vue({
    el: "#demo1",
    data: {
      columns: [
        { width: "100px", label: "X1", headCellClass: "test" },
        { width: "100px", label: "X2 long text" },
        { width: "100px", label: "X3" }
      ]
    }
  });

  new Vue({
    el: "#demo2",
    data: {
      columns: [
        { width: "100px", label: "X1" },
        {
          width: "100px", label: "X2",
          children: [
            { width: "100px", label: "X21" },
            { width: "100px", label: "X22" }
          ]
        },
        { width: "100px", label: "X3" },
        {
          width: "100px", label: "X4",
          children: [
            {
              width: "100px", label: "X41",
              children: [
                { width: "100px", label: "X411" },
                { width: "100px", label: "X412" }
              ]
            },
            { width: "100px", label: "X42 long text long text long text long text" }
          ]
        }
      ]
    }
  });
};