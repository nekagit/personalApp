<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="pomodoro-timer bg-white rounded-lg shadow-xl p-8 w-96">
      <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">{{ title }}</h1>
      
      <div class="timer-display text-6xl font-mono text-center mb-8">
        {{ formatTime(timeLeft) }}
      </div>
      
      <div class="flex justify-center mb-8">
        <button
          v-if="!isActive"
          @click="startTimer"
          :disabled="isStartDisabled"
          class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Focus
        </button>
        <button
          v-else
          @click="stopTimer"
          class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Stop
        </button>
      </div>

      <div v-if="sessionComplete" class="text-center mb-6">
        <button
          @click="startBreak"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Start Break
        </button>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="input-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Work Time (min)
          </label>
          <input
            type="number"
            v-model="workTime"
            min="1"
            max="60"
            :disabled="isActive"
            class="w-full p-2 border rounded-md"
          />
        </div>
        <div class="input-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Break Time (min)
          </label>
          <input
            type="number"
            v-model="breakTime"
            min="1"
            max="60"
            :disabled="isActive"
            class="w-full p-2 border rounded-md"
          />
        </div>
      </div>
      
      <div v-if="isBreak" class="mt-6 text-center">
        <p class="text-xl font-semibold text-blue-600">Break time! 🎉</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

// Audio setup
const startSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
const alarmSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

// Set alarm volume to maximum
alarmSound.volume = 1.0;

// Timer state
const workTime = ref(25);
const breakTime = ref(5);
const isActive = ref(false);
const isBreak = ref(false);
const timeLeft = ref(workTime.value * 60);
const sessionComplete = ref(false);
const isStartDisabled = ref(false);
let endTime = 0;

// Load saved state from localStorage
onMounted(() => {
  const savedState = JSON.parse(localStorage.getItem('pomodoroState') || '{}');
  if (savedState.endTime && savedState.endTime > Date.now()) {
    restoreState(savedState);
  }
  
  // Register visibility change handler
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Start background timer if active
  if (isActive.value) {
    startBackgroundTimer();
  }
  
  // Preload the alarm sound
  alarmSound.load();
});

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});

const title = computed(() => {
  return isBreak.value ? 'Break Time' : 'Focus Time';
});

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const saveState = () => {
  const state = {
    workTime: workTime.value,
    breakTime: breakTime.value,
    isActive: isActive.value,
    isBreak: isBreak.value,
    timeLeft: timeLeft.value,
    sessionComplete: sessionComplete.value,
    isStartDisabled: isStartDisabled.value,
    endTime: endTime
  };
  localStorage.setItem('pomodoroState', JSON.stringify(state));
};

const restoreState = (state) => {
  workTime.value = state.workTime;
  breakTime.value = state.breakTime;
  isActive.value = state.isActive;
  isBreak.value = state.isBreak;
  sessionComplete.value = state.sessionComplete;
  isStartDisabled.value = state.isStartDisabled;
  endTime = state.endTime;
  
  if (isActive.value) {
    const remaining = Math.ceil((endTime - Date.now()) / 1000);
    timeLeft.value = remaining > 0 ? remaining : 0;
    startBackgroundTimer();
  }
};

const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible' && isActive.value) {
    const remaining = Math.ceil((endTime - Date.now()) / 1000);
    timeLeft.value = remaining > 0 ? remaining : 0;
    startBackgroundTimer();
  }
};

const startBackgroundTimer = () => {
  const checkTimer = () => {
    if (!isActive.value) return;
    
    const now = Date.now();
    if (now >= endTime) {
      handleTimerComplete();
    } else {
      timeLeft.value = Math.ceil((endTime - now) / 1000);
      requestAnimationFrame(checkTimer);
    }
  };
  
  requestAnimationFrame(checkTimer);
};

const startTimer = async () => {
  isActive.value = true;
  isStartDisabled.value = true;
  sessionComplete.value = false;
  endTime = Date.now() + (timeLeft.value * 1000);
  
  try {
    await startSound.play();
  } catch (error) {
    console.error('Error playing start sound:', error);
  }
  
  saveState();
  startBackgroundTimer();
};

const handleTimerComplete = async () => {
  isActive.value = false;
  
  try {
    // Loop the alarm sound a few times to make it more noticeable
    alarmSound.loop = true;
    await alarmSound.play();
    
    // Stop the alarm after 3 seconds
    setTimeout(() => {
      alarmSound.loop = false;
      alarmSound.pause();
      alarmSound.currentTime = 0;
    }, 3000);
  } catch (error) {
    console.error('Error playing alarm sound:', error);
  }
  
  if (!isBreak.value) {
    sessionComplete.value = true;
  } else {
    resetTimer();
  }
  
  saveState();
};

const startBreak = () => {
  isBreak.value = true;
  sessionComplete.value = false;
  timeLeft.value = breakTime.value * 60;
  startTimer();
};

const stopTimer = () => {
  isActive.value = false;
  resetTimer();
  localStorage.removeItem('pomodoroState');
};

const resetTimer = () => {
  timeLeft.value = workTime.value * 60;
  isBreak.value = false;
  sessionComplete.value = false;
  isStartDisabled.value = false;
  endTime = 0;
  saveState();
};

watch(timeLeft, (newTimeLeft) => {
  if (newTimeLeft < 0) {
    timeLeft.value = 0;
  }
});

watch([workTime, breakTime], () => {
  if (!isActive.value) {
    timeLeft.value = isBreak.value ? breakTime.value * 60 : workTime.value * 60;
    saveState();
  }
});

// Request notification permission on component mount
onMounted(async () => {
  try {
    if ('Notification' in window) {
      await Notification.requestPermission();
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
});
</script>