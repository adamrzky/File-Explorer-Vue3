<template>
    <input type="search" :placeholder="placeholder" v-model="searchQuery" @input="emitSearch" class="search-bar" />
  </template>
  
  <script>
  export default {
    props: {
      placeholder: String
    },
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      emitSearch() {
        this.$emit('search', this.searchQuery);
      }
    }
  }
  </script>
  
  <style scoped>
  .search-bar {
    padding: 10px;
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  </style>
  