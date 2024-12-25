<template>
  <div class="file-explorer">
    <!-- Left Panel: Folder Structure -->
    <div class="folder-panel">
      <ul>
        <li v-for="folder in folders" :key="folder.id" @click="selectFolder(folder)">
          <div class="folder-item">
            <img src="../public/folder-icon.png" alt="Folder Icon" class="folder-icon" />
            {{ folder.name }}
          </div>
        </li>
      </ul>
    </div>

    <div class="file-panel" v-if="selectedFolder">
      <input type="search" placeholder="Search Files" class="search-bar" />
      <div class="folders">
        <div v-for="subfolder in selectedFolder.children" :key="subfolder.id" class="folder-card">
          <img src="../public/folder-icon.png" alt="Folder Icon" class="folder-icon" />
          <div>{{ subfolder.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios' 

export default {
  setup() {
    const folders = ref([])
    const selectedFolder = ref(null)
    const files = ref([])

    const fetchFolders = async () => {
      try {
        const response = await axios.get('/api/v1/folders')
        if (response.status === 200) {
          folders.value = buildFolderTree(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }

    const buildFolderTree = (foldersData) => {
      const folderLookup = {}
      const rootFolders = []

      foldersData.forEach((folder) => {
        folder.children = []
        folderLookup[folder.id] = folder
        if (folder.parent_id === null) {
          rootFolders.push(folder)
        } else {
          const parent = folderLookup[folder.parent_id]
          if (parent) {
            parent.children.push(folder)
          }
        }
      })

      return rootFolders
    }

    const selectFolder = async (folder) => {
      selectedFolder.value = folder
      try {
        const responseFiles = await axios.get(`/api/v1/files?folder_id=${folder.id}`)
        if (responseFiles.status === 200) {
          files.value = responseFiles.data.data
        }
      } catch (error) {
        console.error('Error fetching files:', error)
      }
    }

    onMounted(fetchFolders)

    return {
      folders,
      selectedFolder,
      files,
      selectFolder,
    }
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden; 
  width: 100%;
  height: 100%;
  background-color: #fff; 
}
</style>

<style scoped>
.file-explorer {
  display: flex;
  width: 100vw; 
  height: 100vh; 
  background-color: #fff;
  overflow: hidden; 
  color: black;
}

.folder-panel {
  width: 250px; 
  background-color: #f4f4f4;
  padding: 20px;
  overflow-y: auto; 
  border-right: 1px solid #ddd;
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

.file-panel {
  flex-grow: 1; 
  padding: 20px;
  overflow-y: auto; 
}

.search-bar {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

.folder-card {
  display: inline-block;
  width: 100px;
  margin: 10px;
  text-align: center;
  cursor: pointer;
  background-color: #fffae6; 
  border: 1px solid #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}

.folders {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
