# Todo App

Minimal laboratory project for practice and experimentation.

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/Davide-Barca/todo-app.git
cd todo-app
npm i
```

Prepare Better Auth database:

```
# This command generates the SQL migration file
npx @better-auth/cli generate

# This command creates the required tables directly in the database.
npx @better-auth/cli migrate
```
