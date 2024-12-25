<template>
  <div class="file-panel" v-if="selectedFolder">
    <search-bar placeholder="Search Files" @search="handleSearch" />

    <div class="folders">
      <div v-for="subfolder in selectedFolder.children" :key="subfolder.id" class="folder-card">
        <img src="/public/folder-icon.png" alt="Folder Icon" class="folder-icon" />
        {{ subfolder.name }}
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'

export default {
  components: {
    SearchBar,
  },
  props: {
    selectedFolder: Object,
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    filteredSubfolders() {
      if (this.selectedFolder && this.selectedFolder.children) {
        return this.selectedFolder.children.filter((subfolder) =>
          subfolder.name.toLowerCase().includes(this.search.toLowerCase()),
        )
      }
      return []
    },
  },
  methods: {
    handleSearch(query) {
      this.search = query
    },
  },
}
</script>

<style scoped>
.file-panel {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
.folder-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px; 
  height: 100px; 
  margin: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
  border-radius: 5px; 
  cursor: pointer;
  background-color: #fffae6;
  border: 1px solid #f0f0f0;
}

.folder-icon {
  width: 50px; 
  height: auto; 
  margin-right: 10px;
}

.folder-card div {
  color: black; 
  font-weight: bold; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
}

.folders {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  color: black;
}


</style>
