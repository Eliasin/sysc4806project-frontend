import { HEROKU_URL } from "../globals";

/**
 * Creates an option from a nullable value.
 * @param a a value
 * @returns an option
 */
export function createOption<T>(a: T | null | undefined): Option<T> {
    if (a) {
        return {
            Some: a,
        };
    }

    return { None: {} };
}

/**
 * Creates an option from a nullable string. Empty strings are converted
 * to empty options.
 * @param a a string
 * @returns an option
 */
export function createOptionNoEmpty(a: string | null | undefined): Option<string> {
    if (a && a !== '') {
        return {
            Some: a,
        };
    }

    return { None: {} };
}

/**
 * Creates an empty option
 * @returns empty option
 */
export function getNone<T>(): Option<T> {
    return { None: {} };
}

type FailedLogin = {
    kind: 'failed';
    error: string;
};

export type ApplicantLogin = {
    kind: 'applicant';
    id: number;
};

export type ProfessorLogin = {
    kind: 'professor';
    id: number;
};

export type AdminLogin = {
    kind: 'admin';
};

export type LoginResponse = FailedLogin | ApplicantLogin | ProfessorLogin | AdminLogin;

export async function sendLoginRequest(username: string, password: string): Promise<LoginResponse> {
    return (await fetch(`${HEROKU_URL}/rest/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    })).json();
}