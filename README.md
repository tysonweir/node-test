### Node.js API Documentation

This project is a simple Node.js API to manage users, companies, and employees in a company. The API has three main endpoints:

Add User as an Employee to a Company
Create an Employee with specified User and Company
Get the number of Employees in a specified Company

Here are the details of these endpoints:

1. Make a User an Employee of a Company

Endpoint

PUT /user/:userId/company/:companyId

cURL command

```
curl -X PUT http://localhost:3000/user/1/company/1
```

2. This will post a new employee to the company

Endpoint

POST /user/:userId/company/:companyId/employee

cURL command

```
curl -X POST http://localhost:3000/user/1/company/1/employee
```

3. Get the number of Employees in a specified Company

Endpoint

GET /company/:companyId/employees

cURL command

```
curl -X GET http://localhost:3000/company//employees
```

4. Get number of companies for each business type

Endpoint

GET /companies/businessTypes

```
curl -X GET http://localhost:3000/companies/businessType
```

### Other curl options

added a address

```
curl -X POST -H "Content-Type: application/json" -d '{
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "userId": 1,
    "companyId": 1
}' http://localhost:3000/addresses
```

added a company

```
curl -X POST -H "Content-Type: application/json" -d '{
    "businessName": "Acme Corp",
    "businessType": "Ecommerce"
}' http://localhost:3000/company
```

added a user

```
curl -X POST -H "Content-Type: application/json" -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
}' http://localhost:3000/users
```

Replace `` with the actual ID.

Please replace localhost:3000 with your actual server URL. If any additional headers or parameters are required, please include them in the cURL commands.

The responses from these endpoints will be JSON objects containing either the requested data, a success message, or an error message.
