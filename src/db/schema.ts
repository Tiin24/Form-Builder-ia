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

export const userResponses = pgTable("userResponses", {
  id: varchar("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  formRef: varchar("formRef").notNull().references(() => JsonForms.id),
});