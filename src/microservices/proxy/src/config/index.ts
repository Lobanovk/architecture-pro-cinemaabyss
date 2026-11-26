export const port = Number(process.env.PORT || 8000);
export const MONOLITH_URL = process.env.MONOLITH_URL ?? "";
export const MOVIES_SERVICE_URL = process.env.MOVIES_SERVICE_URL ?? "";
export const GRADUAL_MIGRATION = process.env.GRADUAL_MIGRATION === 'true';
export const MOVIES_MIGRATION_PERCENT = Number(process.env.MOVIES_MIGRATION_PERCENT ?? 0);