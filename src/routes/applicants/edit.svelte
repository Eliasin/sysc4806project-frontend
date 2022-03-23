<script>
    import { HEROKU_URL, VERCEL_URL } from '../../globals';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let applicantId;
    page.subscribe(currentPage => { applicantId = currentPage.url.searchParams.get('id'); });

    async function fetchResearchFields() {
        const response = await fetch(HEROKU_URL + '/rest/research-fields',
        {
            method: 'GET',
        });
        return response.json();
    }

    async function fetchApplicant() {
        const response = await fetch(HEROKU_URL + '/rest/applicant?id=' + applicantId,
        {
            method: 'GET',
        });
        return response.json();
    }

    async function editApplicant(e) {
        e.preventDefault();

        const nameCandidate = document.getElementById('name').value;
        const phoneNumberCandidate = document.getElementById('phone_number').value;
        const desiredFieldIdCandidate = parseInt(document.getElementById('desired_field_id').value);
        const emailCandidate = document.getElementById('email').value;
        const applicantFieldId = await fetchApplicant().then(data => {
            return data.id;
        });

        const applicantJSON = JSON.stringify({
            name: nameCandidate !== '' ? nameCandidate : null,
            phone_number: phoneNumberCandidate !== '' ? phoneNumberCandidate : null,
            desired_field_id: desiredFieldIdCandidate !== applicantFieldId ? desiredFieldIdCandidate : null,
            email: emailCandidate !== '' ? emailCandidate : null,
        })
        
        if (applicantJSON.includes('""')) {
            return;
        }
        
        await fetch(HEROKU_URL + '/rest/applicant?app_id=' + applicantId, {
            method: 'PUT',
            body: applicantJSON,
        });
    
        goto(VERCEL_URL + '/applicants/list');
    }

    async function uploadFile(e) {
        e.preventDefault();

        let formData = new FormData();
        
        const cvFile = document.getElementById('cv-file');
        if(cvFile.files.length) {
            formData.append('cv-file', cvFile.files[0]);
        }

        const diplomaFile = document.getElementById('diploma-file');
        if(diplomaFile.files.length) {
            formData.append('diploma-file', diplomaFile.files[0]);
        }

        const gradeAuditFile = document.getElementById('grade-audit-file');
        if(gradeAuditFile.files.length) {
            formData.append('grade-audit-file', gradeAuditFile.files[0]);
        }

        await fetch(HEROKU_URL + '/rest/applicant/files?applicant_id=' + applicantId,
            {
                body: formData,
                method: "post",
            }
        );
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
    });
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
            <button type="submit" class="btn btn-primary" on:click={editApplicant}>Submit</button>
        </form>
        <form id="file-form">
            <input type="file" name="cv-file" id="cv-file" />
            <input type="file" name="diploma-file" id="diploma-file" />
            <input type="file" name="grade-audit-file" id="grade-audit-file" />
            <input type="button" value="Submit" on:click={uploadFile}/>
        </form>
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
    </style>
</body>