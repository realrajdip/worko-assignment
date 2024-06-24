const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');

// Test user data
const testUser = {
    email: 'test@example.com',
    name: 'Test User',
    age: 30,
    city: 'Test City',
    zipCode: '12345'
};

let token;

beforeAll(async () => {
    // Connect to test database
    await mongoose.connect('mongodb://localhost:27017/worko_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    // Register a test user and get JWT token
    await request(app)
        .post('/worko/user')
        .send(testUser);

    // Login to get JWT token for further requests
    const loginResponse = await request(app)
        .post('/login')
        .send({ email: testUser.email });

    token = loginResponse.body.token;
});

afterAll(async () => {
    // Clean up and disconnect from test database
    await User.deleteMany();
    await mongoose.connection.close();
});

describe('User API Tests', () => {
    it('should create a new user', async () => {
        const newUser = {
            email: 'newuser@example.com',
            name: 'New User',
            age: 25,
            city: 'New City',
            zipCode: '54321'
        };

        const response = await request(app)
            .post('/worko/user')
            .send(newUser)
            .set('Authorization', token);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.email).toBe(newUser.email);
    });

    it('should get all users', async () => {
        const response = await request(app)
            .get('/worko/user')
            .set('Authorization', token);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get user by id', async () => {
        const allUsersResponse = await request(app)
            .get('/worko/user')
            .set('Authorization', token);
        
        const userId = allUsersResponse.body[0]._id;

        const response = await request(app)
            .get(`/worko/user/${userId}`)
            .set('Authorization', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', userId);
    });

    it('should update user by id', async () => {
        const allUsersResponse = await request(app)
            .get('/worko/user')
            .set('Authorization', token);
        
        const userId = allUsersResponse.body[0]._id;

        const updatedUser = {
            name: 'Updated Name'
        };

        const response = await request(app)
            .put(`/worko/user/${userId}`)
            .send(updatedUser)
            .set('Authorization', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', updatedUser.name);
    });

    it('should delete user by id', async () => {
        const allUsersResponse = await request(app)
            .get('/worko/user')
            .set('Authorization', token);
        
        const userId = allUsersResponse.body[0]._id;

        const response = await request(app)
            .delete(`/worko/user/${userId}`)
            .set('Authorization', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', userId);

        // Verify user is soft deleted
        const deletedUser = await User.findById(userId);
        expect(deletedUser.isDeleted).toBe(true);
    });
});
