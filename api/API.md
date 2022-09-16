# Structure of the API

## General Functions
 - Sign up (Email (OTP might be added later or verify email option),password) 
 - Login
 - Insert Entry
 - Read Entries
 - Delete Entry 
 - Get Graph data in terms of x any y axis
 - Logout
 - Delete Account
 - Search 


## Signup 
 `POST ./api/signup`

 
 **Request**:
 ```
 {  
    email: string;    
    password: string;
    
 }
```
 **Response**:  
 ```
{  
    Token:string    
 }
```
 ## Login
 `POST ./api/login`
 
 **Request**:
 ```
 {  
    email: string;    
    password: string;
    
 }
```
 **Response**:  
 ```
{  
    Token:string    
 }
```

 ## logout
 `DELETE ./api/login`
 
 **Request**:
 ```
 {  
    token:string    
 }
```
## Delete Account
`DELETE ./api/signup`

 **Request**:
 ```
 {  
    token:string
    email:string;
    password:string;
 }
```

## Insert Data
`POST ./api/entry`

**Request** 
```
{
    token:string;
    amount:number;
    description?:number;
}
```
**Response** 
```
{
    entryID:string;
}
```
## Read Entries
`GET ./api/entry`
**Request** 
```
{
    token:string;
    maxResults:number; //defaults to 15
}
```
**Response**
```
{
    entries:Entry[];
}

```
## Delete Entry
`DELETE ./api/entry`

**Request**
```
{
    token:string;
    entryID:string;
}
```

## Search
`GET ./api/entry/search?q=XXX`
**Request**
```
{
    token:string;
    maxResults?:number; // defaults to 50
}
```
# DataTypes

## User
```
{
    userID:string;
    passwordHash:string;
    email:string;
}
```

## Entry 
```
{
    userID:string;
    entryID:string;
    amount:number;  // ranges between -100,000 to +100,000
    description?:string; // max 100 characters are allowed
    date: Date
}
```
