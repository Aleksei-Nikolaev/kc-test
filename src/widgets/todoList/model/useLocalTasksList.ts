import {Task} from "@/entities";


export const useLocalTasksList = () => {
    const saveTasksToLocalStorage = (completed: Task[], active: Task[]) => {
        try {
            const data = { completed, active }
            localStorage.setItem('tasks', JSON.stringify(data))
        } catch (error) {
            console.error('Error at tasks saving:', error)
        }
    }


    const loadTasksFromLocalStorage = () => {
        try {
            const stored = localStorage.getItem('tasks')
            if (!stored) {
                return null
            }
            const parsed = JSON.parse(stored)
            return {
                completed: parsed.completed ?? [],
                active: parsed.active ?? [],
            }
        } catch (error) {
            console.error('Error at tasks loading:', error)
            return null
        }
    }

    return {
        saveTasksToLocalStorage,
        loadTasksFromLocalStorage
    }
}

