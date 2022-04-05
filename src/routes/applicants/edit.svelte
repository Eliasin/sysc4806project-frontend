<script lang="ts">
    import { page } from "$app/stores";
    import { loginState } from "../../stores";
    import Edit from './_edit.svelte';

    let loginStateValue = $loginState;
    let applicantId: string | null = null;

    $: if (loginStateValue.kind === 'admin') {
        applicantId = $page.url.searchParams.get('id');
    } else if (loginStateValue.kind === 'applicant') {
        applicantId = loginStateValue.id.toString();
    }

</script>

{#if applicantId !== null}
<Edit {applicantId}></Edit>
{/if}