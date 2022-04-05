import { writable } from "svelte/store";
import type { AdminLogin, ApplicantLogin, ProfessorLogin } from "./request/util";

type NotLoggedIn = {
    kind: 'not-logged-in';
};

export type LoginState = NotLoggedIn | ProfessorLogin | ApplicantLogin | AdminLogin;

export const loginState = writable<LoginState>({ kind: 'not-logged-in' });