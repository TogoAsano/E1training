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
        changeStatus(state,statusId){
            // 設計としては以下の流れです
            // 1:新しいfoodList用の配列を用意する
            // 2:ステータスがマジックナンバーにならないように変数に意味を持たせる 
            //   ※マジックナンバーがわからなければ検索してみてください
            // 3:現在のフードリストをループして現在ループしている要素を分かりやすいように変数に入れておく
            // 4:変数に入れたループ要素が引数で受けたidと等しいか判定する
            //   ※注１：もしここで等しくないと判断されたら、何もせずに新しいフードリストに追加する
            // 5:4でidが等しいと判断されたら次はステータスをチェックし、ループ要素のステータスを完食にしてから
            //   新しいフードリストに追加する
            // 6:最後に新しいフードリストと現在のフードリストを入れ替える

            // 1
            const newAFoodList = [] 
            const id = statusId.id
            // 2
            const eatingStatus = 0 
            // 2
            const ateStatus = 1 

            for (let i = 0; i < state.foodList.length; i++) {
                // 3
                const loopTarget = state.foodList[i]
                // 4
                if (loopTarget.id === id) {
                    // 5
                    if (loopTarget.status=== eatingStatus) {
                        // 5
                        loopTarget.status = ateStatus
                    }else if(loopTarget.status=== ateStatus){
                        // 5
                        loopTarget.status = eatingStatus
                    }
                }
                // 5
                newAFoodList.push(loopTarget)
            }
            // 6
            state.foodList = newAFoodList
        },
        remove(state,deleateId){
            //削除するidを受け取りそのidを削除する。その後foodListに上書きする
            const id = deleateId.id
            state.foodList = state.foodList.filter((food) => food.id!== id)
            //  for(let i = id  ; i < state.foodList.length ; i++){
            //     const adjustFoodList = state.foodList[i]
            //     adjustFoodList.id -= 1
            // }
        },
        // ascendingSort(state){
        //     function compareFunc(a, b) {
        //         return a - b;
        //       }
        //       state.foodList.sort(compareFunc);
        // },
        // descendingSort(state){
        //     function compareFunc(a, b) {
        //         return b - a;
        //       }
        //       state.foodList.sort(compareFunc);
        // }
        ascendingSort(state){
            state.foodList = state.foodList.sort(function(a,b){
                if(a.status > b.status){
                    return 1;
                }else{
                    return -1;
                }
            })
        },
        descendingSort(state){
            state.foodList = state.foodList.sort(function(a,b){
                if(a.status < b.status){
                    return 1;
                }else{
                    return -1;
                }
            })
        },
    }    
})    