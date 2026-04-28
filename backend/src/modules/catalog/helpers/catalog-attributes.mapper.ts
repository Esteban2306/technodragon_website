import { JsonValue } from '@prisma/client/runtime/library';

export function mapJsonToAttributes(json: JsonValue): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  if (!json || typeof json !== "object" || Array.isArray(json)) return result;

  for (const key of Object.keys(json)) {
    const value = (json as Record<string, unknown>)[key];

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