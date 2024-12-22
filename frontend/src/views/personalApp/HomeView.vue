<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4"
  >
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-purple-800 mb-8 text-center">
        My Tasks
        <span class="text-sm font-normal text-purple-600 ml-2">
          {{ pendingCount }} pending
        </span>
      </h1>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <form @submit.prevent="handleAddTodo" class="space-y-4">
          <div class="flex gap-4">
            <input
              v-model="newTodo.text"
              type="text"
              placeholder="What needs to be done?"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div class="flex gap-4">
            <select
              v-model="newTodo.priority"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option
                v-for="priority in PRIORITIES"
                :key="priority"
                :value="priority"
              >
                {{ priority.charAt(0).toUpperCase() + priority.slice(1) }}
                Priority
              </option>
            </select>
            <button
              type="submit"
              class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>

      <div class="flex gap-4 mb-6">
        <button
          v-for="filter in FILTERS"
          :key="filter"
          @click="currentFilter = filter"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            currentFilter === filter
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 hover:bg-purple-50',
          ]"
        >
          {{ filter }}
        </button>
      </div>

      <TransitionGroup
        tag="ul"
        class="bg-white rounded-lg shadow-md divide-y"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-x-4"
        enter-to-class="opacity-100 transform translate-x-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 transform translate-x-0"
        leave-to-class="opacity-0 transform translate-x-4"
      >
        <div
          v-if="filteredTodos.length === 0"
          class="p-8 text-center text-gray-500"
          key="empty"
        >
          No tasks found
        </div>
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="handleToggleTodo(todo.id)"
              class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div class="flex-1">
              <p
                :class="[
                  'text-lg',
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-800',
                ]"
              >
                {{ todo.text }}
              </p>
              <div class="flex gap-2 mt-1">
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    PRIORITY_CLASSES[todo.priority],
                  ]"
                >
                  {{ todo.priority }}
                </span>
                <span class="text-xs text-gray-500">
                  Created: {{ formatDate(todo.created_at) }}
                </span>
              </div>
            </div>
            <button
              @click="handleRemoveTodo(todo.id)"
              class="p-2 text-gray-400 hover:text-red-500 focus:outline-none"
              aria-label="Delete task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addTodo, fetchTodos, removeTodo, toggleTodo } from "@/services/todoService";
import { computed, onMounted, ref } from "vue";

// Constants
const PRIORITIES = ['low', 'medium', 'high'] as const;
const FILTERS = ["Active", "Completed","All" ] as const;
const PRIORITY_CLASSES = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
} as const;

// Types
type Priority = typeof PRIORITIES[number];
type Filter = typeof FILTERS[number];

interface Todo {
  id?: number;
  text: string;
  priority: Priority;
  completed: boolean;
  created_at?: string;
}

// State
const todos = ref<Todo[]>([]);
const currentFilter = ref<Filter>("Active");

const newTodo = ref<Omit<Todo, 'id' | 'created_at'>>({
  text: "",
  priority: "medium",
  completed: false
});

// Computed
const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    if (currentFilter.value === "Active") return !todo.completed;
    if (currentFilter.value === "Completed") return todo.completed;
    return true;
  });
});

const pendingCount = computed(() => 
  todos.value.filter((todo) => !todo.completed).length
);

// Methods
const handleAddTodo = async () => {
  if (!newTodo.value.text.trim()) return;

  try {
    const todoToAdd = {
      ...newTodo.value
    };
    
    const result = await addTodo(todoToAdd);
    todos.value.push(result);
    
    // Reset form
    newTodo.value = {
      text: "",
      priority: "medium",
      completed: false
    };
  } catch (error) {
    console.error("Failed to add todo:", error);
  }
};

const handleRemoveTodo = async (id: number) => {
  try {
    await removeTodo(id);
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};

const handleToggleTodo = async (id: number) => {
  try {
    const todoIndex = todos.value.findIndex((t) => t.id === id);
    if (todoIndex === -1) return;

    const todo = todos.value[todoIndex];
    await toggleTodo(id, !todo.completed);
    todos.value[todoIndex] = { ...todo, completed: !todo.completed };
  } catch (error) {
    console.error("Failed to toggle todo:", error);
  }
};

const formatDate = (date: string | undefined | null) => {
  if (!date) return "No date set";
  
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(parsed);
};

// Lifecycle
onMounted(async () => {
  try {
    const fetchedTodos = await fetchTodos();
    if (fetchedTodos) {
      todos.value = fetchedTodos;
    }
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
});
</script>
