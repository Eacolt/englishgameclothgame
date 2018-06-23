import PixiSlider from './PixiSlider.js'
import RightDrawer from './gameui/RightDrawer.js'

import {SceneManager} from './EasyPIXI.js'

class Scene1 extends PIXI.Container {
  constructor($options) {
    super();
    this.resources = PIXI.loader.resources;
    this.vueInstance = $options.vueInstance;
    this.classesDrawer = null;
    this.decorateDrawer = null;

    this.boySpine = null;
    this.girlSpine = null;

    this.roomArr = [];

    this.menubtnPhoto = null;
    this.menubtnIndex = null;

    this.layer_ui = null;
    this.layer_photos = null;

    this.gameBg = null;
    this.blackBackground = null;


    this._$x_ticker = null;
    this.on('added', this.initial, this);
  }

  getSlotRegionByName($animation, $name) {
    for (let i = 0; i < $animation.slotContainers.length; i++) {
      for (let k = 0; k < $animation.slotContainers[i].children.length; k++) {
        if ($animation.slotContainers[i].children[k].region.name == $name) {
          return $animation.slotContainers[i]
        }
      }
    }
  }

  changeMyCloth($spineTgt, $names = [], $toNames = []) {
    if ($toNames == null) {
      for (let i = 0; i < $names.length; i++) {
        var slots = $spineTgt.skeleton.findSlot($names[i]);
        slots.setAttachment(null);
      }

    } else {
      for (let i = 0; i < $names.length; i++) {
        var slots = $spineTgt.skeleton.findSlot($names[i]);
        var myAttach = $spineTgt.skeleton.getAttachment(slots.data.index, $toNames[i]) //然后取得page_imgs1插槽下名为page_imgs1-2的这个挂件
        slots.setAttachment(myAttach); //
      }

    }
  }

  initial() {
    const self = this;

    this.upperLine = new PIXI.Sprite(PIXI.Texture.from('shadowline_png'));




    self.vueInstance.axios.post('preparelessongame.com');

    this.layer_ui = new PIXI.Container();
    this.layer_photos = new PIXI.Container();

    this.menubtnPhoto = new PIXI.Sprite(PIXI.Texture.fromImage('menuBtnPhoto_png'));
    this.menubtnIndex = new PIXI.Sprite(PIXI.Texture.fromImage('menuBtnIndex_png'));
    this.menubtnIndex.interactive = this.menubtnPhoto.interactive = true;
    this.menubtnIndex.buttonMode = this.menubtnPhoto.buttonMode = true;
    this.menubtnIndex.x = 90;
    this.menubtnIndex.y = 45;
    this.menubtnPhoto.x = 250;
    this.menubtnPhoto.y = 45;

    this.blackBackground = new PIXI.Graphics();
    this.blackBackground.beginFill(0xbf7f4f4);
    this.blackBackground.drawRect(0,0,1920,1080);
    this.blackBackground.endFill();
    this.addChild(this.blackBackground);
    this.blackBackground.alpha = 0;


    //初始化背景
    this.gameBg = new PIXI.Container(); // new PIXI.spine.Spine(PIXI.loader.resources['room01_skeleton'].spineData); //new PIXI.Sprite(PIXI.Texture.from('clothes_room03_png'));

    let baseRoom = new PIXI.Sprite(PIXI.Texture.from('clothes_roomBase_png')); //new PIXI.Sprite(PIXI.Texture.from('clothes_room03_png'));

    
    let room01 = new PIXI.spine.Spine(PIXI.loader.resources['room01_skeleton'].spineData); //new PIXI.Sprite(PIXI.Texture.from('clothes_room03_png'));
    console.log('----',room01)
    room01.state.setAnimation(0, 'animation', true);
    room01.x = 1920 / 2;
    room01.y = 1080 / 2;
    this.layer_photos.addChild(room01);
    let room02 = new PIXI.spine.Spine(PIXI.loader.resources['room02_skeleton'].spineData); //new PIXI.Sprite(PIXI.Texture.from('clothes_room03_png'));
    room02.state.setAnimation(0, 'animation', true);
    room02.x = 1920 / 2;
    room02.y = 1080 / 2;
    this.layer_photos.addChild(room02);
    this.layer_photos.addChild(baseRoom);
    this.layer_photos.pivot.x = 1920/2;
     this.layer_photos.pivot.y =1080/2;
     this.layer_photos.x  = 1920/2;
     this.layer_photos.y = 1080/2;
    room02.alpha = room01.alpha = 0;
    //room02.state.timeScale = room01

    this.roomArr.push(baseRoom)
    this.roomArr.push(room01);
    this.roomArr.push(room02)


    if (self.vueInstance.monsterSex == 1) {
      this.createBoy.call(self);

    }
    else if (self.vueInstance.monsterSex == 0) {
      this.createGirl.call(self)
    }


    this.layer_ui.addChild(this.menubtnPhoto);
    this.layer_ui.addChild(this.menubtnIndex);
    this.addChild(this.layer_photos);
    this.addChild(this.layer_ui);





    //Event Handler;
    this.menubtnPhoto.on('pointertap',this.menuPhoto_tapHandler,this);
    this.menubtnIndex.on('pointertap',this.menuIndex_tapHandler,this);

  }

  menuIndex_tapHandler(){
    this.menubtnIndex.removeAllListeners();
    this.menubtnPhoto.removeAllListeners();
    this.layer_photos.destroy();
    this.layer_ui.destroy()
    SceneManager.run('gameBoot')

  }
  menuPhoto_tapHandler(){
    this.layer_ui.alpha = 0;
    this.layer_ui.interactiveChildren = false;

    let closeBtn = new PIXI.Sprite(PIXI.Texture.from('menuBtnClose_png'));
    closeBtn.pivot.x = closeBtn.width/2;
    closeBtn.pivot.y = 0;
    closeBtn.x = 1920-150;
    closeBtn.y = 55;
    closeBtn.interactive = true;
    closeBtn.buttonMode = true;

    this.blackBackground.alpha = 0;
    let crackPhoto = function(){
      let bg = new PIXI.Graphics();
      bg.beginFill(0xffffff).drawRect(0,0,1920,1080).endFill();
      this.addChild(bg)
      TweenMax.to(bg,0.6,{alpha:0,onComplete:function(){
        bg.destroy();
        }})
    }

    let outlineBg = new PIXI.Sprite(PIXI.Texture.from('outline_png'));

    this.layer_photos.addChild(outlineBg)
    TweenMax.to(this.layer_photos,1,{
      rotation:6*Math.PI/180,

    });
    this.roomArr.forEach((item)=>{
      if(item.state){
        item.state.timeScale = 0;
      }
    });
    if(this.boySpine){
      this.boySpine.state.timeScale = 0;
    }
    if(this.girlSpine){
      this.girlSpine.state.timeScale = 0;
    }
    crackPhoto.call(this)
    this.layer_photos.addChild(closeBtn);
    closeBtn.on('pointertap',()=>{
      SceneManager.run('gameBoot');
    });
  }
   createBoy() {
    var attchClothName = {
      classicon_glasses_png: {
        className: ['skin-glasses'],
        clothesNames: {
          boy_clothes_glasses01_png: ['skin1-glasses'],
          boy_clothes_glasses02_png: ['skin3-glasses']
        }
      },
      classicon_cap_png: {
        className: ['skin-cap'],
        clothesNames: {
          boy_clothes_cap01_png: ['skin1-cap'],

        }
      },
      classicon_props_png: {
        className: ['skin-props'],
        clothesNames: {
          boy_clothes_props01_png: ['skin3-props'],
          boy_clothes_props02_png: ['skin2-props'],

        }
      },
      classicon_shorts_png: {
        className: ['skin-shorts'],
        clothesNames: {
          boy_clothes_shorts01_png: ['skin1-shorts'],
          boy_clothes_shorts02_png: ['skin2-shorts'],
          boy_clothes_shorts03_png: ['skin3-shorts'],
          boy_clothes_shorts04_png: ['skin4-shorts'],
        }
      },
      classicon_tshirt_png: {
        className: ['skin-shirt'],
        clothesNames: {
          boy_clothes_tshirt01_png: ['skin1-shirt'],
          boy_clothes_tshirt02_png: ['skin2-shirt'],
          boy_clothes_tshirt03_png: ['skin4-shirt'],
        }
      },

      classicon_shoes_png: {
        className: ['skin-shoseL', 'skin-shoseR'],
        clothesNames: {
          boy_clothes_shoes01_png: ['skin1-shoseL', 'skin1-shoseR'],
          boy_clothes_shoes02_png: ['skin2-shoseL', 'skin2-shoseR'],
          boy_clothes_shoes03_png: ['skin3-shoseL', 'skin3-shoseR'],
          boy_clothes_shoes04_png: ['skin4-shoseL', 'skin4-shoseR'],


        }
      },


      classicon_hairpin_png: {
        className: ['skin-hairpin'],
        clothesNames: {
          boy_clothes_hairpin01_png: ['skin2-hairpin'],

        }
      },

    }
    const self = this;
    //男性{-----
    //初始化人物角色
    this.boySpine = new PIXI.spine.Spine(PIXI.loader.resources['boymonster_skeleton'].spineData);
     this.layer_photos.addChild(this.boySpine);
    this.boySpine.skeleton.setSlotsToSetupPose();
    this.boySpine.x = 1920 / 2;
    this.boySpine.y = 1080 / 2 + 120;


    this.boySpine.state.setAnimation(0, 'monster1', true);


    var rightDrawer = new RightDrawer();
     this.layer_ui.addChild(rightDrawer);
    rightDrawer.setClassDrawerArr([
      'classicon_cap_png',
      'classicon_glasses_png',
      'classicon_hairpin_png',
      'classicon_shoes_png',
      'classicon_shorts_png',
      'classicon_suit_png',
      'classicon_tshirt_png',
      'classicon_props_png',
      'classicon_scene_png',

    ]);

    rightDrawer.setParticularClothes({
        cap: ['clothes_clean_png', 'boy_clothes_cap01_png'],
        glasses: ['clothes_clean_png', 'boy_clothes_glasses01_png', 'boy_clothes_glasses02_png'],
        hairpin: ['clothes_clean_png', 'boy_clothes_hairpin01_png'],
        shoes: ['clothes_clean_png', 'boy_clothes_shoes01_png', 'boy_clothes_shoes02_png', 'boy_clothes_shoes03_png', 'boy_clothes_shoes04_png'],
        shorts: ['clothes_clean_png', 'boy_clothes_shorts01_png', 'boy_clothes_shorts02_png', 'boy_clothes_shorts03_png', 'boy_clothes_shorts04_png'],
        suit: ['clothes_clean_png', 'boy_clothes_suit01_png', 'boy_clothes_suit02_png', 'boy_clothes_suit03_png', 'boy_clothes_suit04_png'],
        tshirt: ['clothes_clean_png', 'boy_clothes_tshirt01_png', 'boy_clothes_tshirt02_png', 'boy_clothes_tshirt03_png'],
        props: ['clothes_clean_png', 'boy_clothes_props01_png', 'boy_clothes_props02_png'],
        scene: ['clothes_clean_png', 'girl_clothes_scene01_png', 'girl_clothes_scene02_png']
      }
    );
    rightDrawer.init();
     // let ticker = new PIXI.ticker.Ticker();
     // ticker.add((d)=>{
     //   console.log(d)
     //  // console.log(rightDrawer.classDrawer.getChildAt(1).wrapper.y);
     // })
     // ticker.start()
     // ticker.minFPS   = 1;

     let n = 0;
     let upperLine = new PIXI.Sprite(PIXI.Texture.from('shadowline_png'));
     let downLine = new PIXI.Sprite(PIXI.Texture.from('shadowline_png'));


     this._$x_ticker = new PIXI.ticker.Ticker();
     this._$x_ticker.add((d)=>{
       if(n%10==0){
         n=0;
         if(rightDrawer.classDrawer.getChildAt(1).wrapper.y<=0){

         }else{

         }
       }
      n++;

     })
     this._$x_ticker.start();

     rightDrawer.x = 1920 - 216;
    rightDrawer.y = 96;

    rightDrawer.setEmitClearCloth(($className) => {

      if ($className.indexOf('suit') != -1) {

        self.changeMyCloth(self.boySpine, attchClothName['classicon_glasses_png'].className, null);
        self.changeMyCloth(self.boySpine, attchClothName['classicon_shorts_png'].className, null);
        self.changeMyCloth(self.boySpine, attchClothName['classicon_props_png'].className, null);
        self.changeMyCloth(self.boySpine, attchClothName['classicon_cap_png'].className, null);
        self.changeMyCloth(self.boySpine, attchClothName['classicon_tshirt_png'].className, null);
        self.changeMyCloth(self.boySpine, attchClothName['classicon_cap_png'].className, null);
        self.changeMyCloth(self.boySpine, attchClothName['classicon_shoes_png'].className, null);
      }
      if($className.indexOf('scene') != -1){
        this.roomArr.forEach((item) => {
          item.alpha = 0;
        })
        this.roomArr[0].alpha = 1
      }
      if($className.indexOf('scene') == -1 && $className.indexOf('suit') == -1){
        self.changeMyCloth(self.boySpine, attchClothName[rightDrawer.classIconName].className, null);
      }








    });

    rightDrawer.setEmitChangeScene(($sceneName) => {

      switch ($sceneName) {
        case 'girl_clothes_scene01_png':

          this.roomArr.forEach((item) => {
            item.alpha = 0;
          })
          this.roomArr[1].alpha = 1

          break;
        case 'girl_clothes_scene02_png':

          this.roomArr.forEach((item) => {
            item.alpha = 0;
          });

          this.roomArr[2].alpha = 1
          break;
        default:
          break;
      }
    })

    rightDrawer.setEmitChangeCloth(($cloth) => {


      if ($cloth.indexOf('suit') != -1) {
        let classSuit = $cloth.replace(/^classicon_|_png$/g, '');
        switch (classSuit) {
          case 'boy_clothes_suit01':

            self.changeMyCloth(self.boySpine, attchClothName['classicon_glasses_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shorts_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_props_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_cap_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_tshirt_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_hairpin_png'].className, null);


            self.changeMyCloth(self.boySpine, attchClothName['classicon_glasses_png'].className, attchClothName['classicon_glasses_png'].clothesNames['boy_clothes_glasses02_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shorts_png'].className, attchClothName['classicon_shorts_png'].clothesNames['boy_clothes_shorts03_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_props_png'].className, attchClothName['classicon_props_png'].clothesNames['boy_clothes_props01_png']);
            // self.changeMyCloth(self.boySpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['boy_clothes_shoes03_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['boy_clothes_shoes03_png']);
            break;

          case 'boy_clothes_suit02':
            self.changeMyCloth(self.boySpine, attchClothName['classicon_glasses_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shorts_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_props_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_cap_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_tshirt_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_hairpin_png'].className, null);


            self.changeMyCloth(self.boySpine, attchClothName['classicon_glasses_png'].className, attchClothName['classicon_glasses_png'].clothesNames['boy_clothes_glasses01_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_cap_png'].className, attchClothName['classicon_cap_png'].clothesNames['boy_clothes_cap01_png']);

            self.changeMyCloth(self.boySpine, attchClothName['classicon_shorts_png'].className, attchClothName['classicon_shorts_png'].clothesNames['boy_clothes_shorts01_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_tshirt_png'].className, attchClothName['classicon_tshirt_png'].clothesNames['boy_clothes_tshirt01_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['boy_clothes_shoes01_png']);
            break;


          case 'boy_clothes_suit03':
            self.changeMyCloth(self.boySpine, attchClothName['classicon_glasses_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shorts_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_props_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_cap_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_tshirt_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_hairpin_png'].className, null);


            self.changeMyCloth(self.boySpine, attchClothName['classicon_shorts_png'].className, attchClothName['classicon_shorts_png'].clothesNames['boy_clothes_shorts04_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_tshirt_png'].className, attchClothName['classicon_tshirt_png'].clothesNames['boy_clothes_tshirt03_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['boy_clothes_shoes04_png']);
            break;
          case 'boy_clothes_suit04':
            self.changeMyCloth(self.boySpine, attchClothName['classicon_glasses_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shorts_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_props_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_cap_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_tshirt_png'].className, null);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_hairpin_png'].className, null);

            self.changeMyCloth(self.boySpine, attchClothName['classicon_hairpin_png'].className, attchClothName['classicon_hairpin_png'].clothesNames['boy_clothes_hairpin01_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shorts_png'].className, attchClothName['classicon_shorts_png'].clothesNames['boy_clothes_shorts02_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_tshirt_png'].className, attchClothName['classicon_tshirt_png'].clothesNames['boy_clothes_tshirt02_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['boy_clothes_shoes02_png']);
            self.changeMyCloth(self.boySpine, attchClothName['classicon_props_png'].className, attchClothName['classicon_props_png'].clothesNames['boy_clothes_props02_png']);
            break;
          default:
            break;
        }

      } else {
        self.changeMyCloth(self.boySpine, attchClothName[rightDrawer.classIconName].className, attchClothName[rightDrawer.classIconName].clothesNames[$cloth]);
      }


    })


    //----男性}

  }
   createGirl() {
    var attchClothName = {
      classicon_glasses_png: {
        className: ['skin-glasses'],
        clothesNames: {
          girl_clothes_glasses01_png: ['skin1-glasses'],
          girl_clothes_glasses02_png: ['skin3-glasses']
        }
      },
      classicon_cap_png: {

        className: ['skin-cap'],
        clothesNames: {
          girl_clothes_cap01_png: ['skin1-cap'],
          girl_clothes_cap02_png: ['skin4-cap'],
        }


      },
      classicon_props_png: {

        className: ['skin-props'],
        clothesNames: {
          girl_clothes_props01_png: ['skin5-props'],
          girl_clothes_props02_png: ['skin3-props']

        }


      },
      classicon_skirt_png: {
        className: ['skin-skirt'],
        clothesNames: {
          girl_clothes_skirt01_png: ['skin1-skirt'],
          girl_clothes_skirt02_png: ['skin2-skirt'],
          girl_clothes_skirt03_png: ['skin4-skirt'],
          girl_clothes_skirt04_png: ['skin5-skirt'],
        }
      },
      classicon_tshirt_png: {
        className: ['skin-shirt'],
        clothesNames: {
          girl_clothes_tshirt01_png: ['skin1-shirt'],
          girl_clothes_tshirt02_png: ['skin2-shirt'],
          girl_clothes_tshirt03_png: ['skin3-shirt'],
          girl_clothes_tshirt04_png: ['skin4-shirt'],
          girl_clothes_tshirt05_png: ['skin5-shirt'],

        }
      },


      classicon_shoes_png: {
        className: ['skin-shoseL', 'skin-shoseR'],
        clothesNames: {
          girl_clothes_shoes01_png: ['skin1-shoseL', 'skin1-shoseR'],
          girl_clothes_shoes02_png: ['skin2-shoseL', 'skin2-shoseR'],
          girl_clothes_shoes03_png: ['skin3-shoseL', 'skin3-shoseR'],
          girl_clothes_shoes04_png: ['skin4-shoseL', 'skin4-shoseR'],
          girl_clothes_shoes05_png: ['skin5-shoseL', 'skin5-shoseR'],
        }
      },

      classicon_hairpin_png: {
        className: ['skin2-hairpin'],
        clothesNames: {
          girl_clothes_hairpin01_png: ['skin2-hairpin'],

        }
      },

    }
    const self = this;
    //女性
    // {-----
    //初始化人物角色
    this.girlSpine = new PIXI.spine.Spine(PIXI.loader.resources['girlmonster_skeleton'].spineData);

    this.layer_photos.addChild(this.girlSpine);
    this.girlSpine.skeleton.setSlotsToSetupPose();
    this.girlSpine.x = 1920 / 2;
    this.girlSpine.y = 1080 / 2 + 120;
    this.girlSpine.state.setAnimation(0, 'monster2', true)
     this.girlSpine.scale.x = this.girlSpine.scale.y = 1.1


    var rightDrawer = new RightDrawer();
     this.layer_ui.addChild(rightDrawer);
    rightDrawer.setClassDrawerArr([
      'classicon_cap_png',
      'classicon_glasses_png',
      'classicon_hairpin_png',
      'classicon_shoes_png',
      'classicon_skirt_png',
      'classicon_suit_png',
      'classicon_tshirt_png',
      'classicon_props_png',
      'classicon_scene_png',
    ]);


    rightDrawer.setParticularClothes({
        cap: ['clothes_clean_png', 'girl_clothes_cap01_png', 'girl_clothes_cap02_png'],
        glasses: ['clothes_clean_png', 'girl_clothes_glasses01_png', 'girl_clothes_glasses02_png'],
        hairpin: ['clothes_clean_png', 'girl_clothes_hairpin01_png'],
        shoes: ['clothes_clean_png', 'girl_clothes_shoes01_png', 'girl_clothes_shoes02_png', 'girl_clothes_shoes03_png', 'girl_clothes_shoes04_png', 'girl_clothes_shoes05_png'],
        skirt: ['clothes_clean_png', 'girl_clothes_skirt01_png', 'girl_clothes_skirt02_png', 'girl_clothes_skirt03_png', 'girl_clothes_skirt04_png'],
        suit: ['clothes_clean_png', 'girl_clothes_suit01_png', 'girl_clothes_suit02_png', 'girl_clothes_suit03_png', 'girl_clothes_suit04_png','girl_clothes_suit05_png'],
        tshirt: ['clothes_clean_png', 'girl_clothes_tshirt01_png', 'girl_clothes_tshirt02_png', 'girl_clothes_tshirt03_png', 'girl_clothes_tshirt04_png', 'girl_clothes_tshirt05_png'],
        props: ['clothes_clean_png', 'girl_clothes_props01_png', 'girl_clothes_props02_png'],
        scene: ['clothes_clean_png', 'girl_clothes_scene01_png', 'girl_clothes_scene02_png']
      }
    );
    rightDrawer.init();

    rightDrawer.x = 1920 - 216;
    rightDrawer.y = 96;

    rightDrawer.setEmitChangeScene(($sceneName) => {

      switch ($sceneName) {
        case 'girl_clothes_scene01_png':

          this.roomArr.forEach((item) => {
            item.alpha = 0;
          })
          this.roomArr[1].alpha = 1

          break;
        case 'girl_clothes_scene02_png':

          this.roomArr.forEach((item) => {
            item.alpha = 0;
          })
          this.roomArr[2].alpha = 1
          break;
        default:
          break;
      }
    })
    rightDrawer.setEmitClearCloth(($className) => {
      if ($className.indexOf('suit') != -1) {

        self.changeMyCloth(self.girlSpine, attchClothName['classicon_glasses_png'].className, null);
        self.changeMyCloth(self.girlSpine, attchClothName['classicon_skirt_png'].className, null);
        self.changeMyCloth(self.girlSpine, attchClothName['classicon_props_png'].className, null);
        self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, null);
        self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, null);
        self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, null);
        self.changeMyCloth(self.girlSpine, attchClothName['classicon_shoes_png'].className, null);
      }
      if($className.indexOf('scene') != -1){
        this.roomArr.forEach((item) => {
          item.alpha = 0;
        })
        this.roomArr[0].alpha = 1
      }
      if($className.indexOf('scene') == -1 && $className.indexOf('suit') == -1){
        self.changeMyCloth(self.girlSpine, attchClothName[rightDrawer.classIconName].className, null);
      }

    });

    rightDrawer.setEmitChangeCloth(($cloth) => {

      if ($cloth.indexOf('suit') != -1) {
        let classSuit = $cloth.replace(/^classicon_|_png$/g, '');
        switch (classSuit) {
          case 'girl_clothes_suit01':

            self.changeMyCloth(self.girlSpine, attchClothName['classicon_glasses_png'].className, null);

            self.changeMyCloth(self.girlSpine, attchClothName['classicon_props_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, null);

            self.changeMyCloth(self.girlSpine, attchClothName['classicon_glasses_png'].className, attchClothName['classicon_glasses_png'].clothesNames['girl_clothes_glasses02_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_props_png'].className, attchClothName['classicon_props_png'].clothesNames['girl_clothes_props02_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, attchClothName['classicon_tshirt_png'].clothesNames['girl_clothes_tshirt03_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['girl_clothes_shoes03_png']);

            break;

          case 'girl_clothes_suit02':

            self.changeMyCloth(self.girlSpine, attchClothName['classicon_glasses_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_props_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_skirt_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, null);



            self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, attchClothName['classicon_cap_png'].clothesNames['girl_clothes_cap02_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, attchClothName['classicon_tshirt_png'].clothesNames['girl_clothes_tshirt04_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['girl_clothes_shoes04_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_skirt_png'].className, attchClothName['classicon_skirt_png'].clothesNames['girl_clothes_skirt03_png']);
            break;


          case 'girl_clothes_suit03':
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_glasses_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_props_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_skirt_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, null);




            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, attchClothName['classicon_tshirt_png'].clothesNames['girl_clothes_tshirt02_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['girl_clothes_shoes02_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_skirt_png'].className, attchClothName['classicon_skirt_png'].clothesNames['girl_clothes_skirt02_png']);
            break;
          case 'girl_clothes_suit04':
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_glasses_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_props_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_skirt_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, null);


            self.changeMyCloth(self.girlSpine, attchClothName['classicon_glasses_png'].className, attchClothName['classicon_glasses_png'].clothesNames['girl_clothes_glasses01_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, attchClothName['classicon_cap_png'].clothesNames['girl_clothes_cap01_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, attchClothName['classicon_tshirt_png'].clothesNames['girl_clothes_tshirt01_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['girl_clothes_shoes01_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_skirt_png'].className, attchClothName['classicon_skirt_png'].clothesNames['girl_clothes_skirt01_png']);
            break;

          case 'girl_clothes_suit05':
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_glasses_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_cap_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_props_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_skirt_png'].className, null);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, null);


            self.changeMyCloth(self.girlSpine, attchClothName['classicon_props_png'].className, attchClothName['classicon_props_png'].clothesNames['girl_clothes_props01_png']);

            self.changeMyCloth(self.girlSpine, attchClothName['classicon_tshirt_png'].className, attchClothName['classicon_tshirt_png'].clothesNames['girl_clothes_tshirt05_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_shoes_png'].className, attchClothName['classicon_shoes_png'].clothesNames['girl_clothes_shoes05_png']);
            self.changeMyCloth(self.girlSpine, attchClothName['classicon_skirt_png'].className, attchClothName['classicon_skirt_png'].clothesNames['girl_clothes_skirt04_png']);
            break;
          default:
            break;
        }

      } else {
        self.changeMyCloth(self.girlSpine, attchClothName[rightDrawer.classIconName].className, attchClothName[rightDrawer.classIconName].clothesNames[$cloth]);
      }


    })
    //----女性}
  }

}

export default Scene1;
