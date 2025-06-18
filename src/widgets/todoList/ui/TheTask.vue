<script setup lang="ts">
import {ref, useTemplateRef} from "vue";
import {onClickOutside} from '@vueuse/core'

const target = useTemplateRef<HTMLElement>('input')

const emit = defineEmits<{
  (e: "empty" | "new"): void
}>()

const model = defineModel<string>()

const active = ref(false)

const toggle = () => {
  active.value = !active.value
}

const closeTextArea = () => {
  if (!model.value) return
  const action = ((model.value.trim() === '') ? 'empty' : "new")
  emit(action)
  toggle()
}

onClickOutside(target, () => {
  closeTextArea()
})
</script>

<template>
  <div class="task">
    <div
        v-if="!active"
        @click="toggle"
        class="task__description"
    >
      {{ model }}
    </div>
    <Textarea
        v-else
        v-model="model"
        v-autofocus
        @keydown.enter="closeTextArea"
        ref="input"
        class="task__input"
        style="resize: none"
        rows="3"
        fluid
    />
  </div>
</template>

<style lang="scss" scoped>
.task {
  min-width: 0;
  width: 100%;

  &__description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 12px;

    &:hover {
      background: #cee5fe;
      cursor: pointer;
    }
  }

  .task-completed .task__description {
    font-weight: bold
  }
}
</style>