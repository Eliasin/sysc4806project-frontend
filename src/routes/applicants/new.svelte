<script>
    import { HEROKU_URL, VERCEL_URL } from '../../globals';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    async function createApplicant() {
        const applicantJSON = JSON.stringify({
            name: document.getElementById('name').value,
            phone_number: document.getElementById('phone_number').value,
            desired_field_id: parseInt(document.getElementById('desired_field_id').value),
            email: document.getElementById('email').value,
        })
        
        if (applicantJSON.includes('""')) {
            return;
        }
        
        await fetch(HEROKU_URL + '/rest/applicant', {
            method: 'POST',
            body: applicantJSON,
        });
    
        goto(VERCEL_URL + '/applicants/list');
    }

    async function fetchResearchFields() {
        const response = await fetch(HEROKU_URL + '/rest/research-fields',
        {
            method: 'GET',
        });
        return response.json();
    }

    onMount(() => {
        fetchResearchFields().then(data => {
            const select = document.getElementById('desired_field_id');
            data.forEach(field => {
                const option = document.createElement('option');
                option.value = field.id;
                option.text = field.name;
                select.appendChild(option);
            });
        });
    })
</script>

<body>
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
                <select class="form-control" id="desired_field_id" />
            </div>
            <button type="submit" class="btn btn-primary" on:click={createApplicant} >Submit</button>
        </form>
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
    </style>
</body>