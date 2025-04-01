const mongoose = require('mongoose');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { generateSwaggerDocs } = require('./utils/swaggerGenerator');
const { generateRoutes } = require('./utils/routeGenerator');

const app = express();
app.use(express.json());

// Connect to MongoDB with better error handling
mongoose.connect('mongodb://localhost:27017/healthcare-api')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


// Generate Swagger documentation
const swaggerDocs = generateSwaggerDocs();

// Mount Swagger UI with correct options
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  explorer: true,
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true
  }
}));

// Root path redirect to API docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Dynamically mount all routes
const routes = generateRoutes();
Object.entries(routes).forEach(([path, router]) => {
  app.use(path, router);
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong: ' + err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;