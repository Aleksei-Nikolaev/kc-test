<script setup lang="ts">
import TheTodoList from "@/widgets/todoList/ui/TheTodoList.vue";
import TheHeader from "@/widgets/header/TheHeader.vue";
</script>

<template>
  <div class="content">
    <TheHeader/>
    <TheTodoList/>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 1400px;
  margin: 0 auto;
  padding: 34px 60px;

  @include xl {
    width: 1200px;
    padding: 34px 20px;
  }

  @include lg {
    width: 1000px;
  }

  @include md {
    width: 100%;
  }

  @include sm {
    padding: 10px 10px;
  }
}
</style>
