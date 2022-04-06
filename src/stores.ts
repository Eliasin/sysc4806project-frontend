import { writable } from "svelte/store";

type NotLoggedIn = {
    kind: 'not-logged-in';
};

type AdminLogin = {
    kind: 'admin';
    token: string;
};

type ProfessorLogin = {
    kind: 'professor';
    token: string;
    id: number;
};

type ApplicantLogin = {
    kind: 'applicant';
    token: string;
    id: number;
};

export type LoginType = 'admin' | 'professor' | 'applicant';

export type LoginState = NotLoggedIn | ProfessorLogin | ApplicantLogin | AdminLogin;

export const loginState = writable<LoginState>({ kind: 'not-logged-in' });