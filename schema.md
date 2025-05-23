## 🗃️ Database Schema (ER Diagram Format)

```
[User] 1---* [Review] *---1 [Book]
```

### User

| Field    | Type     | Description         |
|----------|----------|---------------------|
| username | String   | Required, unique    |
| email    | String   | Required, unique    |
| password | String   | Hashed using bcrypt |

### Book

| Field   | Type   | Description      |
|---------|--------|------------------|
| title   | String | Required         |
| author  | String | Required         |
| genre   | String | Optional         |

### Review

| Field   | Type     | Description          |
|---------|----------|----------------------|
| userId  | ObjectId | Ref to User          |
| bookId  | ObjectId | Ref to Book          |
| rating  | Number   | Required (1 to 5)    |
| comment | String   | Optional             |

---
