<script lang="ts">
    import { loginState } from "../stores";
    import AdminPanel from "./_admin-panel.svelte";
    import LoginScreen from "./_login-screen.svelte";
    import ApplicantEdit from "./applicants/edit.svelte";
    import ProfessorEdit from "./professors/edit.svelte";

    let loginStateValue = $loginState;
</script>

{#if loginStateValue.kind === 'admin'}
<AdminPanel></AdminPanel>
{:else if loginStateValue.kind === 'professor'}
<ProfessorEdit></ProfessorEdit>
{:else if loginStateValue.kind === 'applicant'}
<ApplicantEdit></ApplicantEdit>
{:else}
<LoginScreen></LoginScreen>
{/if}