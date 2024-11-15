import db from '$lib/prisma'
import { json } from '@sveltejs/kit'
import type { Request } from '@sveltejs/kit'

export async function GET() {
    const todos = await db.todo.findMany()
    return json(todos)
}

export async function POST({request}) {
    console.log(request)
    const { text } = await request.json()
    console.log(text)
    const todo = await db.todo.create({ data: { text } })
    return json(todo)
}

// export const POST: RequestHandler = async ({ request }) => {
//     const { text } = await request.json()
//     console.log(text)
//     const todo = await db.todo.create({ data: { text } })
//     return json(todo)
// }
