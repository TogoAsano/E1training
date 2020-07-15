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
    //    changeStatus(state,statusId){
            // const id = statusId.id           
            // state.foodList = state.foodList.filter((food) => food.id!== id) これをやるとfoodListを戻せなくなる？
            // foodList.forEach((foodName,id,status)) =>{
            // status
            //})
            // if(state.foodList.options.status == 0){
            //    state.foodList.options.status = 1
            //}else{
            //    state.foodList.options.status = 0
            //}
            // state.foodList = state.foodList
        // },
        remove(state,deleateId){
            //削除するidを受け取りそのidを削除する。その後foodListに上書きする
            const id = deleateId.id
            state.foodList = state.foodList.filter((food) => food.id!== id)
        }
    }
})    