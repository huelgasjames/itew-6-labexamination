<template>
    <div class="home-page">
      <div class="welcome-section">
        <h2>Welcome to Estudyante Info</h2>
        </div>
      
  
      <div class="demo-students">
        <h3>Students</h3>
        <div class="students-grid">
          <StudentComponent 
            v-for="student in sampleStudents" 
            :key="student.id"
            :student="student"
            @remove-student="handleRemoveStudent"
          />
        </div>
      </div>
  
      <div class="navigation-section">
        <router-link to="/students" class="cta-button">
          View All Students →
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import StudentComponent from '../components/StudentComponent.vue'
  
  export default {
    name: 'HomePage',
    components: {
      StudentComponent
    },
    data() {
      return {
        sampleStudents: [
          {
            id: 1,
            name: 'John Doe',
            course: 'Computer Science',
            year: '3rd Year',
            email: 'john.doe@university.edu',
            phone: '+1 234-567-8901',
            address: '123 Main St, City, State'
          },
          {
            id: 2,
            name: 'Jane Smith',
            course: 'Information Technology',
            year: '2nd Year',
            email: 'jane.smith@university.edu',
            phone: '+1 234-567-8902',
            address: '456 Oak Ave, City, State'
          }
        ]
      }
    },
    methods: {
      handleRemoveStudent(studentId) {
        this.sampleStudents = this.sampleStudents.filter(student => student.id !== studentId)
      }
    }
  }
  </script>
  
  <style scoped>
  .home-page {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .welcome-section {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 20px;
    border-radius: 12px;
  }
  
  .welcome-section h2 {
    font-size: 2.5rem;
    margin-bottom: 16px;
    font-weight: 600;
  }
  
  .welcome-section p {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .features-section {
    margin-bottom: 40px;
  }
  
  .features-section h3 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 24px;
    font-size: 1.8rem;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .feature-card {
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.2s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  .feature-card h4 {
    color: #2c3e50;
    margin-bottom: 12px;
    font-size: 1.2rem;
  }
  
  .feature-card p {
    color: #666;
    line-height: 1.5;
  }
  
  .demo-students {
    margin-bottom: 40px;
  }
  
  .demo-students h3 {
    color: #2c3e50;
    margin-bottom: 24px;
    font-size: 1.8rem;
  }
  
  .students-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
  }
  
  .navigation-section {
    text-align: center;
  }
  
  .cta-button {
    display: inline-block;
    background-color: #27ae60;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .cta-button:hover {
    background-color: #229954;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .welcome-section h2 {
      font-size: 2rem;
    }
    
    .students-grid {
      grid-template-columns: 1fr;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
  