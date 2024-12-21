<template>
  <div class="flex items-center gap-2 p-2 mb-6">
    <div class="w-[60px] h-[80px]">

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30">
  <!-- Outer flame -->
  <path d="M12 2 C5 10, 5 20, 12 28 C19 20, 19 10, 12 2" fill="#FF4500">
    <animate 
      attributeName="d" 
      dur="2s"
      repeatCount="indefinite"
      values="
        M12 2 C5 10, 5 20, 12 28 C19 20, 19 10, 12 2;
        M12 2 C6 10, 6 20, 12 28 C18 20, 18 10, 12 2;
        M12 2 C5 10, 5 20, 12 28 C19 20, 19 10, 12 2"
    />
  </path>
  
  <!-- Inner flame -->
  <path d="M12 8 C8 12, 8 20, 12 24 C16 20, 16 12, 12 8" fill="#FFA500">
    <animate 
      attributeName="d" 
      dur="1.5s"
      repeatCount="indefinite"
      values="
        M12 8 C8 12, 8 20, 12 24 C16 20, 16 12, 12 8;
        M12 8 C9 12, 9 20, 12 24 C15 20, 15 12, 12 8;
        M12 8 C8 12, 8 20, 12 24 C16 20, 16 12, 12 8"
    />
  </path>
  
  <!-- Center flame -->
  <path d="M12 12 C10 15, 10 19, 12 21 C14 19, 14 15, 12 12" fill="#FFFF00">
    <animate 
      attributeName="d" 
      dur="1s"
      repeatCount="indefinite"
      values="
        M12 12 C10 15, 10 19, 12 21 C14 19, 14 15, 12 12;
        M12 12 C11 15, 11 19, 12 21 C13 19, 13 15, 12 12;
        M12 12 C10 15, 10 19, 12 21 C14 19, 14 15, 12 12"
    />
  </path>
</svg>
    </div>

    <div>
      <h2 class="font-semibold">NenDev</h2>
      <p class="text-sm text-gray-400">Personal App</p>
    </div>
  </div>
</template>
