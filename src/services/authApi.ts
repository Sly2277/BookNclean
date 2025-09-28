import axios, { AxiosError } from "axios";

// Storage keys
const TOKEN_KEY = "authToken";

// Create axios instance
export const api = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: false,
});

// Attach token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        // Axios v1: headers can be AxiosHeaders or a plain object
        if (config.headers && typeof (config.headers as any).set === "function") {
            (config.headers as any).set("Authorization", `Bearer ${token}`);
        } else {
            config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` } as any;
        }
    }
    return config;
});

// Optional: central error handling
api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// Types
export type SignupPayload = {
    fullName: string;
    email: string;
    password: string;
};

export type LoginPayload = {
	email: string;
	password: string;
};

export type ForgotPasswordPayload = {
	email: string;
};

export type ResetPasswordPayload = {
	token: string; // the reset token from email link
	password: string;
};

export type AuthResponse = {
	accessToken: string; // JWT returned by backend
	// you can extend with additional fields if backend returns them
};

export type UserProfile = {
	id: string | number;
	name: string;
	email: string;
	// extend to match your backend response
};

type AuthListener = (authed: boolean) => void;
const authListeners: AuthListener[] = [];

function notifyAuthChanged() {
    const authed = isAuthenticated();
    authListeners.forEach((l) => {
        try { l(authed); } catch {}
    });
}

export function subscribeAuth(listener: AuthListener): () => void {
    authListeners.push(listener);
    return () => {
        const idx = authListeners.indexOf(listener);
        if (idx >= 0) authListeners.splice(idx, 1);
    };
}

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    notifyAuthChanged();
}

export function getToken(): string | null {
	return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
	localStorage.removeItem(TOKEN_KEY);
    notifyAuthChanged();
}

export function logout() {
    clearToken();
}

// API functions
export async function signup(data: SignupPayload): Promise<void> {
	await api.post("/auth/signup", data);
}

export async function login(data: LoginPayload): Promise<void> {
	const res = await api.post<AuthResponse>("/auth/login", data);
	const token = res.data?.accessToken;
	if (token) setToken(token);
}

export async function forgotPassword(data: ForgotPasswordPayload): Promise<void> {
	await api.post("/auth/forgot-password", data);
}

export async function resetPassword(data: ResetPasswordPayload): Promise<void> {
	await api.post("/auth/reset-password", data);
}

export async function verifyEmail(token: string): Promise<void> {
    await api.post("/auth/verify-email", { token });
}

export async function getProfile(): Promise<UserProfile> {
	const res = await api.get<UserProfile>("/auth/profile");
	return res.data as unknown as UserProfile;
}

// Questions API
export async function submitQuestion(text: string): Promise<void> {
    await api.post("/questions", { text });
}

function decodePayload(): any | null {
    const token = getToken();
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    try {
        return JSON.parse(atob(parts[1]));
    } catch {
        return null;
    }
}

export function isAuthenticated(): boolean {
    const payload = decodePayload();
    if (!payload) return false;
    if (typeof payload.exp === "number") {
        const nowSec = Math.floor(Date.now() / 1000);
        if (payload.exp <= nowSec) return false;
    }
    return true;
}

// Decode JWT payload without verifying signature (frontend convenience)
export function getAuthClaims(): { isAdmin?: boolean } | null {
    const payload = decodePayload();
    if (!payload) return null;
    if (typeof payload.exp === "number") {
        const nowSec = Math.floor(Date.now() / 1000);
        if (payload.exp <= nowSec) return null;
    }
    return { isAdmin: !!(payload.isAdmin || payload.role === "admin") };
}

export function hasAdminAccess(): boolean {
    const claims = getAuthClaims();
    return !!(claims && claims.isAdmin);
}


