export type AppError = { message?: string; [key: string]: any };

export function formatError(error: AppError | string): string {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    try {
        return JSON.stringify(error);
    } catch {
        return 'An unexpected error occurred';
    }
}
