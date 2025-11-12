import { expect, test } from "vitest";
import { GET } from "../app/health/route";

const HTTP_OK = 200;
const OK_BODY = "OK";

test("Health Check", async () => {
  const response = await GET();
  expect(response.status).toBe(HTTP_OK);
  expect(await response.text()).toBe(OK_BODY);
});
