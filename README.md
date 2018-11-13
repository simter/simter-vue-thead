# Vue Component simter-vue-thead

Define table's thead tag by structured data. Such as `columns = ["X1", "X2"]` or 
`columns = ["X1", {label: "X2", children: ["X21", "X22"]}]`.
Demo or document is [here](https://simter.github.io/simter-vue-thead).

Core properties:

| Name_________ | Require | ValueType | Description
|---------------|---------|-----------|--------------------
| columns       | true    | \[{}\]    | Define table columns
| ├ label       | true    | String    | The column's visible text
| ├ width       | false   | String    | The column's width, such as `'2em'`
| ├ children    | false   | \[{}\]    | The child group columns. `id` and `width` will be ignored if define this property
| ├ headerClass | false   | String    | The specific class for this column's header cell th element
| ├ headerStyle | false   | String    | The specific style for this column's header cell th element
| classes       | false   | {}        | Define component class
| ├ thead       | false   | String    | thead class, follow [Vue Class Bindings]
| ├ row         | false   | String    | thead/tr class, follow [Vue Class Bindings]
| ├ cell        | false   | String    | thead/tr/th class, follow [Vue Class Bindings]
| styles        | false   | {}        | Define component style
| ├ thead       | false   | String    | thead class, follow [Vue Style Bindings]
| ├ row         | false   | String    | thead/tr class, follow [Vue Style Bindings]
| ├ cell        | false   | String    | thead/tr/th class, follow [Vue Style Bindings]

[Vue Class Bindings]: https://vuejs.org/v2/guide/class-and-style.html
[Vue Style Bindings]: https://vuejs.org/v2/guide/class-and-style.html

## Develop

```
yarn install  // or npm install
yarn run dev  // or npm run dev
```

Use [parcel] to run the development debug.

## Build

```
yarn run build  // or npm run build
```

Use [rollup] package the component to `dist` directory.

## Usage

### Example 1 : Simple Columns

Js:

```js
import thead from 'simter-vue-thead'

new Vue({
  el: "#sample",
  data: {
    columns: ["X1", "X2", "X3"]
  },
  components: {
    "st-thead": thead
  }
})
```

Html template:

```html
<table id="#sample">
  <thead is="st-thead" :columns="columns"></thead>
  ...
</table>
```

Generated html:

```html
| X1 | X2 | X3 |
<table>
  <thead>
    <tr>
      <th>X1</th>
      <th>X2</th>
      <th>X3</th>
    </tr>
  </thead>
  ...
</table>
```

### Example 2 : Group Columns

Use `children` key to define the group.

Js:

```js
import thead from 'simter-vue-thead'

new Vue({
  el: "#sample",
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
      },
    ]
  },
  components: {
    "st-thead": thead
  }
})
```

Html template:

```html
<table id="#sample">
  <thead is="st-thead" :columns="columns"></thead>
  ...
</table>
```

Generated html:

```html
| X1 |    X2     |    X3     |
|    | X21 | X22 | X31 | X32 |
<table>
  <thead>
    <tr>
      <th rowspan="2">X1</th>
      <th colspan="2">X2</th>
      <th colspan="2">X3</th>
    </tr>
    <tr>
      <th>X21</th>
      <th>X22</th>
      <th>X31</th>
      <th>X32</th>
    </tr>
  </thead>
  ...
</table>
```

### Example 3 : Complex Group Columns

Use `children` key to define any level nested group columns.

Js:

```js
import thead from 'simter-vue-thead'

new Vue({
  el: "#sample",
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
      { label: "X3" },
      {
        label: "X4",
        children: [
          {
            label: "X41",
            children: [
              { label: "X411" },
              { label: "X412" }
            ]
          },
          { label: "X42" }
        ]
      }
    ]
  },
  components: {
    "st-thead": thead
  }
})
```

Html template:

```html
<table id="#sample">
  <thead is="st-thead" :columns="columns"></thead>
  ...
</table>
```

Generated html:

```html
| X1 |    X2     | X3 |        X4         |
|    | X21 | X22 |    |     X41     | X42 |
|    |     |     |    | X411 | X412 |     |
<table>
  <thead>
    <tr>
      <th rowspan="3">X1</th>
      <th colspan="2">X2</th>
      <th rowspan="3">X3</th>
      <th colspan="3">X4</th>
    </tr>
    <tr>
      <th rowspan="2">X21</th>
      <th rowspan="2">X22</th>
      <th colspan="2">X41</th>
      <th rowspan="2">X42</th>
    </tr>
    <tr>
      <th>X411</th>
      <th>X412</th>
    </tr>
  </thead>
  ...
</table>
```

[rollup]: https://rollupjs.org
[parcel]: https://parceljs.org
[yarn]: https://yarnpkg.com