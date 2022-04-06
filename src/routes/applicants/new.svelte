<script lang="ts">
    import { goto } from '$app/navigation';
    import { loginState } from '../../stores';
    import { onMount } from 'svelte';
    import { createApplicant } from '../../request/applicant';
    import { fetchResearchFields } from '../../request/research-field';

    let researchFields: Array<ResearchField> = [];
    let sessionToken = null;
    $: if ($loginState.kind !== 'not-logged-in') {
        sessionToken = $loginState.token;
    }

    async function requestCreateApplicant() {
        let name = (document.getElementById('name') as HTMLInputElement).value;
        let phone_number = (document.getElementById('phone_number') as HTMLInputElement).value; 
        let desired_field_id = parseInt((document.getElementById('desired_field_id') as HTMLInputElement).value);
        let email = (document.getElementById('email') as HTMLInputElement).value;

        if (name === '' || phone_number === '' || email === '') {
            return;
        }

        await createApplicant(sessionToken, { name, phone_number, desired_field_id, email });
    
        goto('/applicants/list');
    }

    onMount(async () => {
        researchFields = await fetchResearchFields(sessionToken);
    });
</script>

<body>
    <button on:click={() => goto('/applicants')}>Back</button>
    <div class="applicant-form-container">
        <form id="applicant-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label for="phone_number">Phone Number</label>
                <input type="text" class="form-control" id="phone_number" placeholder="Enter phone number">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="desired_field_id">Desired Field</label>
                <select class="form-control" id="desired_field_id">
                {#each researchFields as researchField}
                <option value={researchField.id}>{researchField.name}</option>
                {/each}
                </select>
            </div>
            <button type="submit" class="btn btn-primary" on:click={requestCreateApplicant} >Submit</button>
        </form>
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
    </style>
</body>