## **GET /users/:id/orders**

Returns all Orders associated with the specified user.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
  orders: [
           {<order_object>},
           {<order_object>},
           {<order_object>}
         ]
}
```

- **Error Response:**
  - **Code:** 404  
    **Content:** `{ error : "User doesn't exist" }`  
    OR
  - **Code:** 401  
    **Content:** `{ error : error : "You are unauthorized to make this request." }`
