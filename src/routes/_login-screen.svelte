<script lang="ts">
    import { loginState } from "../stores";
    import { createAdminLogin, doesAdminExist, getLoginType, sendLoginRequest } from "../request/util";
    import { onMount } from "svelte";

    let shouldPromptFirstAdminCreation = false;

    async function requestLogin() {
        let username = (document.getElementById('username') as HTMLInputElement).value;
        let password = (document.getElementById('password') as HTMLInputElement).value;

        let response = await sendLoginRequest(username, password);

        if (response.session_token !== null) {
            let loginType = await getLoginType(response.session_token);

            if (loginType.session_type === 'Administrator') {
                loginState.set({ kind: 'admin', token: response.session_token });
            } else if ('Professor' in loginType.session_type) {
                loginState.set({ kind: 'professor', token: response.session_token, id: loginType.session_type.Professor });
            } else if ('Applicant' in loginType.session_type) {
                loginState.set({ kind: 'applicant', token: response.session_token, id: loginType.session_type.Applicant });
            }
        }
    }

    async function createFirstAdminLogin() {
        let username = (document.getElementById('username') as HTMLInputElement).value;
        let password = (document.getElementById('password') as HTMLInputElement).value;

        await createAdminLogin(username, password);
        window.location.reload();
    }

    onMount(async () => {
        if (!(await doesAdminExist()).result) {
            shouldPromptFirstAdminCreation = true;
        }
    });
</script>

<body>
    {#if shouldPromptFirstAdminCreation}
    <span>Create First Admin Account</span>
    {/if}
    <form id='login-form'>
        <label id='username-label' for="username">Username:</label>
        <input type="text" id="username" name="username">
        <label id="password-label" for="password">Password:</label>
        <input type="password" id="password" name="password">
    
        {#if shouldPromptFirstAdminCreation}
        <button on:click|preventDefault={createFirstAdminLogin}>Login</button>
        {:else}
        <button on:click|preventDefault={requestLogin}>Login</button>
        {/if}
    </form>

    <style lang="scss">
        @import '../styles/global.scss';
        @import '../styles/login.scss';
    </style>
</body>
