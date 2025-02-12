import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const JsonForms = pgTable("jsonForms", {
  id: varchar("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  theme:varchar('theme'),
  background:varchar('background'),
  style:varchar('style'),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  enabledSignIn:boolean('enabledSignIn').default(false)
});
