import { OpenAPI } from "./client";

if (process.env.DEBUG) {
  OpenAPI.BASE = "http://127.0.0.1:8000/";
} else {
  OpenAPI.BASE = process.env.BASE_PATH_API!;
}
