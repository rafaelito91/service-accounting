import React from 'react';
import './ApiEndpoints.css';

interface Endpoint {
  method: string;
  path: string;
  description: string;
}

const ApiEndpoints: React.FC = () => {
  const endpoints: Endpoint[] = [
    {
      method: 'GET',
      path: '/',
      description: 'Get hello message'
    },
    {
      method: 'POST',
      path: '/examples',
      description: 'Create a new example'
    },
    {
      method: 'GET',
      path: '/examples',
      description: 'Get all examples'
    },
    {
      method: 'GET',
      path: '/examples/:id',
      description: 'Get a specific example by ID'
    },
    {
      method: 'PATCH',
      path: '/examples/:id',
      description: 'Update a specific example by ID'
    },
    {
      method: 'DELETE',
      path: '/examples/:id',
      description: 'Delete a specific example by ID'
    }
  ];

  const getMethodColor = (method: string): string => {
    switch (method) {
      case 'GET': return '#61affe';
      case 'POST': return '#49cc90';
      case 'PATCH': return '#fca130';
      case 'DELETE': return '#f93e3e';
      default: return '#999';
    }
  };

  return (
    <div className="api-endpoints">
      <h1>API Endpoints</h1>
      <p>Available endpoints from the backend API:</p>
      
      <div className="endpoints-list">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="endpoint-item">
            <div 
              className="method-badge"
              style={{ backgroundColor: getMethodColor(endpoint.method) }}
            >
              {endpoint.method}
            </div>
            <div className="endpoint-path">
              <code>{endpoint.path}</code>
            </div>
            <div className="endpoint-description">
              {endpoint.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiEndpoints;