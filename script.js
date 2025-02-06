const API_URL = "https://jamming-backend.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        try {
            const response = await fetch(`${API_URL}/api/authentication/${id}`);
            const data = await response.json();

            document.getElementById("collection").textContent = `Colección: ${data.collection}`;
            document.getElementById("number").textContent = `Número: ${data.number}`;
            document.getElementById("buyer").textContent = `Comprador: ${data.buyer}`;
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    }
});
