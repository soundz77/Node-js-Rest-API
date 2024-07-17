# Express REST api template

A modular Express REST API featuring logging (to file/console) and global error handling. Envalid is used for environment variable validation.

## Getting Started

1. **Clone the repository**:
   ```
   git clone git://github.com/soundz77/Express-app-template.git
   ```
2. **Install dependencies**:

   ```
   npm install
   ```

3. **Set up environment variables**:
   Rename env.example to .env
   Add the required environment variables in the .env file

4. **Run the app**:
   - For linting: npm run lint
   - For development mode: npm run dev
   - For production mode: npm run start

The app starts on http://localhost:3000.

## Project Structure

- Logging and Error Messages: Defined in src/utils/logging/messages/
- Server Configuration: Handled in server.js
- Middleware and Routes Configuration: Handled in app.js (see src/config and src/config/middleware)
- Error Handling: The AppError class takes an error message (defined in src/logging/messages/) and a status code.

## CRUD Operations

**Get**

_GET by ID_

Endpoint: GET /api/v1/users?id=MONGOID

_GET All_

Endpoint: GET /api/v1/users

_API Features_

_Sorting (ASC or DESC)_

GET /api/v1/users?sort=FIELD

FIELD can be username, age, or email. Use -FIELD for ascending sort.

_Field Limiting_

GET /api/v1/users?limitFields=FIELD

FIELD can be username, age, email, or avatar.

_Pagination_

GET /api/v1/users?page=1&limit=2

maxPage and maxLimit are defined in config/apiFeaturesConfig.js.

_Search_

GET /api/v1/users/getAll?searchField=FIELD&searchTerm=TERM

FIELD can be username, age, email, createdAt, updatedAt, or role.

**Create**

Endpoint: POST /api/v1/users

JSON Body:
Single and multiple users:

```
{
"users": [
{
"username": "bob",
"email": "bob@email.com",
"emailConfirm": "bob@email.com",
"password": "aD#12s4dX6",
"passwordConfirm": "aD#aD#12s4dX6",
"age": 24
},
{
   ...
}
]
}
```

**Update**

_Update by ID_

Endpoint: PATCH /api/v1/users/MONGOID
Request Body:

```
{
"foo": "bar" }
```

_Update All_

Endpoint: PUT /api/v1/users
Request Body:

```
{ "foo": "bar" }
```

**Delete**

_Delete by ID_

Endpoint: DELETE /api/v1/users?id=MONGOID

_Delete All / Database_

Endpoint: DELETE /api/v1/users
