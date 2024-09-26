/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */
import fetch from "node-fetch";

async function makeReservation() {
  try {
    const response = await fetch(
      "https://reservation100-sandbox.mxapps.io/rest-doc/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify({
          name: "John Doe",
          seats: 3,
        }),
      },
    );

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      const errorData = await response.json();
      console.error("Error response body:", errorData);
    }

    const data = await response.json();
    console.log("Reservation:", data);
  } catch (error) {
    console.error("Error making reservation:", error);
  }
}

makeReservation();
