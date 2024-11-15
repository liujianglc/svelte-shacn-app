import type { Actions } from './$types'
import db from '$lib/prisma'

export const load = async () => {
    const todos = await db.todo.findMany()
    return { todos }
}

export const actions: Actions = {
    delete: async ({ request }) => { 
        const data = await request.formData()
        console.log(data)
        const id = data.get('id') as string
        await db.todo.delete({ where: { id } })
        return { id }
    },
    create: async ({ request }) => {
        const data = await request.formData()
        console.log(data)
        const todo = await db.todo.create({ data: { text: data.get('text') as string } })
        return todo
    }
}
