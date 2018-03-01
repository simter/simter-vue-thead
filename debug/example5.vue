<template>
<div class="block example">
  <h2>Example 5 : Complex Columns (with column width)</h2>
  <table border="1">
    <colgroup is="st-colgroup" :columns="columns"></colgroup>
    <thead is="st-thead" :columns="columns"></thead>
  </table>
  <pre v-pre>// Expected result:
| X1 |     X2    | X3 |         X4        |
|    | X21 | X22 |    |     X41     | X42 |
|    |     |     |    | X411 | X412 |     |</pre>
</div>
</template>

<script>
import colgroup from "simter-vue-colgroup";
import thead from "../src/thead.vue";
export default {
  data() {
    return {
      columns: [
        { label: "X1", width: "50px" },
        {
          label: "X2",
          children: [
            { label: "X21", width: "50px" },
            { label: "X22", width: "50px" }
          ]
        },
        { label: "X3", width: "100px" },
        {
          label: "X4",
          children: [
            {
              label: "X41",
              children: [
                { label: "X411", width: "60px" },
                { label: "X412", width: "60px" }
              ]
            },
            { label: "X42", width: "50px" }
          ]
        }
      ]
    };
  },
  components: {
    "st-colgroup": colgroup,
    "st-thead": thead
  }
};
</script>