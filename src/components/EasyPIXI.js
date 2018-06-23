class SceneManager{
  static scenes = [];
  static stage = null;
  static push($scene,$sceneName){
    // for(let i=0;i<$scenePoor.length;i++){
    //   SceneManager.scenes.push({
    //     name:""
    //   })
    // }\\

    // SceneManager.scenes.forEach((item)=>{
    //   if(item.name==$sceneName){
    //
    //   }
    // })

    SceneManager.scenes.push({
      name:$sceneName,
      scene:$scene
    });





  }

  static run($sceneName){
    if(SceneManager.stage){
      let myScene = null;
      //去重;


      if(SceneManager.scenes.length>0){
        for(let i=0;i<SceneManager.scenes.length;i++){
          if(SceneManager.scenes[i].name == $sceneName){
            SceneManager.stage.removeChildren();

           SceneManager.stage.addChild(SceneManager.scenes[i].scene);

          }

        }
      }
    }
  }
}
export {SceneManager}
