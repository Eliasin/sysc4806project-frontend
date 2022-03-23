<svelte:head>
    <title>SYSC4806 Project - List Applicants</title>
</svelte:head>

<script>
    import { HEROKU_URL, VERCEL_URL } from '../../globals';
    import { browser } from '$app/env';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    async function fetchApplicants() {
        const response = await fetch(HEROKU_URL + '/rest/applicants',
        {
            method: 'GET',
        });
        return response.json();
    }

    function doBack() {
        goto(VERCEL_URL + '/applicants/');
    }

    onMount(() => {
        fetchApplicants().then(data => {
            const list = document.getElementById('applicant-list');

            data.forEach(applicant => {
                const li = document.createElement('li');
                li.class = 'applicant-list-item';
                
                const id = document.createElement('span');
                id.innerText = applicant.id;
                li.appendChild(id);
                
                const desiredFieldId = document.createElement('span');
                desiredFieldId.innerText = applicant.desired_field_id;
                li.appendChild(desiredFieldId);
                
                const name = document.createElement('span');
                name.innerText = applicant.name;
                li.appendChild(name);
                
                const phoneNumber = document.createElement('span');
                phoneNumber.innerText = applicant.phone_number;
                li.appendChild(phoneNumber);
                
                const email = document.createElement('span');
                email.innerText = applicant.email;
                li.appendChild(email);

                const editButton = document.createElement('button');
                editButton.onclick = () => goto(VERCEL_URL + '/applicants/edit?id=' + applicant.id);
                editButton.textContent = 'Edit';
                li.appendChild(editButton);
                
                list.appendChild(li);
            });
        });
    })
</script>

<body>
    <div class="applicant-list-container">
        <button id="back-button" on:click={doBack}>Back</button>
        <ul id="applicant-list" />
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
    </style>
</body>

