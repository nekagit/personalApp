<template><div class="phone">
  <div class="page">Home</div>
  
  <nav>
    <div class="wave-wrap">
      <svg version="1.1" id="wave" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 119 26">
          <path class="path" 
                d="M120.8,26C98.1,26,86.4,0,60.4,0C35.9,0,21.1,26,0.5,26H120.8z"/>
        </svg>
    </div>

    <ul class="list-wrap">
      <li data-color="linear-gradient(to top, #09203f 0%, #537895 100%)" title="Home">
        <i class="icon ion-ios-home"></i>
      </li>
      <li data-color="#ff6b81" title="Profile">
        <i class="icon ion-ios-person"></i>
      </li>
      <li data-color="#7bed9f" title="Get a beer!">
        <i class="icon ion-ios-beer"></i>
      </li>
      <li data-color="#70a1ff" title="Files">
        <i class="icon ion-ios-folder-open"></i>
      </li>
      <li data-color="#dfe4ea" title="Settings">
        <i class="icon ion-ios-settings"></i>
      </li>
    </ul>
  </nav>
  
</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

$black: #2f3542;
$grey: #a4b0be;

body{
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:100vh;
  transition:background .5s cubic-bezier(0.23, 1, 0.32, 1);
}

nav{
  width:440px;
}

// WAVE
.wave-wrap{
  position:relative;
  width:100%;
  height:33px;
  overflow:hidden;
  margin-bottom:0;
  
  #wave{
    position:absolute;
    width:150px;
    transform-origin:bottom;
    transform:scaleY(0.8);
    transition:all .6s cubic-bezier(0.23, 1, 0.32, 1);
    
    .path{
      fill:$black;
    }
  }
}

// LIST
.list-wrap{
  display:flex;
  width:100%;
  height:80px;
  background:$black;
  list-style:none;
  justify-content:space-around;
  padding: 0 20px;
  
  li{
    cursor:pointer;
    position:relative;
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition:all .6s cubic-bezier(0.23, 1, 0.32, 1);
    
    i{
      position:relative;
      font-size:1.5em;
      color:$grey;
      transition:all .6s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    &:before{
      content:"";
      position:absolute;
      background:green;
      height:80%;
      width:80%;
      left:10%;
      top:10%;
      border-radius:50%;
      transform:scale(0);
      transition:all .6s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    &.active{
      margin-top:-10px;
      
      i{
        color:$black;
      }
      
      &:before{
        transform:scale(1);
      }
    }
    
    &:nth-child(1){&:before{background:#537895}}
    &:nth-child(2){&:before{background:#ff6b81}}
    &:nth-child(3){&:before{background:#7bed9f}}
    &:nth-child(4){&:before{background:#70a1ff}}
    &:nth-child(5){&:before{background:#dfe4ea}}
  }
}


// ▼ this is not necessary for the navigation ▼

.phone{
  height:300px;
  border:7px solid rgba(0, 0, 0, 0.05);
  border-radius:20px;
  overflow:hidden;
  display:flex;
  align-items:flex-end;
  flex-direction:column;
  font-family: 'Montserrat', sans-serif;
  
  .page{
    height:327px;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:3em;
    color:rgba(0, 0, 0, 0.1);
    text-transform:uppercase;
    letter-spacing:5pt;
    padding-top:50px;
  }
}
</style>