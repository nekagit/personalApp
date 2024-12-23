<script setup lang="ts">
import { ref, onMounted, computed ,watch} from 'vue';
import { fetchCalendarEntries, addCalendarEntry, removeCalendarEntry, updateCalendarEntry, type ICalendarEntry } from '../../services/calendarService';
import { transformBirthdaysToCalendarFormat } from '@/services/birthdayService';

// State
const currentDate = ref(new Date());
const calendarEntries = ref<ICalendarEntry[]>([]);
const showAddModal = ref(false);
const selectedDate = ref<Date | null>(null);

// New entry form
const newEntry = ref({
  title: '',
  type: 'appointment' as 'birthday' | 'appointment',
  completed: false
});

// Calendar calculations
const daysInMonth = computed(() => {
  return new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    0
  ).getDate();
});

const firstDayOfMonth = computed(() => {
  return new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    1
  ).getDay();
});

const days = computed(() => {
  const result = [];
  for (let i = 0; i < firstDayOfMonth.value; i++) {
    result.push(null);
  }
  for (let i = 1; i <= daysInMonth.value; i++) {
    result.push(i);
  }
  return result;
});

const currentMonthName = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long' });
});

const isToday = (day: number | null) => {
  if (!day) return false;
  const today = new Date();
  return today.getDate() === day &&
         today.getMonth() === currentDate.value.getMonth() &&
         today.getFullYear() === currentDate.value.getFullYear();
};

// Methods
const loadEntries = async () => {
  try {
    // Fetch regular calendar entries
    const regularEntries = await fetchCalendarEntries();
    
    // Get birthdays for the current year
    const birthdayEntries = transformBirthdaysToCalendarFormat(
      currentDate.value.getFullYear()
    );
    
    // Combine regular entries with birthday entries
    calendarEntries.value = [...regularEntries, ...birthdayEntries];
  } catch (error) {
    console.error('Failed to load calendar entries:', error);
  }
};

// Update entries when month changes
watch(() => currentDate.value, loadEntries);

const getEntriesForDate = (day: number | null) => {
  if (!day) return [];
  
  const dateString = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day
  ).toISOString().split('T')[0];
  
  return calendarEntries.value.filter(entry => entry.date === dateString);
};

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const openAddModal = (day: number) => {
  selectedDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day
  );
  showAddModal.value = true;
};

const addEntry = async () => {
  if (!selectedDate.value) return;
  
  try {
    const entry = {
      ...newEntry.value,
      date: selectedDate.value.toISOString().split('T')[0]
    };
    
    await addCalendarEntry(entry);
    await loadEntries();
    
    // Reset form
    newEntry.value = {
      title: '',
      type: 'appointment',
      completed: false
    };
    showAddModal.value = false;
  } catch (error) {
    console.error('Failed to add entry:', error);
  }
};

const deleteEntry = async (id: number) => {
  try {
    await removeCalendarEntry(id);
    await loadEntries();
  } catch (error) {
    console.error('Failed to delete entry:', error);
  }
};

const toggleComplete = async (entry: ICalendarEntry) => {
  if (!entry.id) return;
  
  try {
    await updateCalendarEntry(entry.id, {
      ...entry,
      completed: !entry.completed
    });
    await loadEntries();
  } catch (error) {
    console.error('Failed to update entry:', error);
  }
};

// Load entries on mount
onMounted(loadEntries);
</script>

<template>
   <div class="calendar-container">
    <!-- Calendar Header -->
    <div class="calendar-header">
      <button @click="previousMonth">&lt;</button>
      <h2>{{ currentMonthName }} {{ currentDate.getFullYear() }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>

    <!-- Weekday Headers -->
    <div class="calendar-grid">
      <div class="weekday" v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']">
        {{ day }}
      </div>

      <!-- Calendar Days -->
      <div
        v-for="day in days"
        :key="day"
        class="calendar-day"
        :class="{ 
          empty: !day,
          'current-day': isToday(day)
        }"
        @click="day && openAddModal(day)"
      >
        <template v-if="day">
          <div class="day-number">{{ day }}</div>
          <div class="day-entries">
            <div
              v-for="entry in getEntriesForDate(day)"
              :key="entry.id"
              class="entry"
              :class="[entry.type, { completed: entry.completed }]"
            >
              <span>{{ entry.title }}</span>
              <div class="entry-actions">
                <input
                  v-if="entry.type !== 'birthday'"
                  type="checkbox"
                  :checked="entry.completed"
                  @click.stop="toggleComplete(entry)"
                >
                <button 
                  v-if="entry.type !== 'birthday'"
                  @click.stop="deleteEntry(entry.id!)"
                >×</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Add Entry Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h3>Add Entry for {{ selectedDate?.toLocaleDateString() }}</h3>
        <form @submit.prevent="addEntry">
          <input
            v-model="newEntry.title"
            placeholder="Entry title"
            required
          >
          <select v-model="newEntry.type">
            <option value="appointment">Appointment</option>
            <option value="birthday">Birthday</option>
          </select>
          <div class="modal-actions">
            <button type="submit">Add</button>
            <button type="button" @click="showAddModal = false">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  max-width: 1000px;
  margin:auto;
  padding: 20px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #ddd;
}

.weekday {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.calendar-day {
  background-color: white;
  min-height: 100px;
  padding: 5px;
  cursor: pointer;
}

.calendar-day:hover {
  background-color: #f8f8f8;
}

.empty {
  background-color: #f5f5f5;
  cursor: default;
}

.day-number {
  font-weight: bold;
  margin-bottom: 5px;
}

.day-entries {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.entry {
  font-size: 0.9em;
  padding: 2px 4px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entry.appointment {
  background-color: #e3f2fd;
}

.entry.birthday {
  background-color: #f8bbd0;
}

.entry.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.entry-actions {
  display: flex;
  gap: 4px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-content input,
.modal-content select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #ea580b;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #b44c13;
}


.current-day {
  background-color: #fff3e0 !important;
  border: 2px solid #ea580b !important;
}

.entry.birthday {
  background-color: #f8bbd0;
  padding: 4px 8px;
  border-radius: 4px;
  color: #c2185b;
  font-weight: 500;
}
</style>