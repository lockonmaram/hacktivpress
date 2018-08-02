# hacktivpress

server routes:

| Route                 | HTTP   |          Description         |
|-----------------------|--------|:----------------------------:|
| /api/                 | GET    | Home                         |
| /api/books            | GET    | Get all books data           |
| /api/seed             | GET    | Seed dummy data              |
| /api/books/:id        | GET    | Get a book data              |
| /api/books/addOne     | POST   | Add a book data              |
| /api/books/addMany    | POST   | Add many book data (in json) |
| /api/books/:id/delete | DELETE | Delete a book data           |
| /api/books/:id/update | PUT    | Update a book data           |
