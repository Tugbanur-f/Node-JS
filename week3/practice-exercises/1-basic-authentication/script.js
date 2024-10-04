/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */

import fetch from "node-fetch";

const apiUrl = "https://restapiabasicauthe-sandbox.mxapps.io/api/books";
const base64 = "YWRtaW46aHZnWDhLbFZFYQ==";
async function printBooks() {
  try {
    const response = await fetch(apiUrl, {
      headers: { Authorization: `Basic ${base64}` },
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const books = await response.json();
    console.log(books);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

printBooks();
