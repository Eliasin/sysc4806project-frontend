<script lang="ts">
    import { page } from "$app/stores";
    import { loginState } from "../../stores";
    import Edit from './_edit.svelte';

    let loginStateValue = $loginState;
    let professorId: string | null = null;

    professorId = $page.url.searchParams.get('id');
    $: if (loginStateValue.kind === 'admin') {
        professorId = $page.url.searchParams.get('id');
    } else if (loginStateValue.kind === 'applicant') {
        professorId = loginStateValue.id.toString();
    }

</script>

{#if professorId !== null}
<Edit {professorId}></Edit>
{/if}