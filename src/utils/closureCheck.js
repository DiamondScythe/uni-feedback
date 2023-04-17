import axios from "axios";

export async function getClosureDates() {
  try {
    const response = await axios.get("http://localhost:8081/closureDates");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
