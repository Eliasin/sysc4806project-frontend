type ResearchField = {
    id: number;
    name: string;
};

type Some<T> = { Some: T };
type None<T> = {};

type Option<T> = Some<T> | None<T>;

type Applicant = {
    id: number;
    desired_field_id: number;
    name: string;
    phone_number: string;
    email: string;
    cv_blob_id: Option<number>; 
    diploma_blob_id: Option<number>;
    grade_audit_blob_id: Option<number>;
};

type NewApplicant = {
    desired_field_id: number;
    name: string;
    phone_number: string;
    email: string;
};

type EditApplicant = {
    id: number;
    desired_field_id: Option<number>;
    name: Option<string>;
    phone_number: Option<string>;
    email: Option<string>;
    cv_blob_id: Option<number>; 
    diploma_blob_id: Option<number>;
    grade_audit_blob_id: Option<number>;
};

type Professor = {
    id: number;
    name: string;
};