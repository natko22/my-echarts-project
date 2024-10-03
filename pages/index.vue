<template>
  <div class="home-container">
    <h1>Welcome to the Home Page</h1>
    <nuxt-link to="/statistics" class="link"
      >Go to Statistics Dashboard</nuxt-link
    >
  </div>
</template>

<script setup></script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f4f4f9;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

.link {
  font-size: 1.25rem;
  color: #65b581;
  text-decoration: none;
  border: 2px solid #65b581;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.link:hover {
  background-color: #65b581;
  color: white;
}
</style>
