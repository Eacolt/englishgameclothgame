<template>
  <div id="pixigame">
    <pixi-canvas  @startGame="gameStart"></pixi-canvas>


  </div>
</template>

<script>
  import {SceneManager} from './EasyPIXI.js'
  import GameBoot from './gameBoot.js'
  import GameScene1 from './gameScene1.js'
  import {mapState,mapActions} from 'vuex'


export default {
  name: 'pixi-game',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    ...mapState(['gameAssetsInit','monsterSex'])
  },
  methods:{
    ...mapActions(['SET_GAMEASSETSINIT','SET_MONSTERSEX']),
    gameStart(app){
      const self = this;



     self.axios.get('static/gameconfig.json').then((res)=>{
       self.axios.get('static/boy_clothes.json').then((boyClothRes)=>{
         self.axios.get('static/girl_clothes.json').then((girlClothRes)=>{
           if(self.gameAssetsInit==0){
             PIXI.loader.add(res.data.assets);
             PIXI.loader.add(boyClothRes.data);
             PIXI.loader.add(girlClothRes.data);
             PIXI.loader.load((loader,resource)=>{
               GameStart.call(self);
               self.SET_GAMEASSETSINIT(1);
             });
           }else{
             GameStart.call(self);
           }


         });






       });



      });


     function GameStart(){
       SceneManager.stage = app.stage;
        var gameBoot = new GameBoot({vueInstance:self});
        var gamescene = new GameScene1({vueInstance:self});
       //
        SceneManager.push(gameBoot,"gameBoot");
       SceneManager.push(gamescene,"gameScene");
       // SceneManager.push(gamescene,"scene1");

       //
       //
       //
        SceneManager.run('gameBoot')
     }


    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
