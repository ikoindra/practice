## **POST /register**

Add new user

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  None`
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  user: [
            {
             "username": "string",
             "email": "string",
             "phoneNumber": "string",
             "password": "string"
            }

         ]
}
```

- **Error Response:**
  - **Code:** 400 Bad Request  
    **Content:** `{ error : "Invalid input data" }`  
    OR
  - **Code:** 409 Conflict  
     **Content:** `{ error : "Email or username already exists" }`
    ~~
