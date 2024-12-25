<template>
  <div class="folder-panel">
    <search-bar placeholder="Search Folders" @search="handleSearch" />

    <ul>
      <li v-for="folder in folders" :key="folder.id" @click="handleFolderSelect(folder)">
        <div class="folder-item">
          <img src="/public/folder-icon.png" alt="Folder Icon" class="folder-icon" />
          {{ folder.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'

export default {
  components: {
    SearchBar,
  },
  props: {
    folders: Array,
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    filteredFolders() {
      return this.folders.filter((folder) =>
        folder.name.toLowerCase().includes(this.search.toLowerCase()),
      )
    },
  },
  methods: {
    handleFolderSelect(folder) {
      this.$emit('select-folder', folder)
    },
    handleSearch(query) {
      this.search = query
    },
  },
}
</script>

<style scoped>
.folder-panel {
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  color: black;
}
.folder-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}
.folder-icon {
  margin-right: 10px;
  width: 24px;
}
</style>
