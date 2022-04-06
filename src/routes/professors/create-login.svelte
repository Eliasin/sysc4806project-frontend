<script lang="ts">
    import { page } from "$app/stores";
    import { loginState } from "../../stores";
    import { createProfessorLogin } from "../../request/professor";

    let applicantId = $page.url.searchParams.get('id');
    let sessionToken = null;
    $: if ($loginState.kind !== 'not-logged-in') {
        sessionToken = $loginState.token;
    }

    async function requestCreateProfessorLogin() {
        let username = (document.getElementById('username') as HTMLInputElement).value;
        let password = (document.getElementById('password') as HTMLInputElement).value;

        await createProfessorLogin(sessionToken, applicantId, username, password);
    }
</script>

<form>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
    <button on:click|preventDefault={requestCreateProfessorLogin}>Login</button>
</form>