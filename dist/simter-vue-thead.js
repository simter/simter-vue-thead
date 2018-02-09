(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['simter-vue-thead'] = factory());
}(this, (function () { 'use strict';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .st-thead-cell.ellipsis { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } .st-thead-cell.hidden { overflow: hidden; white-space: nowrap; } .st-thead-cell.word-wrap { word-break: break-all; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();













function flattenWithSelf(columns) {
  return columns.reduce((a, b) => {
    if (b.children) return a.concat(b, flattenWithSelf(b.children));
    else return a.concat(b);
  }, []);
}

function getDepth(column, parentRowIndex) {
  let d;
  if (column.children) {
    d = 0;
    column.children.forEach(child => {
      Vue.set(child, "$_rowIndex", parentRowIndex + 1);
      d = Math.max(d, getDepth(child, parentRowIndex + 1));
    });
    d++; // = maxChildDepth + 1
  } else d = 1;
  Vue.set(column, "$_depth", d);
  return d;
}
function getLeafCount(column) {
  let count;
  if (column.children) {
    count = 0;
    column.children.forEach(child => {
      count += getLeafCount(child);
    });
  } else {
    count = 1;
  }
  Vue.set(column, "$_colspan", count);
  return count;
}

var thead = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{class:_vm.headClass},_vm._l((_vm.rowCount),function(n){return _c('tr',{key:'head-row-' + n,class:_vm.rowClass},_vm._l((_vm.rowColumns(n - 1)),function(c,index){return _c('th',{key:'head-cell-' + index,class:_vm.getCellClass(c),attrs:{"colspan":c.$_colspan,"rowspan":c.$_rowspan}},[_vm._v(_vm._s(c.label))])}))}))},staticRenderFns: [],
  replace: true,
  props: {
    columns: { type: Array, required: true },
    headClass: { type: String | Array, required: false },
    rowClass: { type: String | Array, required: false },
    cellClass: { type: String | Array, required: false },
    // ellipsis | hidden | word-wrap
    textOverflow: { type: String, required: false }
  },
  created: function() {
    // calculate each column's depth, rowIndex
    this.columns.forEach(column => {
      Vue.set(column, "$_rowIndex", 0);
      getDepth(column, 0);
    });

    // calculate each column's colspan
    this.columns.forEach(column => getLeafCount(column));

    // calculate each column's rowspan
    this.flattenColumns.forEach(column => {
      if (column.children) {
        column.$_rowspan = 1;
      } else {
        // = max(siblings.$_depth)
        column.$_rowspan = this.flattenColumns
          .filter(c => c.$_rowIndex === column.$_rowIndex)
          .reduce((a, b) => Math.max(a, b.$_depth), 0);
      }
    });

    // debug
    //console.log(JSON.stringify(this.columns));
    //console.log(JSON.stringify(this.flattenColumns));
  },
  computed: {
    /** The row count to render */
    rowCount: function() {
      //console.log("--rowCount");
      return this.columns.reduce((a, b) => Math.max(a, b.$_depth), 0);
    },
    /**
     * The flatten columns with the parent column.
     *
     * Use for calculate each column rowspan and the specific rowIndex columns.
     */
    flattenColumns: function() {
      //console.log("--flattenColumns");
      return flattenWithSelf(this.columns);
    }
  },
  methods: {
    /** The rows to render in the specific rowIndex */
    rowColumns: function(rowIndex) {
      return this.flattenColumns.filter(c => c.$_rowIndex === rowIndex);
    },
    getCellClass(column) {
      let classes = [];

      // `column.headCellClass` has high priority than `this.cellClass`
      if (column.headCellClass) classes = classes.concat(column.headCellClass);
      else classes = classes.concat(this.cellClass);

      // textOverflow:  ellipsis | hidden | word-wrap
      if (this.textOverflow === "ellipsis") classes.push("st-thead-cell ellipsis");
      else if (this.textOverflow === "hidden") classes.push("st-thead-cell hidden");
      else if (this.textOverflow === "word-wrap")
        classes.push("st-thead-cell word-wrap");

      return classes.length ? classes.join(" ") : null;
    }
  }
};

return thead;

})));
