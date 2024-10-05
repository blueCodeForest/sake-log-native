import React, { type PropsWithChildren, useEffect } from 'react';
import { db, initialize, useMigrationHelper } from './drizzle';
import { drinksTable } from './schema';

export function DatabaseProvider({ children }: PropsWithChildren) {
  const { success, error: mgError } = useMigrationHelper();

  useEffect(() => {
    const initDb = async () => {
      if (mgError) {
        console.error('Migration error:', mgError);
        return;
      }

      if (!success) {
        return;
      }

      try {
        const drinks = await db.select().from(drinksTable);
        if (drinks.length === 0) {
          await initialize();
        }
      } catch (error) {
        console.log(error);
      }
    };

    initDb();
  }, [success, mgError]);

  return <>{children}</>;
}
