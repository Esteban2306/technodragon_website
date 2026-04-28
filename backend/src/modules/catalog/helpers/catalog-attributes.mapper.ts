export function mapJsonToAttributes(json: Record<string, unknown>): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  if (!json || typeof json !== "object") return result;

  for (const key of Object.keys(json)) {
    const value = json[key];

    if (Array.isArray(value)) {
      result[key] = value.map(v => String(v));
    } else if (typeof value === "string") {
      result[key] = [value];
    } else {
      result[key] = [];
    }
  }

  return result;
}