import { API_BASE } from '../config';

// Aceita tanto uploads locais servidos pela API quanto URLs externas usadas como seed/demo.
export const resolveImageUrl = (path: string | null | undefined, fallback: string): string => {
    if (!path) return fallback;
    if (path.includes('http')) {
        const idx = path.indexOf('http', 1);
        if (idx !== -1) {
            return decodeURIComponent(path.substring(idx));
        }
        if (path.startsWith('http')) return path;
    }
    return `${API_BASE}${path}`;
};
