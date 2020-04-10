const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app')
const User = require('../src/models/user')

const testUserId = new mongoose.Types.ObjectId()
const testUser = {
    _id:testUserId,
    name:"testUser",
    email:"testUser@gmail.com",
    password:"test1234",
    tokens:[{
        token: jwt.sign({_id:testUserId},"pizza1234")
    }]
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(testUser).save()
})

test('Should sign up with new user', async () => {
    const response = await request(app).post('/users')
    .send({
        name:"admin",
        email:"admin@gmail.com",
        password:"admin1234"
    })
    .expect(200)

    // Assert that the database is changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name:"admin",
            email:"admin@gmail.com",
            
        },
        token: user.tokens[0].token
    })

    // to check hashing
    expect(response.body.user.password).not.toBe('admin1234')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login')
    .send({
        name:testUser.name,
        email:testUser.email,
        password:testUser.password
    })
    .expect(200)

    // Assert that token in response matches with user second token
    const user = await User.findById(testUser._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login')
    .send({
        name:"random",
        email:"random@gmail.com",
        password:"random1234"
    })
    .expect(400)
})

test('Should get profile for user', async () => {
    await request(app).get('/users/me')
    .set('Authorization',`Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should get profile for unauthenticated user', async () => {
    await request(app).get('/users/me')
    .send()
    .expect(400)
})

test('Should update valid user field', async () => {
    const response = await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${testUser.tokens[0].token}`)
    .send({
        name:"updateAdmin",
        password:"pass1234"
    })
    .expect(200)

    const user = await User.findById(testUser._id)
    expect(user.name).toBe('updateAdmin')
    expect(user.password).not.toBe('pass1234')
})

test('Should not update invalid user field', async () => {
    const response = await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${testUser.tokens[0].token}`)
    .send({
       location:"India"
    })
    .expect(200)
})

test('Should delete the account of user',async () => {
    await request(app).delete('/users/me')
    .set('Authorization',`Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200)

    // Assert that the user is deleted
    const user = await User.findById(testUser._id)
    expect(user).toBeNull()
})

test('Should not delete the account of unauthenticated user',async () => {
    await request(app).delete('/users/me')
    .send()
    .expect(400)
})

test('Should upload image', async () => {
    const response = await request(app).post('/users/me/avatar')
    .set('Authorization',`Bearer ${testUser.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)

    // Assert that the binary data is saved
    const user = await User.findById(testUser._id)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

