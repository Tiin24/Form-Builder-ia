import { pgTable, integer, text, varchar } from "drizzle-orm/pg-core";

export const JsonForms = pgTable("jsonForms", {
  id: integer().primaryKey(),
  jsonform: text("jsonform").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});
