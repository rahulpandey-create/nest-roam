
const request = require("supertest");
const app = require("../server");

describe("Nestroam API tests", () => {
  test("GET /api/health should return 200", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Nestroam API is running.");
  });

  test("POST /api/enquiries should reject an empty request", async () => {
    const response = await request(app)
      .post("/api/enquiries")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/enquiries should reject an invalid date format", async () => {
    const response = await request(app)
      .post("/api/enquiries")
      .send({
        name: "Test User",
        phone: "9876543210",
        travelDate: "2026-12-25",
        travellers: "2 Adults",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("DD/MM/YYYY");
  });

  test("POST /api/enquiries should reject an impossible date", async () => {
    const response = await request(app)
      .post("/api/enquiries")
      .send({
        name: "Test User",
        phone: "9876543210",
        travelDate: "31/02/2026",
        travellers: "2 Adults",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("valid travel date");
  });

  test("POST /api/enquiries should reject an invalid email", async () => {
    const response = await request(app)
      .post("/api/enquiries")
      .send({
        name: "Test User",
        phone: "9876543210",
        travelDate: "25/12/2026",
        travellers: "2 Adults",
        email: "invalid-email",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("valid email");
  });

  test("POST /api/enquiries should reject a name that is too short", async () => {
    const response = await request(app)
      .post("/api/enquiries")
      .send({
        name: "A",
        phone: "9876543210",
        travelDate: "25/12/2026",
        travellers: "2 Adults",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("2 and 100 characters");
  });
});
