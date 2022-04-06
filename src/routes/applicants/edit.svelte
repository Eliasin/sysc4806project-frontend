<script lang="ts">
    import { page } from "$app/stores";
    import { loginState } from "../../stores";
    import Edit from './_edit.svelte';

    let applicantId: string | null = null;

    $: if ($loginState.kind === 'admin') {
        applicantId = $page.url.searchParams.get('id');
    } else if ($loginState.kind === 'applicant') {
        applicantId = $loginState.id.toString();
    }

    export let noBack;
</script>

{#if applicantId !== null}
<Edit {applicantId} noBack={noBack}></Edit>
{/if}