import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);



export default new Vuex.Store({
    state:{
        foodList:[]
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
        // changeStatus(){

        // },
        remove(state,id){
            state.foodList = state.foodList.filter("foodId" !== id)
        }
    }
})    