create table
    "list" (
        "id" text not null primary key,
        "userId" text not null references "user" ("id") on delete cascade,
        "title" text not null,
        "createdAt" date not null,
        "updatedAt" date not null
    );

create table
    "task" (
        "id" text not null primary key,
        "listId" text not null references "list" ("id") on delete cascade,
        "userId" text not null references "user" ("id") on delete cascade,
        "title" text not null,
        "description" text,
        "isDone" integer not null default 0,
        "createdAt" date not null,
        "updatedAt" date not null
    );

create index "list_userId_idx" on "list" ("userId");

create index "task_listId_idx" on "task" ("listId");

create index "task_userId_idx" on "task" ("userId");