/*!
* simter-vue-thead v0.4.0
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const component = {
  replace: true,
  props: {
    // The column's 'label' config array, like ['Column1', 'Column2', ...]
    columns: { type: Array, required: true },
    // element class: {thead: ..., tr: ..., th: ...}
    classes: {
      type: String | Object | Array,
      required: false,
      default() {
        return [];
      }
    },
    // element style: {thead: ..., tr: ..., th: ...}
    styles: {
      type: String | Object | Array,
      required: false,
      default() {
        return {};
      }
    }
  },
  computed: {
    /** 
     * The result of function call transform(this.columns).
     */
    rows() {
      return transform(deepClone(this.columns));
    },
    /**
     * Convert String | Array to Object {table: ...}
     */
    $_classes() {
      if (typeof this.classes === "string" || Array.isArray(this.classes))
        return { thead: this.classes };
      else if (typeof this.classes === "object") return this.classes;
      else return {};
    },
    /**
     * Convert String | Array to Object {table: ...}
     */
    $_styles() {
      if (typeof this.styles === "string" || Array.isArray(this.styles))
        return { thead: this.styles };
      else if (typeof this.styles === "object") return this.styles;
      else return {};
    }
  }
};

/**
 * Transform the origin string or lable/children config to matched trs array config.
 *
 * Rules :
 * 1. rowspan
 * 1.1. if has children, it equals to 1. And just ignore setting.
 * 1.2. if has no children, it equals to the max siblings descendant depth + 1. Ignore setting if rowspan is 1.
 * 2. colspan equals to its tree leaf node count. Ignore setting if colspan is 1.
 *
 * Examples :
 * 1. ["X1", "X2"] transform to [ [{label: "X1"}, {label: "X2"}] ]
 * 2. ["X1", {label: "X2", children: ["X21", "X22"]}]
 *    transform to [
 *      [{label: "X1", rowspan: 2}, {label: "X2", colspan: 2}],
 *      [{label: "X21"}, {label: "X22"}]
 *    ]
 * 3. [
 *      "X1",
 *      {
 *        label: "X2",
 *        children: [
 *          {
 *            label: "X21",
 *            children: ["X211", "X212"]
 *          },
 *          "X22"
 *        ]
 *      }
 *    ]
 *    transform to [
 *      [{label: "X1", rowspan: 3}, {label: "X2", colspan: 3}],
 *      [{label: "X21", colspan: 2}, {label: "X22", rowspan: 2}],
 *      [{label: "X211"}, {label: "X212"}]
 *    ]
 */
function transform(columns) {
  // Polishing String item to Object item
  columns = polishing(columns);

  columns.forEach(column => {
    // set $_rowIndex and $_depth
    descendantDepth(column);

    // set colspan
    leafCount(column);
  });

  // group by $_rowIndex
  const rows = flattenWithSelf(columns, true).reduce(function(result, column) {
    if (!result[column.$_rowIndex]) result[column.$_rowIndex] = [column];
    else result[column.$_rowIndex].push(column);
    return result;
  }, []);

  // calculate each column's rowspan
  rows.forEach(row => {
    row.forEach(column => {
      if (column.$_depth === 0) {
        // no children
        // rowspan = max(siblings.$_depth) + 1
        const depth = row
          .filter(c => c !== column)
          .reduce((a, b) => Math.max(a, b.$_depth), 0);
        if (depth > 0) column.rowspan = depth + 1;
      }
    });
  });

  // remove $_rowIndex and $_depth
  rows.forEach(row => {
    row.forEach(column => {
      delete column.$_rowIndex;
      delete column.$_depth;
    });
  });

  return rows;
}

/**
 * Change Array's String item to Object item.
 * All nested item in children will be changed also.
 * Attention: this method maybe change the origin array.
 *
 * Examples:
 * 1. "X1" polishing to {label: "X1"}.
 * 2. {"X1", children: ["X11", "X12"] polishing to
 *    {label: "X1", children: [{label: "X11"}, {label: "X12"}] }.
 */
function polishing(columns) {
  // Polishing String item to Object item
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (typeof column === "object") {
      if (column.children) column.children = polishing(column.children);
    } else columns[i] = { label: column };
  }
  return columns;
}

/**
 * Calculate the descendant depth and set to $_depth property.
 *
 * It equals to the nested children level.
 *
 * Example :
 * 1. {label: "X0"}.depth = 0
 * 2. {label: "X0", children: ["X1"]}.depth = 1
 * 3. {label: "X0", children: [{label: "X1", children: ["X2"]}]}.depth = 2
 */
function descendantDepth(column) {
  if (!column.hasOwnProperty("$_rowIndex")) column.$_rowIndex = 0; // parent $_rowIndex

  let d;
  if (column.children && column.children.length > 0) {
    d = 0;
    column.children.forEach(child => {
      child.$_rowIndex = column.$_rowIndex + 1; // child $_rowIndex
      d = Math.max(d, descendantDepth(child));
    });
    d++; // = maxChildDepth + 1
  } else d = 0;

  column.$_depth = d;
  return d;
}

/**
 * Calculate the leaf node count and set to colspan property.
 * If the node has no children, the leaf count equals to 1.
 *
 * Example :
 * 1. { label: "X1"}.hasOwnProperty("colspan") == false
 * 2. { label: "X1", children: [{label: "X11"}]}.hasOwnProperty("colspan") == false
 * 3. { label: "X1", children: [{label: "X11"}, {label: "X12"}]}.colspan = 2
 * 4. { label: "X1", children: [
 *      { label: "X11"},
 *      { label: "X12", children: [{label: "X121"}, {label: "X122"}]}
 *    ]}.colspan = 3
 */
function leafCount(column) {
  let count;
  if (column.children && column.children.length > 0) {
    count = 0;
    column.children.forEach(child => {
      count += leafCount(child);
    });
  } else count = 1;
  if (count > 1) column.colspan = count;
  return count;
}

/**
 * Flatten the array items with itself and its children items.
 *
 * Attention: if removeChildren is true, the origin columns param maybe changed.
 *
 * Example :
 * 1. ["a", "b"] flatten to ["a", "b"]
 * 2. ["a", {children: ["b", "c"]}] flatten to ["a", {children: ["b", "c"]}, "b", "c"]
 */
function flattenWithSelf(columns, removeChildren = true) {
  let result = columns.reduce((a, b) => {
    if (b.children) {
      return a.concat(b, flattenWithSelf(b.children, removeChildren));
    } else return a.concat(b);
  }, []);

  if (removeChildren)
    result.forEach(column => {
      if (column.hasOwnProperty("children")) delete column.children;
    });

  return result;
}

/**
 * Deep copy a object.
 *
 * From https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object#answer-728694
 */
function deepClone(obj) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" !== typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

/* script */
            const __vue_script__ = component;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "thead",
    { class: _vm.$_classes.thead, style: _vm.$_styles.thead },
    _vm._l(_vm.rows, function(row, rowIndex) {
      return _c(
        "tr",
        {
          key: "row-" + rowIndex,
          class: _vm.$_classes.row,
          style: _vm.$_styles.row
        },
        _vm._l(row, function(cell, cellIndex) {
          return _c(
            "th",
            {
              key: "cell-" + cellIndex,
              class: [_vm.$_classes.cell, cell.headerClass],
              style: [_vm.$_styles.cell, cell.headerStyle],
              attrs: { colspan: cell.colspan, rowspan: cell.rowspan }
            },
            [_vm._v(_vm._s(cell.label || cell))]
          )
        })
      )
    })
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component$$1 = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component$$1.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-thead\\src\\thead.vue";

    if (!component$$1.render) {
      component$$1.render = template.render;
      component$$1.staticRenderFns = template.staticRenderFns;
      component$$1._compiled = true;

      if (functional) component$$1.functional = true;
    }

    component$$1._scopeId = scope;

    return component$$1
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var thead = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

export default thead;
export { transform, polishing, descendantDepth, leafCount, flattenWithSelf, deepClone };
