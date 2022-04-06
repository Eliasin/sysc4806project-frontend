<script lang="ts">
    import { page } from "$app/stores";
    import { loginState } from "../../stores";
    import { createApplicantLogin } from "../../request/applicant";

    let applicantId = $page.url.searchParams.get('id');

    let sessionToken = null;
    $: if ($loginState.kind !== 'not-logged-in') {
        sessionToken = $loginState.token;
    }

    async function requestCreateApplicantLogin() {
        let username = (document.getElementById('username') as HTMLInputElement).value;
        let password = (document.getElementById('password') as HTMLInputElement).value;

        await createApplicantLogin(sessionToken, applicantId, username, password);
    }
</script>

<form>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
    <button on:click|preventDefault={requestCreateApplicantLogin}>Login</button>
</form>