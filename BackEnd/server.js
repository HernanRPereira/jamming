require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; // Obtener la URI desde .env

// Middleware
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error de conexión a MongoDB:", err));

// Definir el esquema del comprador
const buyerSchema = new mongoose.Schema({
    collection: String,
    number: String,
    buyer: String,
});

const Buyer = mongoose.model("Buyer", buyerSchema);

// Ruta para obtener la autenticación por ID
app.get("/api/authentication/:id", async (req, res) => {
    try {
        const buyer = await Buyer.findById(req.params.id);
        if (!buyer) return res.status(404).json({ error: "No encontrado" });

        res.json(buyer);
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
