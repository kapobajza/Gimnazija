CREATE TABLE "users" (
  "id" UUID NOT NULL DEFAULT (uuid_generate_v4()),
  "email" VARCHAR(255) NOT NULL,
  "picture" VARCHAR(500),
  "name" VARCHAR(255),
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT "users_pkey" PRIMARY KEY("id"),
  CONSTRAINT "users_email_unique" UNIQUE("email")
);

CREATE TABLE "media_formats" (
  "id" UUID NOT NULL DEFAULT (uuid_generate_v4()),
  "name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT "media_formats_pkey" PRIMARY KEY("id")
);

INSERT INTO "media_formats" ("name") VALUES ('small'), ('medium'), ('large'), ('original');

CREATE TABLE "media" (
  "id" UUID NOT NULL DEFAULT (uuid_generate_v4()),
  "url" VARCHAR(500) NOT NULL,
  "format_id" UUID NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT "media_pkey" PRIMARY KEY("id"),
  CONSTRAINT "media_format_fkey" FOREIGN KEY("format_id") REFERENCES "media_formats"("id") ON DELETE CASCADE
);

CREATE TABLE "employee_groups" (
  "id" UUID NOT NULL DEFAULT (uuid_generate_v4()),
  "name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT "employee_groups_pkey" PRIMARY KEY("id")
);

CREATE TABLE "employees" (
  "id" UUID NOT NULL DEFAULT (uuid_generate_v4()),
  "name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "employee_group_id" UUID NOT NULL,
  CONSTRAINT "employees_pkey" PRIMARY KEY("id"),
  CONSTRAINT "employees_employee_group_fkey" FOREIGN KEY("employee_group_id") REFERENCES "employee_groups"("id") ON DELETE CASCADE
);

CREATE TABLE "posts" (
  "id" UUID NOT NULL DEFAULT (uuid_generate_v4()),
  "title" VARCHAR(255) NOT NULL,
  "content" TEXT NOT NULL,
  "slug" VARCHAR(500) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "user_id" UUID NOT NULL,
  CONSTRAINT "posts_pkey" PRIMARY KEY("id"),
  CONSTRAINT "posts_user_fkey" FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
  CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);

CREATE TABLE "posts_media" (
  "id" UUID NOT NULL DEFAULT (uuid_generate_v4()),
  "post_id" UUID NOT NULL,
  "media_id" UUID NOT NULL,
  CONSTRAINT "posts_media_pkey" PRIMARY KEY("id"),
  CONSTRAINT "posts_media_post_fkey" FOREIGN KEY("post_id") REFERENCES "posts"("id") ON DELETE CASCADE,
  CONSTRAINT "posts_media_media_fkey" FOREIGN KEY("media_id") REFERENCES "media"("id") ON DELETE CASCADE
)