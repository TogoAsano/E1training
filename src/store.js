import Vue from "Vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    data(){
        return{
            STORAGE_KEY:"",
            foodListStorage:[],
        }
    },
    var :STORAGE_KEY = 'foodLists-storage',
    var :foodListStorage = {
        fetch: function() {
        var foodLists = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
        )
        foodLists.forEach(function(foodList, index) {
        foodList.id = index
        })
        foodListStorage.uid = foodLists.length
        return foodLists
        },
        save: function(foodLists) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(foodLists))
        }
    }
})    