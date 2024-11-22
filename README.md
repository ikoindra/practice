## **POST /users**

Creates a new User and returns the new object.

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

{
username: string,
email: string,
phoneNumber: string,
password: string
}

- **Success Response:**
- **Code:** 200  
  **Content:** { <user_object> }
