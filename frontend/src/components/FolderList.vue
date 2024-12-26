<template>
  <div class="folder-panel">
    <h3> EXPLORER</h3>
    <ul>
      <folder-item
        v-for="folder in filteredFolders"
        :key="folder.id"
        :folder="folder"
        :selectedFolder="selectedFolder"
        @select-folder="handleFolderSelect"
      />
    </ul>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import FolderItem from './FolderItem.vue'

export default {
  components: {
    SearchBar,
    FolderItem,
  },
  props: {
    folders: Array,
  },
  data() {
    return {
      search: '',
      selectedFolder: null,
    }
  },
  computed: {
    filteredFolders() {
      return this.folders.filter(folder =>
        folder.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    handleFolderSelect(folder) {
      this.selectedFolder = this.selectedFolder === folder ? null : folder;
      this.$emit('select-folder', folder);
    },
    handleSearch(query) {
      this.search = query;
    },
  },
}
</script>

<style scoped>
.folder-panel {
  width: 400px;
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
