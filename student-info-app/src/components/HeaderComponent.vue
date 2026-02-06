<template>
    <header class="header">
      <div class="header-content">
        <h1>{{ title }}</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/students" class="nav-link">Students</router-link>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #27ae60;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header h1 {
    font-size: 1.8rem;
    font-weight: 600;
  }
  
  .nav {
    display: flex;
    gap: 20px;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .nav-link:hover {
    background-color: #229954;
  }
  
  .nav-link.router-link-active {
    background-color: #16a085;
  }
  </style>
  