import {useFetchTaskArchive} from "@/features/taskArchive/useFetchTaskArchive";
import {onMounted, ref} from "vue";
import {Ref} from "vue"
import {Task} from "@/entities";
import { v4 as uuidv4 } from 'uuid'
import {useLocalTasksList} from "@/widgets/todoList/model/useLocalTasksList";

export const useTodoList = () => {
    const {loadTasksFromLocalStorage, saveTasksToLocalStorage} = useLocalTasksList()
    const {fetchArchive} = useFetchTaskArchive()

    const completedTasks = ref<Task[]>([])
    const activeTasks = ref<Task[]>([])

    const completedTaskCount = ref(3)
    const activeTaskCount = ref(8)

    const portions = {
        minActive: 10,
        minCompleted: 3,
        addDeleteStep: 10
    }

    const newTask = ref({
        active: false,
        title: ""
    })

    const saveToLocal = () => {
        saveTasksToLocalStorage(completedTasks.value, activeTasks.value)
    }


    const showMore = (taskList: Ref<Task[]>, count: Ref<number>) => {
        const newCount = count.value + portions.addDeleteStep
        const maxCount = taskList.value.length
        count.value = Math.min(newCount, maxCount)
    }

    const showMoreActive = () => {
        showMore(activeTasks, activeTaskCount)
    }

    const showMoreCompleted = () => {
        showMore(completedTasks, completedTaskCount)
    }

    const showLess = (taskList: Ref<Task[]>, count: Ref<number>, min: number) => {
        const newCount = count.value - portions.addDeleteStep
        const minCount = min
        count.value = Math.max(newCount, minCount)
    }

    const showLessActive = () => {
        showLess(activeTasks, activeTaskCount, portions.minActive)
    }

    const showLessCompleted = () => {
        showLess(completedTasks, completedTaskCount, portions.minCompleted)
    }


    const deleteTask = (taskList: Ref<Task[]>, index: number) => {
        taskList.value.splice(index, 1)
        saveToLocal()
    }

    const deleteFromActive = (index: number) => {
        deleteTask(activeTasks, index)
        activeTaskCount.value = Math.max(Math.min(activeTaskCount.value, activeTasks.value.length), 10)
    }

    const deleteFromCompleted = (index: number) => {
        deleteTask(completedTasks, index)
        completedTaskCount.value = Math.max(Math.min(completedTaskCount.value, completedTasks.value.length), 3)
    }

    const switchTaskStatus = (task: Task, index: number, from: Ref<Task[]>, to: Ref<Task[]>) => {
        to.value.unshift({
            ...task,
            completed: !task.completed
        })
        from.value.splice(index, 1)
        saveToLocal()
    }

    const moveToCompleted = (task: Task, index: number) => {
        switchTaskStatus(task, index, activeTasks, completedTasks)
    }

    const moveToActive = (task: Task, index: number) => {
        switchTaskStatus(task, index, completedTasks, activeTasks)
    }

    const addNewTaskToList = () => {
        const newTaskTitle = newTask.value.title.trim()
        if (newTaskTitle) {
            activeTasks.value.unshift({
                userId: 1,
                id: uuidv4(),
                title: newTaskTitle,
                completed: false
            })
        }
        newTask.value.active = false
        newTask.value.title = ""
        saveToLocal()
    }

    const addTask = () => {
        newTask.value.active = true
    }


    onMounted(async () => {
        const tasksFromStore = loadTasksFromLocalStorage()

        if (tasksFromStore) {
            completedTasks.value = tasksFromStore.completed
            activeTasks.value = tasksFromStore.active
            return
        }

        const tasks = await fetchArchive();

        const [completed, active] = tasks.reduce<[Task[], Task[]]>(
            ([completedArr, activeArr], task) => {
                task.completed ? completedArr.push(task) : activeArr.push(task)
                return [completedArr, activeArr]
            },
            [[], []]
        );

        completedTasks.value = completed
        activeTasks.value = active
        saveToLocal()
    });

    return {
        completedTasks,
        activeTasks,
        completedTaskCount,
        activeTaskCount,
        newTask,
        showMoreActive,
        showMoreCompleted,
        deleteFromCompleted,
        deleteFromActive,
        addTask,
        moveToCompleted,
        moveToActive,
        addNewTaskToList,
        showLessActive,
        showLessCompleted,
        saveToLocal
    }
}