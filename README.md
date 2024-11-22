## **POST /register**

Add new user

- **URL Params**  
  None
- **Data Params**

```
  {
    "name": "string",
    "email": "string",
    "phoneNumber": "string",
    "password": "string"
  }
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <user_object> }`

- **Error Response:**
  - **Code:** 400 Bad Request  
    **Content:** `{ error : "Invalid input data" }`  
    OR
  - **Code:** 409 Conflict  
     **Content:** `{ error : "Email or username already exists" }`
    ~~

## **POST /login**

Login user

- **URL Params**  
  None
- **Data Params**

```
  {
    "email": "string",     // Required if phoneNumber is not provided
    "phoneNumber": "string", // Required if email is not provided
    "password": "string"
  }
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <user_object> }`

- **Error Response:**
  - **Code:** 400 Bad Request  
    **Content:** `{ error : "Invalid input data" }`  
    OR
  - **Code:** 404 Not Found  
     **Content:** `{ error: "User not found" }`
    ~~
