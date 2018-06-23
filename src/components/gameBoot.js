import {SceneManager} from './EasyPIXI.js'
import PixiSlider from './PixiSlider.js'
class GameBoot extends PIXI.Container{
  constructor($options){
    super();
    this.bg_b = null;
    this.bg_grand = null;
    this.vueInstance = $options.vueInstance;
    this.resources = PIXI.loader.resources;

    this.closeBtn = null;
    this.on('added',this.addedToStage,this);
  }
  addedToStage(){
    const self = this;

    let mySwiper = new PixiSlider();
    mySwiper.slideColorAlpha = 0;
    mySwiper.slideWidth = 800;
    mySwiper.slideHeight = 800;
    mySwiper.swiperWidth = 800;
    mySwiper.swiperHeight = 800;
    mySwiper.x = 1920/2-400;
    mySwiper.y = 1080/2-180;
    mySwiper.slides = 2;
    mySwiper.slideOffset = 0;
    mySwiper.smoothingMode = false;
    mySwiper.init();
    this.bg_b = new PIXI.Sprite(this.resources['indexpageBack_png'].texture);
    this.bg_b.pivot.x = this.bg_b.width/2;
    this.bg_b.pivot.y = this.bg_b.height/2;
    this.bg_b.x = 1920/2;
    this.bg_b.y = 1080/2+66;
    this.addChild(this.bg_b);

    this.closeBtn = new PIXI.Sprite(PIXI.Texture.from('menuBtnClose_png'));
    this.closeBtn.pivot.x = this.closeBtn.width/2;
    this.closeBtn.pivot.y = 0;
    this.closeBtn.x = 1920-90;
    this.closeBtn.y = 45;
    this.closeBtn.interactive = true;
    this.closeBtn.buttonMode = true;



    this.addChild(mySwiper);
    mySwiper.setCallBackPointerUp((data)=>{
     // if(isNaN(data.movedOffset))return;
      if(data.movedOffset<0){
        if(mySwiper.realIndex<mySwiper.slides-1){
          mySwiper.slideTo(mySwiper.realIndex+1)
        }
      }else if(data.movedOffset>=0){
        if(mySwiper.realIndex>0){
          mySwiper.slideTo(mySwiper.realIndex-1)
        }
      }else{
        mySwiper.slideTo(mySwiper.realIndex)
      }
    });
    var boySpine = new PIXI.Sprite(PIXI.loader.resources['monsterboy_png'].texture);
    var girlSpine = new PIXI.Sprite(PIXI.loader.resources['monstergirl_png'].texture);
    boySpine.pivot.x = -48;

    boySpine.scale.x = boySpine.scale.y = 0.95;
    girlSpine.scale.x = girlSpine.scale.y = 0.95;
    boySpine.interactive = girlSpine.interactive = true;
    mySwiper.slidesArr[0].addChild(boySpine);
    mySwiper.slidesArr[1].addChild(girlSpine);
    this.bg_grand = new PIXI.Sprite(this.resources['indexpage_png'].texture);
    //this.bg_grand.alpha = 0;
    this.addChild(this.bg_grand);

    boySpine.on('pointertap',(data)=>{

      if(mySwiper._movedPosArr.length<3){
        self.vueInstance.SET_MONSTERSEX(1)
        SceneManager.run('gameScene')

      }
    })
    girlSpine.on('pointertap',(data)=>{
      if(mySwiper._movedPosArr.length<3){
        self.vueInstance.SET_MONSTERSEX(0)
        SceneManager.run('gameScene')

      }
    })
    this.addChild(this.closeBtn);
    this.closeBtn.on('pointertap',this.closeBtn_tapHandler,this)



  }
  closeBtn_tapHandler(){
    //返回主目录;
    window.parent.postMessage({
      "type": "preparationClose"
    }, "*");
    console.log('返回')
  }


}
export default GameBoot;
