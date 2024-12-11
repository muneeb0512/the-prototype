
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

describe("User Registration and Login", () => {
  beforeAll(async () => {
   
    await mongoose.connect("mongodb://localhost/express_tutorial_test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Test Database");
  });

  afterAll(async () => {
   
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should register a user successfully", async () => {
    const response = await request(app).post("/register").send({
      name: "Adam",
      email: "adam@example.com",
      password: "password123",
      householdName: "flat1",
    });
    expect(response.statusCode).toBe(200); 
   
  });

  it("should log in the user successfully", async () => {
    const loginResponse = await request(app).post("/login").send({
      email: "adam@example.com",
      password: "password123",
    });

    expect(loginResponse.statusCode).toBe(200); 
   

    
    const cookies = loginResponse.headers["set-cookie"];
    expect(cookies).toBeDefined();
  });
});
