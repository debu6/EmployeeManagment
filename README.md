---Follow below steps to run project---
1. From CMD, in the root directory run "npm i"
2. run "npm start"
3. check "http://localhost:3000/" this URL

---Email check---
after add employee you can check in the toster, console and also in a specific email from yopmail.
open "employeemanagment@yopmail.com" from yopmail and check in the inbox 

---Data Persistence---
for this I have used redux-persist in the store.js file, 
it will save the data of the reducer in the localStorage,we don't need to write LocalStorage.setItem() for many times.

---backend---
backend is not implemented here, But my approch is,
when we can use asyncThunk for API call, 
when we are creating employee that time we have to call a post api, using asyncThunk, 
In the table component, we need to also call an get API in in the useEfffect using asyncThunk, that will fetch all employees 







