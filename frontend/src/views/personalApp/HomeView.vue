<template>
  <div>
    <h1>Todo List</h1>
    
    <!-- Todo Input -->
    <input v-model="newTodo" placeholder="Enter a new todo" @keyup.enter="addTodo" />
    <button @click="addTodo">Add Todo</button>

    <!-- Todo List -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Todo {
  id: number;
  text: string;
  created_at: string;
}

const API_URL = 'http://localhost:3000';
const newTodo = ref<string>('');
const todos = ref<Todo[]>([]);

// Fetch todos from backend
const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    todos.value = response.data;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
};

// Add new todo
const addTodo = async () => {
  if (newTodo.value.trim()) {
    try {
      await axios.post(`${API_URL}/todos`, { text: newTodo.value });
      newTodo.value = ''; // Clear input field
      await fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  }
};

// Remove todo
const removeTodo = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
    await fetchTodos(); // Refresh the list
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};

// Load todos when component mounts
onMounted(fetchTodos);
</script>

<style scoped>
/* Basic styles */
input {
  margin-right: 10px;
}
button {
  margin-left: 5px;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin: 5px 0;
}
</style>