<template>
<div class="min-h-screen flex items-center justify-center">
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
          class="px-6 py-3 bg-[#ea580b] text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

// Audio context setup
let audioContext;
let alarmBuffer;
const ALARM_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';

// Initialize Web Audio API
const initAudio = async () => {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const response = await fetch(ALARM_URL);
    const arrayBuffer = await response.arrayBuffer();
    alarmBuffer = await audioContext.decodeAudioData(arrayBuffer);
  } catch (error) {
    console.error('Error initializing audio:', error);
  }
};
// In your Vue component

// Play alarm using Web Audio API
const playAlarm = () => {
  if (!audioContext || !alarmBuffer) return;
  
  try {
    const source = audioContext.createBufferSource();
    source.buffer = alarmBuffer;
    source.connect(audioContext.destination);
    source.loop = true;
    source.start();
    
    // Stop after 3 seconds
    setTimeout(() => {
      source.stop();
    }, 3000);
  } catch (error) {
    console.error('Error playing alarm:', error);
  }
};

// Timer state
const workTime = ref(25);
const breakTime = ref(5);
const isActive = ref(false);
const isBreak = ref(false);
const timeLeft = ref(workTime.value * 60);
const sessionComplete = ref(false);
const isStartDisabled = ref(false);
let endTime = 0;

// Register service worker
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/timer-worker.js', {
        scope: '/'
      });
      console.log('Service Worker registered:', registration);
      
      // Send the initial timer data to the service worker
      if (registration.active) {
        registration.active.postMessage({
          type: 'START_TIMER',
          endTime: endTime
        });
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

onMounted(async () => {
  // Initialize audio and service worker
  await initAudio();
  await registerServiceWorker();
  
  const savedState = JSON.parse(localStorage.getItem('pomodoroState') || '{}');
  if (savedState.endTime && savedState.endTime > Date.now()) {
    restoreState(savedState);
  }
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  if (isActive.value) {
    startBackgroundTimer();
  }
  
  // Request notification permission
  if ('Notification' in window) {
    await Notification.requestPermission();
  }
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
  
  // Play alarm sound
  playAlarm();
  
  // Show notification
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(isBreak.value ? 'Break Complete!' : 'Focus Session Complete!', {
      body: isBreak.value ? 'Time to focus!' : 'Time for a break!',
      icon: '/timer-icon.png'
    });
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