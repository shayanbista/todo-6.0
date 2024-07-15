import request from "supertest";

import express from "express";
import router from "../../route";
import { users } from "../../model/user";
import config from "../../config";
import expect from "expect";
import { loggers } from "winston";
import {
  genericErrorHandler,
  notFoundError,
} from "../../middleware/errorHandler";

describe("User Integration Test Suite", () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(notFoundError);
  app.use(genericErrorHandler);
  const token = config.testToken;

  describe("User Integration Test Suite", () => {
    describe("Create User", () => {
      it("Should create a new user", async function () {
        try {
          const response = await request(app)
            .post("/users/")
            .set("Authorization", token)
            .send({
              name: "shayan",
              email: "shayan@gmail.com",
              password: "Mango1234#@!",
            });

          expect(response.status).toEqual(201);
          expect(response.body.message).toBe("created successfully");
        } catch (error) {
          throw error;
        }
      });
    });
    describe("Get Users", () => {
      it("Should fetch all users", async function () {
        try {
          const response = await request(app)
            .get("/users/")
            .set("Authorization", token);
          expect(response.status).toEqual(200);
        } catch (error) {
          throw error;
        }
      });
    });

    describe("Get Users By Id", () => {
      it("Should fetch all users", async function () {
        try {
          const userId = "1";
          const response = await request(app)
            .get(`/users/${userId}`)
            .set("Authorization", token);
          expect(response.status).toEqual(200);
        } catch (error) {
          throw error;
        }
      });
      it("Should return error when user of the id doesnot exist", async () => {
        const userId = 10;
        const response = await request(app)
          .get(`/users/${userId}`)
          .set("Authorization", token);

        expect(response.status).toBe(400);
      });
    });

    describe("updateUser", () => {
      it("Should update user by id", async () => {
        const userId = "1";
        const response = await request(app)
          .put(`/users/${userId}`)
          .set("Authorization", token)
          .send({
            id: userId,
            name: "Updated User",
            email: "User1@gmail.com",
            password:
              "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
          });

        expect(response.status).toBe(200);
      });
      it("Should update user by id", async () => {
        const userId = "1";
        const response = await request(app)
          .put(`/users/${userId}`)
          .set("Authorization", token)
          .send({
            id: userId,
            name: "Updated User",
            email: "User1@gmail.com",
            password:
              "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
          });

        expect(response.status).toBe(200);
      });

      it("it Should show id doesnot exist for non existent user ", async () => {
        const userId = "10";
        const response = await request(app)
          .put(`/users/${userId}`)
          .set("Authorization", token)
          .send({
            id: userId,
            name: "Updated User",
            email: "User1@gmail.com",
            password:
              "$2b$10$I24gdNea7i6fSXPl1uy96.cle9N5v6Zt8HyZTkTpFhD.kwzHeBHNW",
          });

        expect(response.status).toBe(400);
      });
    });

    describe("deleteUser", () => {
      it("Should delete user by id", async () => {
        const userId = "2";
        const response = await request(app)
          .delete(`/users/${userId}`)
          .set("Authorization", token);
        expect(response.status).toBe(200);
      });
      it("it Should show id doesnot exist for non existent user ", async () => {
        const userId = "10";
        const response = await request(app)
          .put(`/users/${userId}`)
          .set("Authorization", token);
        expect(response.status).toBe(400);
      });
    });
  });
})