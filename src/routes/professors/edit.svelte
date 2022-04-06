<script lang="ts">
    import { page } from "$app/stores";
    import { loginState } from "../../stores";
    import Edit from './_edit.svelte';

    let professorId: string | null = null;

    $: if ($loginState.kind === 'admin') {
        professorId = $page.url.searchParams.get('id');
    } else if ($loginState.kind === 'professor') {
        professorId = $loginState.id.toString();
    }

</script>

{#if professorId !== null}
<Edit {professorId}></Edit>
{/if}