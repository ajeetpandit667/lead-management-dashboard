# API Testing Guide

Complete reference for testing all Lead Management Dashboard API endpoints.

## Base URL

**Development**: `http://localhost:5000/api`
**Production**: `https://lead-management-backend.onrender.com/api`

## Authentication Flow

### 1. Login to Get Token

**Endpoint**: `POST /auth/login`

**Request**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "demo",
    "password": "demo123"
  }'
```

**Response** (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "demo",
    "email": "demo@example.com"
  }
}
```

Save the `token` for subsequent requests.

### 2. Register New User

**Endpoint**: `POST /auth/register`

**Request**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "password123"
  }'
```

**Response** (201 Created):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439012",
    "username": "newuser",
    "email": "newuser@example.com"
  }
}
```

## Leads Endpoints

All leads endpoints require authentication. Add header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### 1. Get All Leads (with filters)

**Endpoint**: `GET /leads`

**Query Parameters**:
- `search` (optional): Search term - searches name, email, phone, company
- `stage` (optional): Filter by stage (Lead, Prospect, Qualified, Negotiation, Closed)
- `status` (optional): Filter by status (Active, Inactive, Converted, Lost)
- `source` (optional): Filter by source (Website, Email, Phone, Social Media, Referral)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)
- `sortBy` (optional): Sort field (default: createdAt)
- `sortOrder` (optional): Sort order (asc/desc)

**Examples**:

Get first page of 10 leads:
```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Search for leads:
```bash
curl -X GET "http://localhost:5000/api/leads?search=john" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Filter by stage:
```bash
curl -X GET "http://localhost:5000/api/leads?stage=Qualified" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Multiple filters:
```bash
curl -X GET "http://localhost:5000/api/leads?search=acme&status=Active&stage=Prospect&page=2&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK):
```json
{
  "leads": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@example.com",
      "phone": "+1234567890",
      "company": "Acme Corp",
      "stage": "Qualified",
      "status": "Active",
      "source": "Website",
      "value": 50000,
      "notes": "Lead from Website. Value: $50000",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 500,
    "page": 1,
    "limit": 10,
    "pages": 50
  }
}
```

### 2. Get Single Lead

**Endpoint**: `GET /leads/:id`

**Example**:
```bash
curl -X GET http://localhost:5000/api/leads/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "stage": "Qualified",
  "status": "Active",
  "source": "Website",
  "value": 50000,
  "notes": "Lead from Website. Value: $50000",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 3. Create New Lead

**Endpoint**: `POST /leads`

**Request**:
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "+1987654321",
    "company": "TechFlow Inc",
    "stage": "Lead",
    "status": "Active",
    "source": "Email",
    "value": 25000,
    "notes": "New lead from email campaign"
  }'
```

**Response** (201 Created):
```json
{
  "message": "Lead created successfully",
  "lead": {
    "_id": "507f1f77bcf86cd799439013",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "+1987654321",
    "company": "TechFlow Inc",
    "stage": "Lead",
    "status": "Active",
    "source": "Email",
    "value": 25000,
    "notes": "New lead from email campaign",
    "createdAt": "2024-01-15T11:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

### 4. Update Lead

**Endpoint**: `PUT /leads/:id`

**Request**:
```bash
curl -X PUT http://localhost:5000/api/leads/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "stage": "Negotiation",
    "status": "Active",
    "value": 75000
  }'
```

**Response** (200 OK):
```json
{
  "message": "Lead updated successfully",
  "lead": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "phone": "+1234567890",
    "company": "Acme Corp",
    "stage": "Negotiation",
    "status": "Active",
    "source": "Website",
    "value": 75000,
    "notes": "Lead from Website. Value: $50000",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

### 5. Delete Lead

**Endpoint**: `DELETE /leads/:id`

**Request**:
```bash
curl -X DELETE http://localhost:5000/api/leads/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK):
```json
{
  "message": "Lead deleted successfully"
}
```

### 6. Get Analytics

**Endpoint**: `GET /leads/analytics`

**Request**:
```bash
curl -X GET http://localhost:5000/api/leads/analytics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response** (200 OK):
```json
{
  "totalLeads": 500,
  "convertedLeads": 45,
  "activeLeads": 380,
  "lostLeads": 75,
  "conversionRate": "9.00",
  "leadsByStage": [
    { "_id": "Lead", "count": 150 },
    { "_id": "Prospect", "count": 120 },
    { "_id": "Qualified", "count": 100 },
    { "_id": "Negotiation", "count": 80 },
    { "_id": "Closed", "count": 50 }
  ],
  "leadsBySource": [
    { "_id": "Website", "count": 200 },
    { "_id": "Email", "count": 150 },
    { "_id": "Phone", "count": 80 },
    { "_id": "Social Media", "count": 50 },
    { "_id": "Referral", "count": 20 }
  ]
}
```

### 7. Health Check

**Endpoint**: `GET /health`

**Request**:
```bash
curl -X GET http://localhost:5000/api/health
```

**Response** (200 OK):
```json
{
  "status": "Server is running"
}
```

## Testing with Postman

### Import Collection

1. Open Postman
2. Create new collection: "Lead Management API"
3. Create requests for each endpoint:

### Setup Variables

In Postman, create environment variables:
- `base_url`: `http://localhost:5000/api`
- `token`: (leave empty, will be filled after login)

### Example Requests

**Login Request**:
- Method: POST
- URL: `{{base_url}}/auth/login`
- Body (JSON):
```json
{
  "username": "demo",
  "password": "demo123"
}
```
- Tests (to save token):
```javascript
pm.environment.set("token", pm.response.json().token);
```

**Get Leads Request**:
- Method: GET
- URL: `{{base_url}}/leads`
- Headers:
  - Authorization: `Bearer {{token}}`

## Error Responses

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```
or
```json
{
  "message": "Token is not valid"
}
```

### 404 Not Found
```json
{
  "message": "Lead not found"
}
```

### 400 Bad Request
```json
{
  "message": "Missing required fields"
}
```

### 500 Server Error
```json
{
  "message": "Internal server error"
}
```

## Testing Strategy

### 1. Test Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Use token in subsequent requests
- [ ] Verify token expiration

### 2. Test Lead CRUD
- [ ] Create new lead
- [ ] Read all leads
- [ ] Read single lead
- [ ] Update lead
- [ ] Delete lead

### 3. Test Filtering
- [ ] Filter by stage
- [ ] Filter by status
- [ ] Filter by source
- [ ] Combine multiple filters

### 4. Test Search
- [ ] Search by name
- [ ] Search by email
- [ ] Search by phone
- [ ] Search by company
- [ ] Search with partial text

### 5. Test Pagination
- [ ] Get page 1
- [ ] Get page 2
- [ ] Verify page size
- [ ] Verify total count

### 6. Test Analytics
- [ ] Get total leads
- [ ] Get converted leads
- [ ] Get leads by stage
- [ ] Get leads by source

## Performance Testing

### Load Testing
Use tools like Apache JMeter or LoadRunner:
- Simulate 100+ concurrent users
- Test pagination with large datasets
- Monitor response times
- Check database query performance

### Query Optimization
Add MongoDB indexes:
```bash
db.leads.createIndex({ "email": 1 })
db.leads.createIndex({ "firstName": 1, "lastName": 1 })
db.leads.createIndex({ "stage": 1 })
db.leads.createIndex({ "status": 1 })
```

## Common Test Cases

### Scenario 1: New User Journey
1. Register new account
2. Login
3. View all leads
4. Search for a lead
5. View lead details
6. Logout

### Scenario 2: Lead Filtering
1. Login
2. Filter by "Qualified" stage
3. Filter by "Active" status
4. Combine filters
5. Clear filters

### Scenario 3: Lead Management
1. Login
2. Create new lead
3. Update lead stage
4. View lead details
5. Delete lead
6. Verify deletion

### Scenario 4: Pagination
1. Login
2. Get leads (default 10 per page)
3. Go to page 2
4. Go to page 5
5. Return to page 1

## Debugging Tips

### Check Request/Response
```bash
# With verbose output
curl -v -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Check Logs
- Backend: Check terminal output
- Frontend: Check browser console (F12)
- MongoDB: Check Atlas logs

### Enable Debug Mode
Add logging to backend:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

## API Documentation Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /auth/login | No | User login |
| POST | /auth/register | No | User registration |
| GET | /leads | Yes | Get all leads |
| POST | /leads | Yes | Create lead |
| GET | /leads/analytics | Yes | Get analytics |
| GET | /leads/:id | Yes | Get single lead |
| PUT | /leads/:id | Yes | Update lead |
| DELETE | /leads/:id | Yes | Delete lead |

## Resources

- [Postman Documentation](https://learning.postman.com)
- [Curl Documentation](https://curl.se/docs)
- [REST API Best Practices](https://restfulapi.net)
- [MongoDB Query Reference](https://docs.mongodb.com/manual/reference)

---

Happy testing! 🚀

For issues, check the README.md or DEPLOYMENT.md files.
