import React, { useState, useEffect } from 'react'

const isLocalhost = window.location.hostname === 'localhost';
const API_URL = isLocalhost ? 'http://localhost:5000/api/todos' : '/api/todos';

const App = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchTodo()
  }, [])

  // 1. Fetch All Todos (Fixed Destructuring Galti)
  const fetchTodo = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch todos');
      
      const data = await response.json(); // FIX: {data} ki jagah direct data kiya
      setTodos(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // 2. Add Todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input })
      });

      if (!response.ok) throw new Error('Failed to add todo');

      const data = await response.json();
      setTodos([...todos, data]);
      setInput('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // 3. Delete Todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // 4. Toggle Complete Status (Premium UI Dynamic Interaction)
  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
      });
      if (!response.ok) throw new Error('Failed to update todo');
      
      const updatedData = await response.json();
      setTodos(todos.map(todo => todo._id === id ? updatedData : todo));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.glassCard}>
        
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>Task Center</h1>
          <p style={styles.subtitle}>MERN Stack Workspace</p>
        </div>

        {/* Form Section */}
        <form onSubmit={addTodo} style={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's your next move?..."
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>
            Create
          </button>
        </form>

        {/* List Section */}
        <div style={styles.listContainer}>
          {Array.isArray(todos) && todos.length === 0 ? (
            <div style={styles.emptyState}>No tasks remaining. Good job! ✨</div>
          ) : (
            <ul style={styles.list}>
              {Array.isArray(todos) && todos.map(todo => (
                <li key={todo._id} style={todo.completed ? styles.todoItemCompleted : styles.todoItem}>
                  
                  {/* Custom Checkbox Container */}
                  <div style={styles.todoLeft}>
                    <input
                      type="checkbox"
                      checked={todo.completed || false}
                      onChange={() => toggleComplete(todo._id, todo.completed)}
                      style={styles.checkbox}
                    />
                    <span style={todo.completed ? styles.textCompleted : styles.text}>
                      {todo.title}
                    </span>
                  </div>

                  {/* Delete Action */}
                  <button onClick={() => deleteTodo(todo._id)} style={styles.deleteButton}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>

                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

// 🎨 Out-Class Styles Object (Premium Dark Glassmorphism)
const styles = {
  dashboard: {
    minHeight: '100vh',
    width: '100vw',
    background: 'radial-gradient(circle at 50% 50%, #1a1b26 0%, #10111a 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Inter', sans-serif",
    padding: '20px',
    boxSizing: 'border-box',
    color: '#f8fafc'
  },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(16px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    width: '100%',
    maxWidth: '520px',
    padding: '35px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  },
  header: {
    marginBottom: '25px',
    textAlign: 'center'
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    background: 'linear-gradient(to right, #6366f1, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 5px 0'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '14px',
    margin: 0,
    fontWeight: '500'
  },
  form: {
    display: 'flex',
    gap: '12px',
    marginBottom: '30px'
  },
  input: {
    flex: 1,
    background: '#161722',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '14px',
    padding: '14px 18px',
    color: '#f8fafc',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s',
  },
  addButton: {
    background: '#6366f1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    padding: '0 24px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
  },
  listContainer: {
    maxHeight: '350px',
    overflowY: 'auto'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '16px',
    padding: '14px 18px',
    transition: 'all 0.2s'
  },
  todoItemCompleted: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.02)',
    borderRadius: '16px',
    padding: '14px 18px',
    opacity: 0.6
  },
  todoLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    flex: 1
  },
  checkbox: {
    width: '18px',
    height: '18px',
    borderRadius: '6px',
    cursor: 'pointer',
    accentColor: '#6366f1'
  },
  text: {
    fontSize: '15px',
    color: '#e2e8f0',
    fontWeight: '500'
  },
  textCompleted: {
    fontSize: '15px',
    color: '#64748b',
    textDecoration: 'line-through',
    fontWeight: '500'
  },
  deleteButton: {
    background: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    transition: 'opacity 0.2s'
  },
  emptyState: {
    textAlign: 'center',
    color: '#64748b',
    padding: '20px 0',
    fontSize: '14px'
  }
}

export default App;