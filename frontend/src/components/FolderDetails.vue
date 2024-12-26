<template>
  <div class="file-panel" v-if="selectedFolder">
    <search-bar placeholder="Search Files" @search="handleSearch" />
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb">
      <span v-for="path in breadcrumbPath" :key="path.id" @click="loadFolderDetails(path.id)">
        {{ path.name }} /
      </span>
    </nav>
    <div class="folders">
      <div v-for="subfolder in selectedFolder.children" :key="subfolder.id" class="folder-card" @click="handleFolderClick(subfolder.id)">
        <img src="/public/folder-icon.png" alt="Folder Icon" class="folder-icon" />
        {{ subfolder.name }}
      </div>
    </div>
    <div class="file-list">
      <div v-for="file in files" :key="file.id" class="file-item">
        {{ file.name }}
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import axios from 'axios'

export default {
  components: {
    SearchBar,
  },
  props: {
    selectedFolder: Object,
    loadFolderDetails: Function,
  },
  data() {
    return {
      folderId: '',
      search: '',
      breadcrumbPath: [],
      files: [],
    }
  },
  watch: {
    selectedFolder: {
      immediate: true,
      handler(folder) {
        if (folder) {
          this.getFullPath(folder)
          this.fetchFiles(''); 
        }
      },
    },
  },
  methods: {
    fetchFiles(subfolderId = null ) {
      // console.log(this.search )
      const folderId = subfolderId || (this.selectedFolder ? this.selectedFolder.id : '');
      // console.log(folderId)
      axios.get(`/api/v1/files`, {
        params: {
          folder_id: folderId,
          search: this.search,
          limit: 10 // Example limit
        }
      })
      .then(response => {
        if (response.data.success) {
          this.files = response.data.data;
        } else {
          this.files = [];
          console.error('Failed to fetch files:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
    },
    handleSearch(query) {

      this.search = query;
      this.fetchFiles(this.folderId);
    },
    handleFolderClick(folderId) {
      this.loadFolderDetails(folderId).then(() => {
        this.getFullPath(this.selectedFolder);
        this.folderId = folderId;
        this.fetchFiles(folderId);  
      });
    },

    async getFullPath(folder) {
      let currentFolder = folder;
      const path = [];

      path.push({ id: currentFolder.id, name: currentFolder.name });

      while (currentFolder.parent_id) {
        try {
          const response = await axios.get(`/api/v1/folders/${currentFolder.parent_id}`);
          if (response.data.success) {
            currentFolder = response.data.data;
            path.unshift({ id: currentFolder.id, name: currentFolder.name });
          } else {
            break;
          }
        } catch (error) {
          console.error('Failed to fetch parent folder:', error);
          break;
        }
      }

      this.breadcrumbPath = path;
    },
  },
}
</script>

<style scoped>
.breadcrumb {
  padding: 10px;
  font-size: 16px;
  color: black;
  cursor: pointer;
}

.breadcrumb span {
  margin-right: 5px;
}
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
.file-list {
  display: flex;
  flex-direction: column;
  color:black
}
.file-item {
  margin: 5px 0;
}
</style>
