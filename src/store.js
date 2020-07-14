import Vue from "Vue";
import Vuex from "Vuex";

Vue.use(Vuex);



export default new Vuex.Store({
    state:{
        foodLists:[]
    },
    getters:{
        foodList:(state) => state.foodList
    },
    mutations:{
        //ここに追加ボタンを押すと処理が飛んでくる
        addFood(state,value){
            //1番の中のfoodListにデータを追加する
            state.foodList.push(value)
        },
        //remove(id){
        //    this.foodList = this.foodList.filter("foodId") !== id
        //}
    } 
})    