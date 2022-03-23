<script>
    import { page } from '$app/stores';
    import { HEROKU_URL, VERCEL_URL } from '../../globals';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    async function editProfessor () {
        const applicantJSON = JSON.stringify({
            name: document.getElementById('name').value,
        })
        
        if (applicantJSON.includes('""')) {
            return;
        }
        
        await fetch(HEROKU_URL + '/rest/professor', {
            method: 'POST',
            body: applicantJSON,
        });
    
        goto(VERCEL_URL + '/professors/list');
    }

    async function fetchProfessor() {
        const response = await fetch(HEROKU_URL + '/rest/professor_research_fields',
        {
            method: 'GET',
        });
        return response.json();
    }

    onMount(() => {
        fetchProfessor().then(data => {
            page.subscribe(currentPage => console.log(currentPage));
            /*
            const select = document.getElementById($page.);
            data.forEach(professor => {
                const option = document.createElement('option');
                option.value = professor.id;
                option.text = professor.name;
                select.appendChild(option);
            });
            */
        });
    })

    
    async function fetchResearchFields() {
        const response = await fetch(HEROKU_URL + '/rest/professor_research_fields',
        {
            method: 'GET',
        });
        return response.json();
    }

    onMount(() => {
        fetchResearchFields().then(data => {
            const select = document.getElementById('field_id');
            data.forEach(field => {
                const option = document.createElement('option');
                option.value = field.id;
                option.text = field.name;
                select.appendChild(option);
            });
        });
    })

    function doBack() {
        goto(VERCEL_URL + '/professors/');
    }

</script>

<body>
    <div class="professor-form-container">
        <form id="professor-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label for="field_id">Field</label>
                <select class="form-control" id="field_id" />
            </div>
            <button type="submit" class="btn btn-primary" onclick="editProfessor()">Submit</button>
        </form>
    </div>
    <button id="back-button" on:click={doBack}>Back</button>
</body>

<style>
    
</style>