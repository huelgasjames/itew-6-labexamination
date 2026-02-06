<template>
    <div class="students-page">
      <div class="page-header">
        <h2>Student Management</h2>
      </div>
  
      <div class="controls-section">
        <button @click="fetchUsers" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Loading...' : 'Refresh Data' }}
        </button>
        <button @click="clearLocalStudents" class="btn btn-secondary">
          Clear Local Students
        </button>
      </div>
  
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading student data...</p>
      </div>
  
      <div v-else-if="error" class="error-state">
        <h3>⚠️ Error Loading Data</h3>
        <p>{{ error }}</p>
        <button @click="fetchUsers" class="btn btn-primary">Try Again</button>
      </div>
  
      <div v-else-if="students.length === 0" class="empty-state">
        <h3>No Students Found</h3>
        <p>Click "Refresh Data" to load students from the API.</p>
      </div>
  
      <div v-else class="students-list">
        <div class="list-header">
          <h3>{{ students.length }} Students Found</h3>
          <div class="filter-controls">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search students..."
              class="search-input"
            />
            <select v-model="filterYear" class="filter-select">
              <option value="">All Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
        </div>
  
        <div class="students-grid">
          <StudentComponent 
            v-for="student in filteredStudents" 
            :key="student.id"
            :student="student"
            @remove-student="handleRemoveStudent"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import StudentComponent from '../components/StudentComponent.vue'
  
  export default {
    name: 'StudentsPage',
    components: {
      StudentComponent
    },
    data() {
      return {
        students: [],
        loading: false,
        error: null,
        searchQuery: '',
        filterYear: ''
      }
    },
    computed: {
      filteredStudents() {
        let filtered = this.students
        
        // Filter by search query
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase()
          filtered = filtered.filter(student => 
            student.name.toLowerCase().includes(query) ||
            student.course.toLowerCase().includes(query) ||
            student.email?.toLowerCase().includes(query)
          )
        }
        
        // Filter by year
        if (this.filterYear) {
          filtered = filtered.filter(student => student.year === this.filterYear)
        }
        
        return filtered
      }
    },
    mounted() {
      this.fetchUsers()
    },
    methods: {
      async fetchUsers() {
        this.loading = true
        this.error = null
        
        try {
          // Using JSONPlaceholder API for demo
          const response = await axios.get('https://jsonplaceholder.typicode.com/users')
          
          // Transform API data to match our student structure
          this.students = response.data.map((user, index) => ({
            id: user.id,
            name: user.name,
            course: this.getRandomCourse(),
            year: this.getRandomYear(),
            email: user.email,
            phone: user.phone,
            address: `${user.address.street}, ${user.address.city}`
          }))
          
        } catch (err) {
          console.error('Error fetching students:', err)
          this.error = 'Failed to fetch student data. Please check your internet connection and try again.'
          
          // Load sample data as fallback
          this.loadSampleData()
        } finally {
          this.loading = false
        }
      },
      
      loadSampleData() {
        this.students = [
          {
            id: 101,
            name: 'Alice Johnson',
            course: 'Computer Science',
            year: '3rd Year',
            email: 'alice.johnson@university.edu',
            phone: '+1 234-567-8903',
            address: '789 Pine St, City, State'
          },
          {
            id: 102,
            name: 'Bob Wilson',
            course: 'Information Technology',
            year: '2nd Year',
            email: 'bob.wilson@university.edu',
            phone: '+1 234-567-8904',
            address: '321 Elm St, City, State'
          },
          {
            id: 103,
            name: 'Carol Davis',
            course: 'Software Engineering',
            year: '4th Year',
            email: 'carol.davis@university.edu',
            phone: '+1 234-567-8905',
            address: '654 Maple St, City, State'
          }
        ]
      },
      
      getRandomCourse() {
        const courses = [
          'Computer Science',
          'Information Technology',
          'Software Engineering',
          'Data Science',
          'Cybersecurity',
          'Web Development'
        ]
        return courses[Math.floor(Math.random() * courses.length)]
      },
      
      getRandomYear() {
        const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
        return years[Math.floor(Math.random() * years.length)]
      },
      
      handleRemoveStudent(studentId) {
        this.students = this.students.filter(student => student.id !== studentId)
      },
      
      clearLocalStudents() {
        this.students = []
        this.error = null
      }
    }
  }
  </script>
  
  <style scoped>
  .students-page {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .page-header h2 {
    color: #2c3e50;
    font-size: 2.2rem;
    margin-bottom: 8px;
  }
  
  .page-header p {
    color: #666;
    font-size: 1.1rem;
  }
  
  .controls-section {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    justify-content: center;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .btn-primary {
    background-color: #27ae60;
    color: white;
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: #229954;
  }
  
  .btn-primary:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .btn-secondary {
    background-color: #95a5a6;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #7f8c8d;
  }
  
  .loading-state, .error-state, .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 24px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #27ae60;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-state h3 {
    color: #e74c3c;
    margin-bottom: 12px;
  }
  
  .error-state p {
    color: #666;
    margin-bottom: 20px;
  }
  
  .empty-state h3 {
    color: #95a5a6;
    margin-bottom: 12px;
  }
  
  .empty-state p {
    color: #7f8c8d;
  }
  
  .students-list {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .list-header h3 {
    color: #2c3e50;
    font-size: 1.4rem;
  }
  
  .filter-controls {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  
  .search-input, .filter-select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .search-input {
    width: 250px;
  }
  
  .filter-select {
    width: 120px;
  }
  
  .students-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    .list-header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .filter-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .search-input {
      width: 100%;
    }
    
    .students-grid {
      grid-template-columns: 1fr;
    }
    
    .controls-section {
      flex-direction: column;
      align-items: stretch;
    }
  }
  </style>
  