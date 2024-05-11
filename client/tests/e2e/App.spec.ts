import { expect, test } from "@playwright/test";
import { clearUser } from "../../src/utils/api";


const SPOOF_UID = "mock-user-id";

test.beforeEach(
  "add spoof uid cookie to browser",
  async ({ context, page }) => {
    // - Add "uid" cookie to the browser context
    await context.addCookies([
      {
        name: "uid",
        value: SPOOF_UID,
        url: "http://localhost:8000",
      },
    ]);

    // wipe everything for this spoofed UID in the database.
    await clearUser();
  }
);


test("on page load, I am automatically directed to the homepage", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Gearup Title")).toBeVisible();
  // <i> with aria-label favorite-words-header should include the SPOOF_UID
  await expect(page.getByLabel("user-header")).toContainText(SPOOF_UID);
});

test("I can add a word to my favorites list", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  // - get the <p> elements inside the <ul> with aria-label="favorite-words"
  const favoriteWords = await page.getByLabel("favorite-words");
  await expect(favoriteWords).not.toContainText("hello");

  await page.getByLabel("word-input").fill("hello");
  await page.getByLabel("add-word-button").click();

  const favoriteWordsAfter = await page.getByLabel("favorite-words");
  await expect(favoriteWordsAfter).toContainText("hello");

  // .. and this works on refresh
  await page.reload();
  const favoriteWordsAfterReload = await page.getByLabel("favorite-words");
  await expect(favoriteWordsAfterReload).toContainText("hello");
});
