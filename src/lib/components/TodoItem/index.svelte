<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";    
    import { Input } from "$lib/components/ui/input/index.js";
    import { enhance } from "$app/forms";
    import { invalidate, goto } from '$app/navigation';

    let { todo, handleDelete, handleComplete } = $props<{ todo: Todo, handleDelete: (id: string) => void, handleComplete: (id: string) => void }>()
</script>

<div class="flex items-center gap-2">
    <Checkbox on:click={() => handleComplete(todo.id)} bind:checked={todo.completed}/>
    <div class="flex-1">{todo.text}</div>
    <form method="POST" action="?/update">
        <input type="hidden" name="id" value={todo.id} />
    </form>
    <form method="POST" action="?/delete" use:enhance={({ formElement, formData, action, cancel}) => {
        return async ({ result, update }) => {
            handleDelete()
        }
    }}>
        <input type="hidden" name="id" value={todo.id} />
        <Button variant="ghost" type="submit">Delete</Button>
    </form>
</div>