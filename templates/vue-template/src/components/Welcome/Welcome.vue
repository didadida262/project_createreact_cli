<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <el-card class="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20">
      <template #header>
        <h1 class="mb-6 text-center text-5xl font-bold text-white">
          Welcome to vue-template!
        </h1>
      </template>
      
      <div class="space-y-4 text-center text-white/90">
        <p class="text-xl">
          这是一个使用 Vue 3 + TypeScript + Element Plus 构建的现代化项目模板
        </p>
        <p class="text-lg">
          开始编辑 <code class="rounded bg-white/20 px-2 py-1 font-mono text-sm">src/App.vue</code> 来开始你的项目
        </p>
      </div>

      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <el-tag type="success" effect="dark">⚡️ Vite</el-tag>
        <el-tag type="success" effect="dark">🟢 Vue 3</el-tag>
        <el-tag type="success" effect="dark">📘 TypeScript</el-tag>
        <el-tag type="success" effect="dark">🎨 Element Plus</el-tag>
        <el-tag type="success" effect="dark">🎯 Pinia</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.el-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.el-card :deep(.el-card__header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>

