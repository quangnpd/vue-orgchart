import '@/vendor/diagram.js'

const OrgChart = window['dhx']['Diagram']
export default {
  name: 'org-chart',
  props: {
    height: {
      type: Number,
      default: function() {
        return 600
      }
    },
    shapeType: {
      type: String,
      default: function() {
        return 'card'
      },
      validator: function(value) {
        return ['card', 'img-card', 'svg-card'].includes(value)
      }
    },
    connectionType: {
      type: String,
      default: function() {
        return 'line'
      },
      validator: function(value) {
        return ['line', 'dash'].includes(value)
      }
    },
    scale: {
      type: Number,
      default: 1
    },
    select: {
      type: Boolean,
      default: true
    },
    margin: Object,
    gridStep: {
      type: Number,
      default: 20
    },
    lineGap: Number,
    toolbar: {
      type: Array[Object],
      default: function() {
        return ''
      }
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    search: {
      type: Function
    }
  },
  data: function() {
    return {
      filterText: ''
    }
  },
  watch: {
    height(val, old) {
      if (val !== old) {
        this.$el.style.height = this.height + 'px'
      }
    },
    scale(val, old) {
      if (val !== old) {
        this.oChart.config.scale = val
        this.paint()
      }
    },
    data: function(val, old) {
      this.parseData(val)
    }
  },
  mounted: function() {
    this.$el.style.height = this.height + 'px'
    this.oChart = new OrgChart(this.$el, {
      type: 'org',
      defaultShapeType: this.shapeType,
      defaultLinkType: this.connectionType,
      scale: this.scale,
      select: this.select,
      gridStep: this.gridStep,
      margin: this.margin,
      toolbar: this.toolbar
    })

    // init events
    this.oChart.events.on('ShapeMouseDown', id => {
      this.$emit('item-mousedown', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('ShapeClick', id => {
      this.$emit('item-click', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('ShapeDblClick', id => {
      this.$emit('item-dblclick', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('ShapeHover', (id, e) => {
      this.$emit('item-dblclick', this.oChart.data.getItem(id), e)
    })
    this.oChart.events.on('ShapeIconClick', icon => {
      let item = this.oChart.selection.getItem()
      this.$emit('icon-click', icon, item)
    })
    this.oChart.events.on('BeforeAdd', id => {
      this.$emit('before-add', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('AfterAdd', id => {
      this.$emit('after-add', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('BeforCollapse', id => {
      this.$emit('before-collapse', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('AfterCollapse', id => {
      this.$emit('after-collapse', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('BeforeExpand', id => {
      this.$emit('before-expand', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('AfterExpand', id => {
      this.$emit('after-expand', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('BeforeSelect', id => {
      this.$emit('before-select', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('AfterSelect', id => {
      this.$emit('after-select', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('BeforeUnSelect', id => {
      this.$emit('before-un-select', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('AfterUnSelect', id => {
      this.$emit('after-un-select', this.oChart.data.getItem(id))
    })
    this.oChart.events.on('EmptyAreaClick', () => {
      this.$emit('empty-area-click')
    })
    this.oChart.events.on('Scroll', pos => {
      this.$emit('scroll', pos)
    })
    this.oChart.events.on('Change', (id, status, shape) => {
      this.$emit('change', id, status, shape)
      this.$forceUpdate()
    })
    this.oChart.events.on('Load', () => {
      this.$emit('load')
      this.$forceUpdate()
    })
  },
  methods: {
    isEmpty() {
      return !this.oChart || !this.oChart.data._order.length
    },
    parseData(data) {
      this.oChart.data.parse([...data])
      this.paint()
    },
    loadData(data) {
      this.oChart.data.load(data)
    },
    genConnection(data) {
      let connections = []
      data.forEach(d => {
        if (d.parent) {
          connections.push({
            id: `${d.id}_${d.parent}`,
            from: d.parent,
            to: d.id,
            type: 'line'
          })
        }
      })
      return connections
    },
    removeNode(nodeId, removedRoot, type = 'replot') {
      return new Promise(resolve => {})
    },
    collapseItem(id) {
      this.oChart.collapseItem(id)
    },
    expandItem(id) {
      this.oChart.expandItem(id)
    },
    scrollTo(x, y) {
      this.oChart.scrollTo(x, y)
    },
    showItem(id) {
      this.oChart.showItem(id)
    },
    locate(nativeEvent) {
      return this.oChart.locate(nativeEvent)
    },
    getScrollState() {
      return this.oChart.getScrollState()
    },
    paint() {
      this.$forceUpdate()
      this.oChart.paint()
    },
    addItem(node) {
      return new Promise(resolve => {
        this.oChart.data.add(node)
      })
    },
    isExists(id) {
      return this.oChart.data.exists(id)
    },
    remove(id) {
      this.oChart.data.remove(id)
    },
    removeAll() {
      this.oChart.data.removeAll()
    },
    update(id, data) {
      this.oChart.data.update(id, data)
    },
    selectItem(id) {
      this.oChart.selection.add(id)
    },
    deselectItem(id) {
      this.oChart.selection.remove(id)
    },
    getSelection() {
      return this.oChart.selection.getItem()
    },
    getNearId(id) {
      return this.oChart.data.getNearId(id)
    },
    onSearch(value) {
      this.parseData(
        this.data.map(d => {
          if (d.css) {
            d.css = d.css.replace('search-matched dhx_selected', '').trim()
          }
          return d
        })
      )
      let matches = this.oChart.data.findAll(shape => {
        if (this.search && typeof this.search === 'function') {
          return this.search(value, shape)
        }
        return !value
      })
      if (matches && value) {
        let _m = []
        matches.forEach(i => {
          i.css = ((i.css || '') + ' search-matched dhx_selected').trim()
          const _parents = [i]
          const getParent = id => {
            let p = this.oChart.data.getItem(id)
            if (p) {
              _parents.push(p)
              if (p.parent) {
                getParent(p.parent)
              }
            }
          }
          getParent(i.parent)
          _m = [..._m, ..._parents]
        })
        _m = _m.reduce((nA, i) => {
          if (!nA.filter(_i => _i.id.toString() === i.id.toString()).length) {
            nA.push(i)
          }
          return nA
        }, [])
        this.parseData(_m)
      } else if (!value) {
        this.parseData(this.data)
      }
      console.log(this.oChart, this.data)
      this.$forceUpdate()
    },
    onSearchInput(event) {
      if (!event.target.value) {
        event.target.blur()
        this.onSearch()
      }
    }
  },
  computed: {
    hasRoot() {
      return !!this.oChart.root
    }
  }
}
