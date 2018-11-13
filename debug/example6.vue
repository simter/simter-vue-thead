<template>
<div class="block example">
  <h2>Example 6 : Customize classes and styles</h2>
  <table border="1" style="border-collapse: collapse;">
    <thead is="st-thead" :columns="columns" :classes="classes" :styles="styles"></thead>
  </table>
  <pre v-pre>// Expected result:
| X1 | X2 | X3 |</pre>
</div>
</template>

<script>
import thead from "../src/thead.vue";
export default {
  data() {
    return {
      columns: [{ label: "X1" }, { label: "X2" }, { label: "X3" }],
      classes: {thead: "container", row: "st-header-row", cell: "st-header-cell"},
      styles: {
        thead: {border: "none"}, 
        row: {border: "4px solid blue"}, 
        cell: {border: "inherit", color: "red"}
      }
    };
  },
  components: {
    "st-thead": thead
  }
};
</script>