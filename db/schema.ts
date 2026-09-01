import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const submissions = sqliteTable(
  'submissions',
  {
    id: text('id').primaryKey(),
    createdAt: integer('created_at').notNull(),
    projectName: text('project_name').notNull(),
    teamName: text('team_name').notNull(),
    contactName: text('contact_name').notNull(),
    contactEmail: text('contact_email').notNull(),
    members: text('members').notNull(),
    targetUser: text('target_user').notNull(),
    problem: text('problem').notNull(),
    product: text('product').notNull(),
    iteration: text('iteration').notNull(),
    demoUrl: text('demo_url'),
    repoUrl: text('repo_url'),
    publicConsent: integer('public_consent').notNull().default(0),
  },
  (table) => [
    index('idx_submissions_public_created').on(
      table.publicConsent,
      table.createdAt,
    ),
  ],
);

export const contacts = sqliteTable(
  'contacts',
  {
    id: text('id').primaryKey(),
    createdAt: integer('created_at').notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    subject: text('subject').notNull(),
    message: text('message').notNull(),
  },
  (table) => [index('idx_contacts_created').on(table.createdAt)],
);
