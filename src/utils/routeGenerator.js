const express = require('express');
const fs = require('fs');
const path = require('path');

/**
 * Dynamically generates routes for all entities
 * @returns {Object} An object with route paths as keys and router instances as values
 */
function generateRoutes() {
  const routes = {};
  const modelsDir = path.join(__dirname, '../models');
  
  if (fs.existsSync(modelsDir)) {
    fs.readdirSync(modelsDir).forEach(file => {
      if (file.endsWith('.js')) {
        const modelName = file.replace('.js', '');
        const resourceName = `${modelName}s`;
        
        try {
          // Check if controller, service, and repository exist
          const controllerPath = path.join(__dirname, `../controllers/${modelName}Controller.js`);
          const servicePath = path.join(__dirname, `../services/${modelName}Service.js`);
          const repositoryPath = path.join(__dirname, `../repositories/${modelName}Repository.js`);
          
          if (fs.existsSync(controllerPath) && fs.existsSync(servicePath) && fs.existsSync(repositoryPath)) {
            const Repository = require(repositoryPath);
            const Service = require(servicePath);
            const Controller = require(controllerPath);
            
            // Initialize the controller with proper dependencies
            const service = new Service(Repository);
            const controller = new Controller(service);
            
            // Create router
            const router = express.Router();
            
            // Define routes
            router.get('/', (req, res) => controller.getAll(req, res));
            router.get('/:id', (req, res) => controller.getById(req, res));
            router.post('/', (req, res) => controller.create(req, res));
            router.put('/:id', (req, res) => controller.update(req, res));
            router.delete('/:id', (req, res) => controller.delete(req, res));
            
            routes[`/api/${resourceName}`] = router;
          }
        } catch (error) {
          console.error(`Error setting up routes for ${modelName}:`, error);
        }
      }
    });
  }
  
  return routes;
}

module.exports = {
  generateRoutes
};