import express from "express";

interface Controller {
  getRouter(): express.Router;
}

export default Controller;
