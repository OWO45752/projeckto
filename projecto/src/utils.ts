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
