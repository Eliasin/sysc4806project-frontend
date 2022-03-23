<script>
    import { HEROKU_URL, VERCEL_URL } from '../../globals';
    import { goto } from '$app/navigation';

    async function createProfessor() {
        const professorJSON = JSON.stringify({
            name: document.getElementById('name').value,
        })
        
        if (professorJSON.includes('""')) {
            return;
        }
        
        await fetch(HEROKU_URL + '/rest/professor', {
            method: 'POST',
            body: professorJSON,
        });
    
        goto(VERCEL_URL + '/professors/list');
    }

    function doBack() {
        goto(VERCEL_URL + '/professors/');
    }
</script>

<body>
    <div class="professor-form-container">
        <button id="back-button" on:click={doBack}>Back</button>
        <form id="professor-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <button type="submit" class="btn btn-primary" on:click={createProfessor}>Submit</button>
        </form>
    </div>

    <style lang="scss">
        @import '../../styles/global.scss';
    </style>
</body>