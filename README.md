# Top Secret

### Acceptance Criteria
Approach this deliverable vertically, meaning that you should write a test and any model/controller methods for a single route (i.e. not writing all the tests, then all the models, then all the controllers). Your git commit history needs to show a vertical approach.

- Git history shows a vertical approach
- Users can register using email & password
- Users can log in using email & password
- Passwords are hashed when stored in the database
- User information is stored in a cookie when signed in
- Cookie contains a signed JWT of the user record
   - The User model instance should be an object with an id & email, but without the password hash!
- Logged in users can view top secrets by visiting /api/v1/secrets
- Logged in users can create new secrets by POSTing to /api/v1/secrets
- STRETCH: Only allow user sign ups if their email ends with @defense.gov
- STRETCH: User model stores the user’s first and last name as well

### Rubric

| Task  |   |   |   |  Points |
|---|---|---|---|---|
| POST { email, password } to /api/v1/users/sessions logs in a user |   |   |   |  4 |
| DELETE /api/v1/users/sessions logs out a user |   |   |   |   4|
| GET /api/v1/secrets returns a list of secrets ([{ title, description, createdAt }])  |   |   |   | 2  |
| POST { email, password } to /api/v1/users creates a new user||||4|
| Each route is tested||||2|
| Git history shows vertical approach||||4|
| Password is stored in plaintext/password hash is stored in the JWT||||-5|