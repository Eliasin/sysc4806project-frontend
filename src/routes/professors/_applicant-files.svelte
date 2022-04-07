<script lang="ts">
    import { getApplicantCVUrl, getApplicantDiplomaUrl, getApplicantGradeAuditUrl } from '../../request/applicant';
    
    export let applicantId: string;
    $: applicantCVUrl = getApplicantCVUrl(applicantId);
    $: applicantDiplomaUrl = getApplicantDiplomaUrl(applicantId);
    $: applicantGradeAuditUrl = getApplicantGradeAuditUrl(applicantId);
</script>

<a class="applicant-cv" href={applicantCVUrl} download="applicant_cv" target="_blank"><button>Download CV</button></a>
<a class="applicant-diploma" href={applicantDiplomaUrl} download="applicant_diploma" target="_blank"><button>Download Diploma</button></a>
<a class="applicant-grade-audit" href={applicantGradeAuditUrl} download="applicant_aduit" target="_blank"><button>Download Audit</button></a>