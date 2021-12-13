import { BASE_URL } from "../utils/ApiUtils";

import axios from "axios";

export async function fetchData(url, headers) {
  try {
    const result = await axios.get(url, headers);
    return result;
  } catch (error) {
    console.error({ error });
  }
}
