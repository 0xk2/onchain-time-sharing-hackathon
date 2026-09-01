CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`subject` text NOT NULL,
	`message` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_contacts_created` ON `contacts` (`created_at`);--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`project_name` text NOT NULL,
	`team_name` text NOT NULL,
	`contact_name` text NOT NULL,
	`contact_email` text NOT NULL,
	`members` text NOT NULL,
	`target_user` text NOT NULL,
	`problem` text NOT NULL,
	`product` text NOT NULL,
	`iteration` text NOT NULL,
	`demo_url` text,
	`repo_url` text,
	`public_consent` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_submissions_public_created` ON `submissions` (`public_consent`,`created_at`);