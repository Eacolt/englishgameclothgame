import PIXISlider from '../PixiSlider.js'
import PixiSlider from "../PixiSlider";
import {TweenMax} from 'gsap'

class RightDrawer extends PIXI.Container {
  constructor() {
    super();
    this.clothesDrawer = null;
    this.classDrawer = null;
    this.emitChangeCloth = null;
    this.emitClearCloth = null;
    this.emitChangeScene = null;

    this.classDrawerBtnArr = [1, 2, 3];//主题按钮数
    this.clothesDrawerBtnArr = [];//存放刷新各个分类下的具体衣服；存资源名;
    this.clothesDrawerTextureArr = [];
    this.clothesDrawer_slider = null;

    this.classDrawerAnimating = false;
    this.clothesDrawerAnimating = false;

    this.classIconName = '';
    this.clothesLittleBtn = null;

    this._clothesObj ={

    }


    //this.on('added',this.init,this);
  }
  setParticularClothes($obj={}){
      this._clothesObj = $obj;
  }
  setClassDrawerArr($arr) {
    this.classDrawerBtnArr = $arr;
  }
  setClothesDrawerArr($arr) {
    const self = this;
    this.clothesDrawerBtnArr = $arr;


    if(this.clothesDrawer_slider){
      this.clothesDrawer_slider.updateAll();
      let slideCount = 0;
      for(let i=0;i<this.clothesDrawerBtnArr.length;i++){
         if((i+1)%2==1){
           slideCount++;
         }
      }
      this.clothesDrawer_slider.slides = slideCount;


      this.clothesDrawer_slider.swiperWidth = 400;
      this.clothesDrawer_slider.swiperHeight = 760;
      this.clothesDrawer_slider.slideWidth = 400;
      this.clothesDrawer_slider.slideHeight = 180;

      this.clothesDrawer_slider.slideOffset = 25;
      this.clothesDrawer_slider.swiperDirection = 'vertical';
      this.clothesDrawer_slider.slideColorAlpha = 0;
      this.clothesDrawer_slider.x = -180;
      this.clothesDrawer_slider.y = 60;
      this.clothesDrawer_slider.init();
      // return;
      // this.clothesDrawer.getChildAt(1).slides = this.clothesDrawerBtnArr.length;
      var currentClothesArr = [];
      for (let i = 0; i <slideCount; i++) {
        var objectDrawPane = new PIXI.Container();
        for (let i = 0; i < 2; i++) {
          var objectSlotBg = new PIXI.Graphics();
          objectSlotBg.beginFill(0xffffff, 1);
          objectSlotBg.drawRoundedRect(0, 0, 180, 180, 20);
          objectSlotBg.endFill();
          objectSlotBg.x = i * (objectSlotBg.width + 15);
          objectDrawPane.addChild(objectSlotBg);

          objectSlotBg.alpha = 1;
        }
        currentClothesArr.push(objectDrawPane);

        this.clothesDrawer_slider.slidesArr[i].addChild(objectDrawPane);

      };
      let chothIndex = 0;
      //具体刷新的衣服
      currentClothesArr.forEach((item,index)=>{
        if(self.clothesDrawerBtnArr.length>0){
          //具体衣服;
          item.children.forEach((item2,index2)=>{

            var clothes = new PIXI.Sprite(PIXI.Texture.from(self.clothesDrawerBtnArr[chothIndex]));
            item2.addChild(clothes);
            if(self.clothesDrawerBtnArr[chothIndex]==undefined){
              item2.alpha = 0;
            }else{
              item2.interactive = true;
              if( !(index==0 && index2==0)){
                item2.on('pointertap',self.clothesItem_TapHandler.bind(self,chothIndex),self);
              }else{
                item2.on('pointertap',self.clearBtn_TapHandler.bind(self,chothIndex),self);
              }

            }
            chothIndex++;
          })

        }
      })

    }




  }
  clearBtn_TapHandler(index,evt){
    const self = this;
    if(this.clothesDrawer_slider._movedPosArr.length<3){

      if(this.emitClearCloth){
        this.emitClearCloth.call(this,self.classIconName);
      }

    }
  }
  //点击具体的衣服物件触发;
  clothesItem_TapHandler(index,evt){
    if(this.clothesDrawer_slider._movedPosArr.length<3){
      let clotheTexture = evt.currentTarget.getChildAt(0).texture.textureCacheIds[0];
      let hasScene = clotheTexture.indexOf('scene') != -1;//有场景存在;
      if(hasScene){
        if(this.emitChangeScene){
          this.emitChangeScene.call(this,clotheTexture);
        }
      }else{
        if(this.emitChangeCloth){
          this.emitChangeCloth.call(this,clotheTexture);
        }
      }

    }

  }
  setEmitChangeScene($callback=function(){}){
    this.emitChangeScene = $callback;
  }
  setEmitChangeCloth($callback=function(){}){
    this.emitChangeCloth = $callback;
  }

  setEmitClearCloth($callback=function(){}){
    this.emitClearCloth = $callback;
  }


  init() {
    const self = this;
    // this.setClassDrawerArr(["",])
    //初始化classDrawer;
    initialClassDrawer.call(this);
    initialclothesDrawer.call(this);
    //this.showclothesDrawer.call(this)
    this.showClassDrawer.call(this);

    function initialClassDrawer() {
      this.classDrawer = new PIXI.Container();
      var classDrawer_slider = new PIXISlider();
      classDrawer_slider.slides = this.classDrawerBtnArr.length;
      classDrawer_slider.swiperWidth = 216;
      classDrawer_slider.swiperHeight = 888;
      classDrawer_slider.slideWidth = 216;
      classDrawer_slider.slideHeight = 175;
      classDrawer_slider.slideColorAlpha = 0;
      classDrawer_slider.slideOffset = 15;
      classDrawer_slider.swiperDirection = 'vertical'
      classDrawer_slider.init();
      this.classDrawer.addChild(classDrawer_slider);
      this.addChild(this.classDrawer);
      this.classDrawer.x = 218;

      //背景;
      for (let i = 0; i < this.classDrawerBtnArr.length; i++) {
        var classDrawer_bg = new PIXI.Sprite(PIXI.Texture.from('classbtns_png'));
        classDrawer_slider.slidesArr[i].addChild(classDrawer_bg);
        let icons = new PIXI.Sprite(PIXI.Texture.from(this.classDrawerBtnArr[i]));
        classDrawer_slider.slidesArr[i].addChild(icons);
        icons.x = 40;
        icons.y = 15;
        classDrawer_bg.interactive = true;
        classDrawer_bg.on('pointertap', self.classDrawBtn_tapHandler.bind(self, i), this)
      }
    };

    //初始化实体抽屉;
    function initialclothesDrawer() {
      this.clothesDrawer = new PIXI.Container();
      this.clothesDrawer_slider = new PIXISlider();
      this.clothesDrawer_slider.slides = 5;
      this.clothesDrawer_slider.swiperWidth = 400;
      this.clothesDrawer_slider.swiperHeight = 760;
      this.clothesDrawer_slider.slideWidth = 400;
      this.clothesDrawer_slider.slideHeight = 180;

      this.clothesDrawer_slider.slideOffset = 25;
      this.clothesDrawer_slider.swiperDirection = 'vertical';
      this.clothesDrawer_slider.slideColorAlpha = 0;
      this.clothesDrawer_slider.x = -180;
      this.clothesDrawer_slider.y = 60;
      this.clothesDrawer_slider.init();


      var objectDrawBg = new PIXI.Sprite(PIXI.Texture.from('decoratebtns_png'));
      objectDrawBg.pivot.x = 0;
      objectDrawBg.pivot.y = 0;
      objectDrawBg.x = -320;
      this.clothesDrawer.addChild(objectDrawBg);
      this.clothesDrawer.addChild(this.clothesDrawer_slider);
      this.addChild(this.clothesDrawer);
      this.clothesDrawer.x = 600;

      // //背景;

      this.clothesLittleBtn = new PIXI.Sprite();
      this.clothesLittleBtn.x = -320;
      this.clothesLittleBtn.y = 400;
      this.clothesDrawer.addChild(this.clothesLittleBtn);
      this.clothesLittleBtn.interactive = true;
      this.clothesLittleBtn.on('pointertap', this.clothesLittleBtn_TapHandler, this);
      this.clothesLittleBtn.buttonMode = true;

    }


  }

  //
  clothesLittleBtn_TapHandler(e) {
    const self = this;
    if (this.clothesDrawerAnimating == false){
      this.hideclothesDrawer.call(this);
      this.showClassDrawer.call(this,()=>{
       // self.clothesDrawerAnimating = false;
        self.classDrawerAnimating = false;
      });
      this.clothesDrawerAnimating = true;
    }

  }

  classDrawBtn_tapHandler(index, event) {
    const self = this;
    if (this.classDrawer.getChildAt(0)._movedPosArr.length < 3) {
      if (this.classDrawerAnimating == false) {
        this.hideClassDrawer();
        this.showclothesDrawer(()=>{

          self.clothesDrawerAnimating = false;
        });
        this.classDrawerAnimating = true;
        let regs =  this.classDrawerBtnArr[index].replace(/^classicon_|_png$/g,'');


        this.classIconName = this.classDrawerBtnArr[index];
        this.clothesLittleBtn.texture = PIXI.Texture.from(this.classIconName + "_s");
        self.setClothesDrawerArr.call(self,self._clothesObj[regs])
      }

    }
  }

  //展示ClassDrawer;
  showClassDrawer($callback = function () {
  },$time=.3) {

    TweenMax.to(this.classDrawer, $time, {
      x: 0, onComplete: function () {
        $callback();
      }
    })
  }

  hideClassDrawer($callback = function () {
  },$time=.3) {

    TweenMax.to(this.classDrawer, $time, {
      x: 218, onComplete: function () {
        $callback();
      }
    })
  }

  showclothesDrawer($callback = function () {
  },$time=.3) {
    TweenMax.to(this.clothesDrawer, $time, {
      x: 0, onComplete: function () {
        $callback();
      }
    })
  }

  hideclothesDrawer($callback = function () {
  },$time=.3) {
    TweenMax.to(this.clothesDrawer, $time, {
      x: 600, onComplete: function () {
        $callback();
      }
    })
  }
}

export default RightDrawer;
