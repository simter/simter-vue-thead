<template>
<div class="block example">
  <h2>Example 4 : Nested 2 Group Columns</h2>
  <table border="1">
    <thead is="st-thead" :columns="columns"></thead>
  </table>
  <pre v-pre>// Expected result:
| X1 |        X2         | X3 |
|    | X21 |     X22     |    |
|    |     | X221 | X222 |    |</pre>
</div>
</template>

<script>
import thead from "../src/thead.vue";
export default {
  data() {
    return {
      columns: [
        { label: "X1" },
        {
          label: "X2",
          children: [
            { label: "X21" },
            {
              label: "X22",
              children: [{ label: "X221" }, "X222"]
            }
          ]
        },
        { label: "X3" }
      ]
    };
  },
  components: {
    "st-thead": thead
  }
};
</script>