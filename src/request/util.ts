import type { LoginType } from "src/stores";
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
export function createOptionNoEmpty(a: string | number | null | undefined): Option<string> {
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

type SessionTypeResponse = {
    session_type: 'Administrator' | { Applicant: number } | { Professor: number } | null;
};

export async function getLoginType(sessionToken: string): Promise<SessionTypeResponse> {
    let response = await fetch(`${HEROKU_URL}/rest/login`, {
        method: 'GET',
        headers: {
            'X-Session-Token': sessionToken,
        }
    });

    return response.json();
}

type SessionTokenResponse = {
    session_token: string | null;
};

export async function sendLoginRequest(username: string, password: string): Promise<SessionTokenResponse> {
    let response = await fetch(`${HEROKU_URL}/rest/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

    return response.json();
}

export async function doesAdminExist(): Promise<{ result: boolean }> {
    return (await fetch(`${HEROKU_URL}/rest/admin-exists`, {
        method: 'GET',
    })).json();
}

export async function createAdminLogin(username: string, password: string): Promise<void> {
    await fetch(`${HEROKU_URL}/rest/login/admin`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
}