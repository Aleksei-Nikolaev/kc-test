import {Task} from "@/entities";

export const useFetchTaskArchive = () => {
    const fetchArchive = async (): Promise<Task[]> => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        if (!response.ok) {
            throw new Error('Ошибка запроса списка задач')
        }

        const data = await response.json()
        return data
    }

    return {
        fetchArchive
    }
}