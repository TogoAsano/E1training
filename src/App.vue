 <template>
  <div id="positionCenter">
    <!-- radioボタンによってリストに表示するものを限定する -->
    <h1>お昼ごはんリスト</h1>
    <label v-for="(option,index) in options" :key="index">
      <input type="radio" :value="option.value" v-model="displayNumber">
      {{option.list}}
    </label>
    ({{computedFoodList.length}}件を表示)
    <!-- 上記にテーブルに表示されている件数を表示させる -->
    <table border="1">
      <!--食事リストを表示するテーブル -->
      <thead>
        <tr>
          <th>ID</th>
          <th>お名前</th>
          <th>食事名</th>
          <th>状態</th>
          <th>ー</th>
        </tr>
      </thead>
      <tbody>
        <transition-group name="fade" tag="table">
        <tr v-for="food in computedFoodList" :key="food.id" class="table-Border-Line">
          <th>{{food.id}}</th>
          <td>{{food.humanName}}</td>
          <td>{{food.foodName}}</td>
          <td> 
            <button @click="changeStatus(food.id)" class="changeButton">{{ convertStatus(food.status) }}</button>
          </td>
          <td>
            <button @click.ctrl="remove(food.id)" class="changeButton">削除</button>
          </td>
        </tr>
        </transition-group>
      </tbody>
    </table>
    <!-- キー修飾子を使用することでコントロールキーを押しながらでないと削除できない -->
    <p>※削除ボタンはコントロールキーを押しながらクリックしてください</p>
    <h2>新しい食事リストを追加</h2>
    <!-- 食事の追加 -->
    <div id="add">
      お名前:
      <input type="text" class="textBox" v-model="humanName">
      <br>
      食事名:
      <input type="text" class="textBox" v-model="foodName">
      <button @click="foodAdd" type="submit" class="changeButton">追加</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      options: [
        { value: -1, list: "すべて" },
        { value: 0, list: "食事中" },
        { value: 1, list: "完食" }
      ],
      displayNumber: -1,
      humanName:"",
      foodName: "",
      incrementalId: 0,
    };
  },
  computed: {
    ...mapGetters({
      foodList: 'foodList',
    }),
    convertStatus() {
      return (status) => {                        //この部分が理解できていない。
          return this.options.find((option) => {
            return option.value===status;
          }).list
      }
    }, 
    computedFoodList(){
      const all = -1;
      const eating = 0;
      const done = 1;
      let filterFoodList = [];
      switch(this.displayNumber){
        case all:
          filterFoodList = this.foodList;
          break;
        case eating:
          filterFoodList = this.getTargetList(eating);
          break;
        case done:
          filterFoodList = this.getTargetList(done);
          break;
          default:
            return[]  
      }
      return filterFoodList;
    },
  },
  methods: {
    getTargetList(status){
      const list = [];
      for(let i = 0; i < this.foodList.length; i++){
        const target = this.foodList[i];
        if(target.status === status){
          list.push(target)
        }
      }
      return list;
    },
    //foodListの追加処理
    foodAdd() {
      //追加する名前と食事名のfoodを参照
      //入力がない場合は何もしない
      if (!(this.foodName && this.humanName)) {
        alert("お名前もしくは食事名の記入がありません");
        return;
      }
      const newFood = {
        humanName: this.humanName,
        foodName: this.foodName,
        id: this.incrementalId++,
        status: 0
      };
      // storeにデータを格納する
      this.$store.commit("addFood", newFood);
      this.humanName = "";
      this.foodName = "";
      var yasaitottaka = confirm('野菜とりましたか？')
      if(!yasaitottaka){
        for(let i = 0; i < 3 ; i++){
          alert("野菜たべなぁ～")
        }
      }  
    },
    changeStatus(id){
      const statusId = {
          id: id
        };
        console.log(id,'changedStatus')
            this.$store.commit("changeStatus",statusId)
    },
    remove(id) {
      var result = window.confirm('本当に削除しますか？')
      if(result){
        const deleateId = {
          id: id // ES6ではid:idでなくidのみでok
        };
        console.log(id,'removeComannd')
            this.$store.commit("remove",deleateId)
        // this.incrementalId -=1;            
      }        
    }
  }
};
</script>

<style scoped>
.fade-move{
  transition: transform 0.5s ;
}
.fade-enter{
/*追加されるときの最初の状態*/
opacity: 0;
}
.fade-enter-active{
/*追加されるときのトランジションの状態*/
transition: opacity 1.5s;
}
.fade-enter-to{
/* 追加されるときの最後の状態 */
opacity: 1;
}
.fade-leave{
/* 削除されるときの最初の状態 */
opacity: 1;
}
.fade-leave-to-active{
/* 削除されるときのトランジションの状態 */
transition: opacity 1s;
}
.fade-leave-to{
/* 削除されるときの最後の状態 */
opacity: 0;
}


#positionCenter { 
  margin: auto;
}
table {
  /* border: 5px solid; */
  width:700px;
  table-layout: fixed;
}
.table-Border-Line{
  border:5px black;
}
th {
  color: #0099e4;
  padding-top: 5px;
  padding-bottom: 5px;
}
td {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.textBox {
  border: 1px solid #a9a9a9;
}
.changeButton {
  color: whitesmoke;
  background-color: #0099e4;
  border-radius: 15px;
  border: 1px solid #0099e4;
  margin-left: 5px;
}
</style>
