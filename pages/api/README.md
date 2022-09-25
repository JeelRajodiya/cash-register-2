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
 - Get Graph


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
    session:string    
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
    session:string    
 }
```

 ## logout
 `DELETE ./api/login`
 
 **Request**:
 ```
 {  
    session:string    
 }
```
## Delete Account
`DELETE ./api/signup`

 **Request**:
 ```
 {  
    session:string
    email:string;
    password:string;
 }
```

## Insert Data
`POST ./api/entry`

**Request** 
```
{
    session:string;
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

`GET ./api/entry?session=XXXX-XXXX-XXXX-XXXX&&maxResults=n`
**Request** 
```
{
    session:string;
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
    session:string;
    entryID:string;
}
```

## Search
`GET ./api/search?q=XXX`
**Request**
```
{
    session:string;
    maxResults?:number; // defaults to 50
}
```
## Get Graph 

`GET ./api/graph`
**Request**
```
{
    session:string;
    filterDate:Date
    
}
```

# DataTypes
## User
```
{
    userID:string;
    passwordHash:string;
    email:string;
    sessions:string[];
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
