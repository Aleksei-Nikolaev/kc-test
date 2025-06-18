<script setup lang="ts">
import {useTodoList} from "@/widgets/todoList/model/useTodoList";
import TheTask from "@/widgets/todoList/ui/TheTask.vue";
import {onClickOutside} from '@vueuse/core'
import {useTemplateRef} from "vue";
import {watch} from "vue";
import {useLocalTasksList} from "@/widgets/todoList/model/useLocalTasksList";

const {
  completedTasks,
  activeTasks,
  completedTaskCount,
  activeTaskCount,
  newTask,
  showMoreActive,
  showMoreCompleted,
  showLessActive,
  showLessCompleted,
  deleteFromActive,
  deleteFromCompleted,
  addTask,
  moveToCompleted,
  moveToActive,
  addNewTaskToList,
} = useTodoList()

const {saveTasksToLocalStorage} = useLocalTasksList()

const target = useTemplateRef<HTMLElement>('textarea')


onClickOutside(target, () => {
  addNewTaskToList(newTask)
})

watch(
    [completedTasks, activeTasks],
    ([newCompleted, newActive]) => {
      saveTasksToLocalStorage(newCompleted, newActive)
    },
    { deep: true }
)

</script>

<template>
  <div class="todoList__container">
    <div class="todoList__task-block">
      <div class="todoList__header-block">
        <h2 class="todoList__header">Active tasks</h2>
        <Button @click="addTask" :disabled="newTask.active">Add task</Button>
      </div>
      <div class="todoList__task-list">
           <Textarea
               v-if="newTask.active"
               v-model="newTask.title"
               v-autofocus
               ref="textarea"
               style="resize: none"
               @keydown.enter="addNewTaskToList(newTask)"
               rows="3" fluid
           />
        <div
            v-for="(task, index) in activeTasks.slice(0, activeTaskCount)"
            class="todoList__task"
        >
          <Button @click="moveToCompleted(task, index)" icon="pi pi-check" size="small" variant="text"></Button>
          <TheTask v-model="task.title" @empty="deleteFromActive(index)"/>
          <Button @click="deleteFromActive(index)" icon="pi pi-trash" size="small" severity="secondary"/>
        </div>
      </div>
      <div class="todoList__button-group">
        <Button @click="showMoreActive" :disabled="activeTaskCount >= activeTasks.length">Show more</Button>
        <Button @click="showLessActive" :disabled="activeTaskCount <= 10">Show less</Button>
      </div>
    </div>
    <div class="todoList__task-block">
      <div class="todoList__header-block">
        <h2 class="todoList__header">Completed tasks</h2>
      </div>
      <div class="todoList__task-list">
        <div
            v-for="(task, index) in completedTasks.slice(0, completedTaskCount)"
            class="todoList__task"
        >
          <Button @click="moveToActive(task, index)" icon="pi pi-sync" size="small" variant="text"></Button>
          <TheTask
              v-model="task.title"
              @empty="deleteFromCompleted(index)"
              class="todoList__task-completed"
          />
          <Button @click="deleteFromCompleted(index)" icon="pi pi-trash" size="small" severity="secondary"/>
        </div>
      </div>
      <div class="todoList__button-group">
        <Button @click="showMoreCompleted" :disabled="completedTaskCount >= completedTasks.length">Show more</Button>
        <Button @click="showLessCompleted" :disabled="completedTaskCount <= 3">Show less</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todoList {
  &__container {
    border: solid 1px #81bbfc;
    border-radius: 20px;
    padding: 40px;
    margin: auto;
    width: 600px;
    min-height: 600px;

    @include sm {
      width: 100%;
      border-radius: 10px;
      padding: 10px;
      min-height: 400px;
    }

  }

  &__button {
    &-group {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  &__header {
    margin-right: auto;

    &-block {
      display: flex;
      width: 100%;
      margin-bottom: 20px;

      @include sm {
        margin-bottom: 30px;
      }
    }
  }

  &__task {
    display: flex;
    align-items: center;
    gap: 20px;

    @include sm {
      gap: 6px;
    }

    &-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 20px;
      width: 100%;
    }

    &-completed :deep(.task__description) {
      text-decoration: line-through;
    }
  }
}

</style>