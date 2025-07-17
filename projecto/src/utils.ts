export const timeStringify = (ms: number, includeHours: boolean = false): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60 % 60);
    const hours = Math.floor(totalSeconds / 3600);

    const pad = (n: number) => n.toString().padStart(2, "0");

    if (includeHours || hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
        return `${pad(minutes)}:${pad(seconds)}`;
    }
};

export const timeTextsify = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60) % 60;
    const hrs = Math.floor(seconds / 3600) % 24;
    const days = Math.floor(seconds / 86400);
    const secs = seconds % 60;

    const parts: string[] = [];

    if (days) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    if (hrs) parts.push(`${hrs} hour${hrs !== 1 ? "s" : ""}`);
    if (mins) parts.push(`${mins} minute${mins !== 1 ? "s" : ""}`);
    if (secs || parts.length === 0) parts.push(`${secs} second${secs !== 1 ? "s" : ""}`);

    return parts.join(" ");
};
