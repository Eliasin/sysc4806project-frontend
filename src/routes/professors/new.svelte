<script lang="ts">
    import { goto } from '$app/navigation';
    import { loginState } from '../../stores';
    import { createProfessor } from '../../request/professor';

    let sessionToken = null;
    $: if ($loginState.kind !== 'not-logged-in') {
        sessionToken = $loginState.token;
    }

    async function requestCreateProfessor() {
        let name = (document.getElementById('name') as HTMLInputElement).value;
        await createProfessor(sessionToken, name);

        goto('/professors/');
    }


    function doBack() {
        goto('/professors/');
    }
</script>

<body class="spaced-column">
    <button id="back-button" on:click={doBack}>Back</button>
    <div id="professor-creation-form-container">
        <form id="professor-form">
            <span>Create Professor</span>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <button type="submit" class="btn btn-primary" on:click={requestCreateProfessor}>Submit</button>
        </form>
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
        @import '../../styles/professor.scss';
    </style>
</body>