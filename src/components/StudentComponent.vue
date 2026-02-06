<template>
    <div class="student-card">
      <div class="student-info">
        <h3>{{ student.name }}</h3>
        <p><strong>Course:</strong> {{ student.course }}</p>
        <p><strong>Year:</strong> {{ student.year }}</p>
        <p><strong>ID:</strong> {{ student.id }}</p>
      </div>
      <div class="student-actions">
        <button 
          @click="toggleDetails" 
          class="btn btn-primary"
        >
          {{ showDetails ? 'Hide Details' : 'Show Details' }}
        </button>
        <button 
          @click="removeStudent" 
          class="btn btn-danger"
        >
          Remove
        </button>
      </div>
      <div v-if="showDetails" class="student-details">
        <h4>Additional Information</h4>
        <p><strong>Email:</strong> {{ student.email || 'N/A' }}</p>
        <p><strong>Phone:</strong> {{ student.phone || 'N/A' }}</p>
        <p><strong>Address:</strong> {{ student.address || 'N/A' }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StudentComponent',
    props: {
      student: {
        type: Object,
        required: true,
        validator: (value) => {
          return value.name && value.course && value.year && value.id
        }
      }
    },
    data() {
      return {
        showDetails: false
      }
    },
    methods: {
      toggleDetails() {
        this.showDetails = !this.showDetails
      },
      removeStudent() {
        this.$emit('remove-student', this.student.id)
      }
    }
  }
  </script>
  
  <style scoped>
  .student-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .student-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  .student-info h3 {
    color: #2c3e50;
    margin-bottom: 12px;
    font-size: 1.2rem;
  }
  
  .student-info p {
    margin: 6px 0;
    color: #555;
  }
  
  .student-actions {
    margin-top: 16px;
    display: flex;
    gap: 12px;
  }
  
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary {
    background-color: #27ae60;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #229954;
  }
  
  .btn-danger {
    background-color: #e74c3c;
    color: white;
  }
  
  .btn-danger:hover {
    background-color: #c0392b;
  }
  
  .student-details {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #eee;
  }
  
  .student-details h4 {
    color: #2c3e50;
    margin-bottom: 8px;
  }
  
  .student-details p {
    margin: 4px 0;
    color: #666;
    font-size: 14px;
  }
  </style>
  