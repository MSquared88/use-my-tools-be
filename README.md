# API Documentation

#### 1️⃣ Backend delpoyed at https://project-use-my-tools.herokuapp.com <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server

## 2️⃣ Endpoints

#### Tools Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/tools`                | all available  | Returns all tools available for rent.        |
| GET    | `/tools/:toolId`        | owner          | Get tool by id.                              |
| GET    | `/user-tools`           | owner          | Gets all user tools from userid in headers.  |
| POST   | `/tools`                | owner          | Add tool.                                    |
| PUT    | `/tools/uploadImage/:toolId`| owner      | Adds image to tool                           |
| PUT    | `/tools/deleteImage/:toolId`| owner      | Deletes image url from tool                  |



#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST    | `/user/register`       | all users           | Returns info for the logged in user.               |
| POST    | `/user/login`          | owners              | Returns all users for an organization.             |
| GET    | `/users/restricted`     | owners              | Returns info for a single user.                    |
| POST   | `/users/register/owner` | none                | Creates a new user as owner of a new organization. |
| DELETE | `/users/:userId`        | owners, supervisors | Deletes user                                       |

# Data Model

#### 2️⃣ TOOLS

---

```
{
  id: UUID
  owner_id: UUID foreign key in USERS table
  img_url: STRING
  tool_name: STRING
  tool_type: STRING
  tool_description: STRING
  available: BOOLEAN
  rental_cost: INT
}
```


#### 2️⃣ REQUESTS

---

```
{
  id: UUID
  requestor_id: UUID foreign key in USERS table
  tool_id:  UUID foreign key in TOOLS table
  request_length: STRING
}
```

#### USERS

---

```
{
  id: UUID
  user_name: STRING
  email: STRING
  street: STRING
  apartment: STRING
  city: STRING
  email: STRING
  state: STRING
  zip: INT
}
```

## 2️⃣ Actions

`getTools()` -> Returns all tools where available is true

`getToolsById(id)` -> Returns a single tool by ID

`getUserTools(user)` -> Returns all users tools

`addTool(tool)` ->  Adds tool by user id in headers

`updateTool(id, updatedTool)` -> Updates an tool by ID

`deleteTool(id)` -> Deletes tool by ID
<br>
<br>
<br>
`getBy(filter)` -> if no param all users

`add(user) ` --> Creates a new user and returns that user.

`remove(id)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

 * USER = DB user name
 * PASSWORD = DB password word
 * ACCESSKEY = AWS access key
 * AWSSECRET = AWS secret
 * DB_ENV =   environment
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).
