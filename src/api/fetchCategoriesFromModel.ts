import { ParsedTransaction } from "../types/types";

export async function fetchCategoriesFromModel(data: ParsedTransaction[]) {
  // const withoutDate = data.map(({ date, ...rest }) => rest);

  // let body = JSON.stringify(data);
  // let sizeInBytes = Buffer.byteLength(body);

  if (process.env.NEXT_PUBLIC_MODEL_ENDPOINT) {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_MODEL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const categories = await response.json();

      if (categories.categoryPredictions) {
        return categories.categoryPredictions;
      } else {
        throw new Error("no data received from server");
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error,
      );
    }
  } else {
    throw new Error("must provide model endpoint");
  }
}
