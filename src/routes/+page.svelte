<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import TodoItem from "$lib/components/TodoItem/index.svelte";
    import { Input } from "$lib/components/ui/input/index.js";
    import Plus from "lucide-svelte/icons/plus";
    import { invalidate } from '$app/navigation';
    import { enhance } from '$app/forms';
    import type { PageData, ActionData } from './$types'

    let { data, form }: { data: PageData, form: ActionData} = $props()


    console.log(data)
    let userAgent = $state('')

    async function fetchUserAgent() {
        const response = await fetch('/what-is-my-user-agent')
        userAgent = await response.json()
    }

    $effect(() => {
        fetchUserAgent()
    })

    let todos = data.todos
    let text = $state('')

    $effect(() => {
        console.log(todos)
    })

    async function handleSubmit() {
        const response = await fetch('/todo.json', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const todo = await response.json()

        invalidate('app:todos')
        // console.log(todo)
        // todos = [...todos, todo]
        // text = ''
    }

    function handleDelete(id: string) {
        // todos = todos.filter(todo => todo.id !== id)
        invalidate('app:todos')
    }

    function handleComplete(id: string) {
        todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    }

    let filter = $state('')

    let filteredTodos = $derived(data.todos.filter(todo => todo.text.includes(filter)))
</script>

<svelte:head>
    <title>Todo List</title>
</svelte:head>
<div class="flex flex-col gap-2 mx-auto w-full max-w-md py-2">
    { userAgent.userAgent}
    <form method="POST" action="?/create" use:enhance>
        <div class="flex gap-2">
            <Input  bind:value={text} name="text"/>
            <Button type="submit" ><Plus /> Add</Button>
        </div>
    </form>
    <div class="flex flex-col gap-2">
        Filter <Input bind:value={filter} />
    </div>
    {#if filteredTodos.length === 0 && filter !== ''}
        <p>No todos found</p>
    {/if}
    {#each filteredTodos as todo}
        <TodoItem {todo} {handleDelete} {handleComplete}/>
    {/each}
</div>