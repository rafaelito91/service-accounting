import { useState } from 'react'
import ApiEndpoints from './components/ApiEndpoints'
import Examples from './components/Examples'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<'endpoints' | 'examples'>('examples')

  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #eee', marginBottom: '1rem' }}>
        <button 
          onClick={() => setCurrentPage('examples')}
          style={{ 
            marginRight: '1rem', 
            padding: '0.5rem 1rem',
            background: currentPage === 'examples' ? '#007bff' : '#f8f9fa',
            color: currentPage === 'examples' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Examples
        </button>
        <button 
          onClick={() => setCurrentPage('endpoints')}
          style={{ 
            padding: '0.5rem 1rem',
            background: currentPage === 'endpoints' ? '#007bff' : '#f8f9fa',
            color: currentPage === 'endpoints' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          API Endpoints
        </button>
      </nav>
      
      {currentPage === 'examples' ? <Examples /> : <ApiEndpoints />}
    </>
  )
}

export default App
