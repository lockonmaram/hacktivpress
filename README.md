# hacktivpress

server routes:

| Route              | HTTP   |         Description        |
|--------------------|--------|:--------------------------:|
| /                  | GET    | Home                       |
| /users/signup      | POST   | Sign up a user             |
| /users/login       | POST   | Log in a user              |
| /users/fblogin     | POST   | log in a user via facebook |
| /articles          | GET    | Get all articles           |
| /articles          | POST   | Add one article            |
| /articles/:id      | GET    | Get one article            |
| /articles/:id      | DELETE | Delete one article         |
| /articles/:id      | PUT    | Update one article         |
| /articles/category | POST   | Get articles by category   |
