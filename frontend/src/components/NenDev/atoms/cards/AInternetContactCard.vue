<template>
  <div
    class="grid sm:grid-cols-2 items-center gap-8 p-8 xl:m-auto max-w-[800px] bg-white shadow-2xl rounded-md text-[#333] font-[sans-serif]"
  >
    <div>
      <h1 class="text-3xl font-extrabold">{{ title }}</h1>
      <p class="text-sm text-gray-400 mt-3 text-wrap">{{ subtitle }}</p>
      <div class="mt-12">
        <h2 class="text-lg font-extrabold">Email</h2>
        <ul class="mt-3">
          <li class="flex items-center">
            <div
              class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="#007bff"
                viewBox="0 0 479.058 479.058"
              >
                <path
                  d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                  data-original="#000000"
                />
              </svg>
            </div>
            <a target="blank" :href="`mailto:${email}`" class="text-[#007bff] text-sm ml-3">
              <small class="block">Mail</small>
              <strong>{{ email }}</strong>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <form class="space-y-4 flex flex-col">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
      />
      <input
        v-model="customerEmail"
        type="email"
        placeholder="Email"
        class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
      />
      <input
        v-model="subject"
        type="text"
        placeholder="Subject"
        class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
      />
      <textarea
        v-model="message"
        placeholder="Message"
        rows="6"
        class="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
      ></textarea>
      <button
        @click="sendMessage"
        class="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
      >
        Send
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  title: String,
  subtitle: String,
  email: String
})

const name = ref('')
const customerEmail = ref('')
const subject = ref('')
const message = ref('')

const emailLink = `mailto:${props.email}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(message.value)}`

const sendMessage = () => {
  // Logic to send message
}
</script>
