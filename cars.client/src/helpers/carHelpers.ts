export default function ensureString(value: string | string[] | undefined): string {
    if (Array.isArray(value)) {
        return value[0] || '';
    }
    return value || '';
}