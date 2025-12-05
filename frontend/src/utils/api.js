export async function createJsonFile(action, filename, content) {
  await fetch("http://localhost:3001/api/create-json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, filename, content })
  });
}
