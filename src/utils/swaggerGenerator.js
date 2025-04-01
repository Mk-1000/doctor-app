const fs = require('fs');
const path = require('path');

function loadModels() {
  const models = {};
  const modelsDir = path.join(__dirname, '../models');
  
  // Read all model files from the models directory
  if (fs.existsSync(modelsDir)) {
    fs.readdirSync(modelsDir).forEach(file => {
      if (file.endsWith('.js')) {
        const modelName = file.replace('.js', '');
        // Convert to PascalCase
        const pascalCaseModelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        const model = require(path.join(modelsDir, file));
        models[pascalCaseModelName] = model;
      }
    });
  }
  
  return models;
}

function generateSchemas() {
  const schemas = {};
  const models = loadModels();
  
  for (const [modelName, Model] of Object.entries(models)) {
    if (Model.modelSchema) {
      schemas[modelName] = Model.modelSchema;
      schemas[`${modelName}Input`] = Model.inputSchema || Model.modelSchema;
    }
  }
  
  return schemas;
}
function generateResourcePaths() {
  const paths = {};
  const models = loadModels();
  
  for (const [modelName, Model] of Object.entries(models)) {
    if (!Model.modelSchema) continue;
    
    // Get the resourceName for the API path (pluralized lowercase)
    const resourceName = `${modelName.toLowerCase()}s`;
    // Remove the /api prefix since it's already in the servers array
    const basePath = `/${resourceName}`;
    
    // GET all and POST new
    paths[basePath] = {
      get: {
        tags: [modelName],
        summary: `Retrieve all ${resourceName}`,
        responses: {
          200: {
            description: `List of ${resourceName}`,
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: `#/components/schemas/${modelName}` }
                }
              }
            }
          },
          500: { description: 'Server error' }
        }
      },
      post: {
        tags: [modelName],
        summary: `Create a new ${modelName.toLowerCase()}`,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${modelName}Input` }
            }
          }
        },
        responses: {
          201: {
            description: `${modelName} created successfully`,
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${modelName}` }
              }
            }
          },
          400: { description: 'Invalid input' },
          500: { description: 'Server error' }
        }
      }
    };
    
    // GET, PUT, DELETE by ID
    paths[`${basePath}/{id}`] = {
      get: {
        tags: [modelName],
        summary: `Retrieve a single ${modelName.toLowerCase()} by ID`,
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: `ID of the ${modelName.toLowerCase()} to fetch`,
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: `The ${modelName.toLowerCase()} with the specified ID`,
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${modelName}` }
              }
            }
          },
          404: { description: `${modelName} not found` },
          500: { description: 'Server error' }
        }
      },
      put: {
        tags: [modelName],
        summary: `Update an existing ${modelName.toLowerCase()} by ID`,
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: `ID of the ${modelName.toLowerCase()} to update`,
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${modelName}Input` }
            }
          }
        },
        responses: {
          200: {
            description: `${modelName} updated successfully`,
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${modelName}` }
              }
            }
          },
          400: { description: 'Invalid input' },
          404: { description: `${modelName} not found` },
          500: { description: 'Server error' }
        }
      },
      delete: {
        tags: [modelName],
        summary: `Delete a ${modelName.toLowerCase()} by ID`,
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: `ID of the ${modelName.toLowerCase()} to delete`,
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          204: { description: `${modelName} deleted successfully` },
          404: { description: `${modelName} not found` },
          500: { description: 'Server error' }
        }
      }
    };
  }
  
  return paths;
}

function generateSwaggerDocs() {
  return {
    openapi: '3.0.0',
    info: {
      title: 'Healthcare API',
      version: '1.0.0',
      description: 'API for managing healthcare resources',
    },
    servers: [
      { url: 'http://localhost:3000/api', description: 'API Base URL' }
    ],
    paths: generateResourcePaths(),
    components: {
      schemas: generateSchemas()
    }
  };
}

module.exports = {
  generateSwaggerDocs
};

function generateSwaggerDocs() {
  return {
    openapi: '3.0.0',
    info: {
      title: 'Healthcare API',
      version: '1.0.0',
      description: 'API for managing healthcare resources',
    },
    servers: [
      { url: '/api', description: 'API Base URL' }
    ],
    paths: generateResourcePaths(),
    components: {
      schemas: generateSchemas()
    }
  };
}

module.exports = {
  generateSwaggerDocs
};