export default async function fetchExpirationDate(foodName: any) {
    try {
        const response = await fetch(`/api/expiration?name=${foodName}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "An error occurred while fetching the data.");
        }

        console.log(`Expiration date for ${foodName}:`, data.expirationDate);
        return data; // This contains the name and the calculated expirationDate
    } catch (error) {
        console.error("Fetch error:", error.message);
        return null; // or handle the error appropriately depending on your application needs
    }
}
