<template>
  <div class="container-fluid">
    <div class="filter-form" v-if="this.search">
      <form @submit.prevent="onSearch(filterText)">
        <input type="search" @search="onSearchInput" v-model="filterText" class="org-chart-filtering-input form-control" placeholder="Enter a keyword">
      </form>
    </div>
    <div v-if="isEmpty()" class="empty-block">
      <slot name="empty">
        Not found any data
      </slot>
    </div>
    <div id="orgchart"></div>
  </div>
</template>

<script src="./OrgChart.js"></script>
<style src="@/vendor/diagram.css"></style>

<style scoped>
.container-fluid {
  padding: 15px;
  position: relative;
  z-index: 100;
}
.filter-form {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 990;
}
.filter-form input.org-chart-filtering-input {
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #fff;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  width: auto;
}
input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: searchfield-cancel-button;
}
.empty-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>
<style>
.dhx_diagram_item.search-matched .dhx_item_shape {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
}
</style>

