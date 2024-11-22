## **POST /register**

Add new user

- **URL Params**  
  None
- **Data Params**

```
  {
    "name": "string",
    "last_name": "string",
    "email": "string",
    "phone_number": "string",
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

## **POST /register-otp**

Send OTP

- **URL Params**  
  None
- **Data Params**

```
  {
    "otp-token": "string" // The OTP sent to the user's email or phone number
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

## **POST /login**

Login user

- **URL Params**  
  None
- **Data Params**

```
  {
    "email": "string",
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

## **POST /reset-password**

User forgot password

- **URL Params**  
  None
- **Data Params**

```
  {
    "email": "string",
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

## **PUT /change-password**

User forgot password

- **URL Params**  
  None
- **Data Params**

```
  {
    "password": "string",
  }
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:** `{ <user_object> }`

- **Error Response:**
  - **Code:** 400 Bad Request  
    **Content:** `{ error : "Password and confirm password don't match" }`
