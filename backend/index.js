require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const commentRoutes = require("./routes/comment.route");
const logger = require("./logger");
const userRoutes = require("./routes/user.route");
const barberRoutes = require("./routes/barber.route");
const fonRoutes = require("./routes/fon.route");
const priceRoutes = require("./routes/price.route");
const workingRoutes = require("./routes/working.route");
const contactRoutes = require("./routes/contact.route");
const serviceRoutes = require("./routes/service.route");
const connectDB = require("./configs/db.config");
const path = require("path");
const { swaggerUi, swaggerSpec } = require("./swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/fons", fonRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/workings", workingRoutes);
app.use("/api/contacts", contactRoutes);

let PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});