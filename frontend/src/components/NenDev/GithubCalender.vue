<template>
  <h1 class="text-center my-12">Public Repository Commits</h1>
  <div class="flex calendar-wrapper mb-12 text-black">
    <button @click="loadPreviousMonth" class="nav-button">
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="calendar-container grid place-content-center">
      <div class="calendar">
        <div class="calendar-header">
          <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
        </div>
        <div class="calendar-grid">
          <div v-for="day in daysInMonth" :key="day.date" class="calendar-day"
               :style="getDayStyle(day.date)">
            <div class="day-number">{{ day.number }}</div>
            <div v-if="groupedCommits[day.date]" class="contribution-count">
              <!-- {{ groupedCommits[day.date].length }} -->
            </div>
          </div>
        </div>
      </div>
      <div class="legend dark:text-white">
        <div class="legend-item ">
          <div class="color-box" :style="{ backgroundColor: '#fff' }"></div>
          <span>0 commits</span>
        </div>
        <div class="legend-item">
          <div class="color-box" :style="{ backgroundColor: '#f6e9a0' }"></div>
          <span>1-5 commits</span>
        </div>
        <div class="legend-item">
          <div class="color-box" :style="{ backgroundColor: '#d4f7d0' }"></div>
          <span>6-10 commits</span>
        </div>
        <div class="legend-item">
          <div class="color-box" :style="{ backgroundColor: '#4caf50' }"></div>
          <span>11+ commits</span>
        </div>
      </div>
    </div>
    <button @click="loadNextMonth" class="nav-button">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';

const groupedCommits = ref<any>({});
const daysInMonth = ref<Array<{ date: string; number: number }>>([]);
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentMonth = ref<number>(new Date().getMonth());
const currentYear = ref<number>(new Date().getFullYear());

const token = import.meta.env.VITE_GITHUB_TOKEN;

const fetchRepositories = async () => {
  try {
    let allRepos: any[] = [];
    let page = 1;
    let reposResponse;

    do {
      reposResponse = await fetch(`https://api.github.com/user/repos?per_page=100&page=${page}`, {
        headers: {
          Authorization: `token ${token}`
        }
      });

      if (!reposResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const repos = await reposResponse.json();
      allRepos = allRepos.concat(repos);
      page++;
    } while (reposResponse.headers.get('link')?.includes('rel="next"'));

    console.log('Fetched Repositories:', allRepos);

    const fetchAllCommitsPromises = allRepos.map((repo: any) => 
      fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=100`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(commits => commits.map((commit: any) => ({
        date: new Date(commit.commit.author.date).toISOString().split('T')[0]
      })))
    );

    const commits = await Promise.all(fetchAllCommitsPromises);
    const flatCommits = commits.flat();

    const grouped = flatCommits.reduce((acc: any, commit: any) => {
      if (!acc[commit.date]) {
        acc[commit.date] = [];
      }
      acc[commit.date].push(commit);
      return acc;
    }, {});

    console.log('Grouped Commits:', grouped);
    groupedCommits.value = grouped;

    const date = new Date(currentYear.value, currentMonth.value, 1);
    const days = [];
    while (date.getMonth() === currentMonth.value) {
      days.push({
        date: date.toISOString().split('T')[0],
        number: date.getDate()
      });
      date.setDate(date.getDate() + 1);
    }
    daysInMonth.value = days;
  } catch (err) {
    console.error('Error fetching commits:', err);
  }
};

onMounted(() => {
  fetchRepositories();
});

const loadPreviousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
  fetchRepositories();
};

const loadNextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
  fetchRepositories();
};

const getDayStyle = (date: string) => {
  const count = (groupedCommits.value[date] || []).length;
  let backgroundColor = '#fff'; // Default background color

  if (count > 20) {
    backgroundColor = '#4caf50'; // Full green for more than 20 commits
  } else if (count > 10) {
    backgroundColor = '#d4f7d0'; // Light green for up to 20 commits
  } else if (count > 5) {
    backgroundColor = '#f6e9a0'; // Yellow for up to 10 commits
  }

  return { backgroundColor };
};
</script>

<style scoped>
.calendar-container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.calendar-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #333; /* Darker color */
  color: #fff;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555; /* Darker on hover */
}

.calendar {
  display: grid;
  padding: 10px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.calendar-header {
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
  font-size: 18px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-day {
  padding: 5px;
  border-radius: 4px;
  position: relative;
  text-align: center;
  background-color: #f9f9f9;
}

.day-number {
  font-weight: bold;
  font-size: 14px;
}

.contribution-count {
  font-size: 12px;
  position: absolute;
  bottom: 2px;
  right: 2px;
  color: #333;
}

.legend {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 14px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
}
</style>
