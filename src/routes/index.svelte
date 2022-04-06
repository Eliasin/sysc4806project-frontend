<script lang="ts">
    import { loginState } from "../stores";
    import LoginScreen from "./_login-screen.svelte";
    import AdminPanel from "./_admin-panel.svelte";
    import ApplicantEdit from "./applicants/edit.svelte";
    import ProfessorEdit from "./professors/edit.svelte";

</script>

{#if $loginState.kind === 'admin'}
<AdminPanel></AdminPanel>
{:else if $loginState.kind === 'professor'}
<ProfessorEdit noBack={true}></ProfessorEdit>
{:else if $loginState.kind === 'applicant'}
<ApplicantEdit noBack={true}></ApplicantEdit>
{:else}
<LoginScreen></LoginScreen>
{/if}