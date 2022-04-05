<script lang="ts">
    import { loginState } from "../stores";
    import { sendLoginRequest } from "../request/util";

    let loginError: string | null = null;

    async function requestLogin(e: MouseEvent) {
        e.preventDefault();

        let username = (document.getElementById('username') as HTMLInputElement).value;
        let password = (document.getElementById('password') as HTMLInputElement).value;

        let loginResponse = await sendLoginRequest(username, password);

        if (loginResponse.kind !== 'failed') {
            loginState.set(loginResponse);
        } else {
            loginError = `Failed to login: ${loginResponse.error}`;
        }
    }
</script>

<form>
    <span class="login-error">{loginError ?? ''}</span>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
    <button on:click={requestLogin}>Login</button>
</form>