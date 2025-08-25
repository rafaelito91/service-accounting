import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Example } from '../types/example';
import './Examples.css';

const Examples: React.FC = () => {
  const [examples, setExamples] = useState<Example[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newExampleName, setNewExampleName] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchExamples = async () => {
    try {
      setLoading(true);
      const data = await api.get<Example[]>('/examples');
      setExamples(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch examples. Make sure the backend is running.');
      console.error('Error fetching examples:', err);
    } finally {
      setLoading(false);
    }
  };

  const createExample = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExampleName.trim()) return;

    try {
      setCreating(true);
      const newExample = await api.post<Example>('/examples', {
        name: newExampleName.trim()
      });
      setExamples(prev => [...prev, newExample]);
      setNewExampleName('');
      setError(null);
    } catch (err) {
      setError('Failed to create example');
      console.error('Error creating example:', err);
    } finally {
      setCreating(false);
    }
  };

  const deleteExample = async (id: number) => {
    try {
      await api.delete(`/examples/${id}`);
      setExamples(prev => prev.filter(example => example.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete example');
      console.error('Error deleting example:', err);
    }
  };

  useEffect(() => {
    fetchExamples();
  }, []);

  if (loading) {
    return <div className="examples-loading">Loading examples...</div>;
  }

  return (
    <div className="examples-container">
      <h1>Examples</h1>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchExamples} className="retry-btn">Retry</button>
        </div>
      )}

      <form onSubmit={createExample} className="create-form">
        <div className="form-group">
          <input
            type="text"
            value={newExampleName}
            onChange={(e) => setNewExampleName(e.target.value)}
            placeholder="Enter example name..."
            className="example-input"
            disabled={creating}
          />
          <button 
            type="submit" 
            disabled={creating || !newExampleName.trim()}
            className="create-btn"
          >
            {creating ? 'Creating...' : 'Create Example'}
          </button>
        </div>
      </form>

      <div className="examples-list">
        {examples.length === 0 ? (
          <div className="no-examples">
            No examples found. Create your first example above!
          </div>
        ) : (
          examples.map((example) => (
            <div key={example.id} className="example-item">
              <div className="example-content">
                <h3 className="example-name">{example.name}</h3>
                <div className="example-meta">
                  <span>ID: {example.id}</span>
                  <span>Created: {new Date(example.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button 
                onClick={() => deleteExample(example.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Examples;