<script lang="ts">
    import { getApplicantCVUrl, getApplicantDiplomaUrl, getApplicantGradeAuditUrl } from '../../request/applicant';
    
    export let applicantId: string;
    $: applicantCVUrl = getApplicantCVUrl(applicantId);
    $: applicantDiplomaUrl = getApplicantDiplomaUrl(applicantId);
    $: applicantGradeAuditUrl = getApplicantGradeAuditUrl(applicantId);
</script>

<img alt="Applicant CV" class="applicant-cv" src={applicantCVUrl}>
<img alt="Applicant Diploma" class="applicant-diploma" src={applicantDiplomaUrl}>
<img alt="Applicant Grade Audit" class="applicant-grade-audit" src={applicantGradeAuditUrl}>