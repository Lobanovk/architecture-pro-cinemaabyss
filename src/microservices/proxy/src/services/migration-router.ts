export const useMicroService = (gradual_migration: boolean, migrationPercent: number) => {
    if (!gradual_migration) return true;
    
    if (
        !Number.isFinite(migrationPercent) || migrationPercent < 0 || migrationPercent > 100
    ) {
        throw new Error("Invalid migration percent");
    }

    const random = Math.floor(Math.random() * 100) + 1;

    return random <= migrationPercent;
}

