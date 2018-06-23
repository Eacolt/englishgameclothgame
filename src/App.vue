<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
 import PIXI from 'pixi.js'
  require('pixi-spine')
  export default {
    name: 'App',
    created(){
      document.oncontextmenu = function(){
        return false;
      }
      document.onmousedown = function(e){
        if ( e.which == 2 ){// 鼠标滚轮的按下，滚动不触发
          return false;
        }
        if( e.which==3 ){// 鼠标右键
          return false;
        }
      };

      document.onkeydown = function () {
        if (window.event && window.event.keyCode == 123) {
          event.keyCode = 0;
          event.returnValue = false;
          return false;
        }
      };
    },
    mounted() {

      console.log(this.$store.state.game)


    }
  }
</script>

<style>
  html,body{
    overflow: hidden;
  }
  html, body, div {
    padding: 0;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    tap-highlight-color:transparent;
    user-select: none;

    outline:none;
  }
  #app {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19.20rem;
    height: 10.80rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    transform-origin: center center;
    background: white;
    overflow: hidden;
    /*font-family: sans-serif;*/
  }
</style>
