export function mapJsonToAttributes(
    input: unknown
): Record<string, string> {

    if (!input || typeof input !== "object") {
        return {};
    }

    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(input)) {

        if (Array.isArray(value) && value.length > 0) {
            const firstValid = value.find(v => typeof v === "string");
            if (firstValid) {
                result[key] = firstValid;
            }
        }

        else if (typeof value === "string") {
            result[key] = value;
        }
    }

    return result;
}