 <template>
  <div id="positionCenter">
    <!-- radioボタンによってリストに表示するものを限定する -->
    <h1>お昼ごはんリスト</h1>
    <label v-for="(option,index) in options" :key="index">
      <input type="radio" :value="option.value" v-model="displayNumber">
      {{option.list}}
    </label>
    <!-- ({{computedFoodList.length}}件を表示)  -->
    <!-- 上記にテーブルに表示されている件数を表示させる -->
    <table border="1">
      <!--食事リストを表示するテーブル -->
      <thead>
        <tr>
          <th id="numberHeader">ID</th>
          <th class="foodName">食事名</th>
          <th>状態</th>
          <th>ー</th>
        </tr>
      </thead>
      <tbody>
        <transition-group name="fade" tag="table">
        <tr v-for="food in foodList" :key="food.id">
          <th>{{food.id}}</th>
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
    <div>
      食事名:
      <input type="text" id="textBox" v-model="foodName">
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
    /* computedFoodList:()=>{
      //データdisplayNumberが-1ならすべてそれ以外なら
      //displayNumberとstatusが一致するものだけを絞り込む
      /*最終的な表示について
      すべて、食事中、完食の３つにのラジオボタンを押したときに、
      foodListのテーブルからそれに該当する状態のものだけを表示するようにする
      食事中を選択した場合、食事中状態のものだけを表示。そのときdisplayNumberは0となっている*/
      /*
      if(this.displayNumber == 0){
        this.$store.state.foodlist = this.$store.state.foodlist.filter(   //ここではfoodListにアクセスできない？
          (status) => {                                                   //順番に動作していくのに一番上にあったら、そもそも空のfoodListにアクセスしている
            return status === 0;                                          //statusが0や1のもののidをstoreに送ってfilterで削減するが方法だろうか？
        })                                                                //その場合はcomputedよりmethodsで？
      }else if(this.displayNumber == 1){                                  //ただ、radioボタンの場合method化できるのか？引数としてdisplayNumberを送るメソッドの作成？
        this.$store.state.foodlist = this.$store.state.foodlist.filter(
          (status) => {
            return status === 1; 
        })
      }*/
     },
  methods: {
    //foodListの追加処理
    foodAdd() {
      //追加する食事名のfoodを参照
      //入力がない場合は何もしない
      if (!this.foodName) {
        alert("食事名を入力してください");
        return;
      }
      const newFood = {
        foodName: this.foodName,
        id: this.incrementalId++,
        status: 0
      };
      // storeにデータを格納する
      this.$store.commit("addFood", newFood);
      this.foodName = "";
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
      }        
    }
  }
};
</script>

<style scoped>
.fade-move{
  transition: transform 10s ;
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
transition: opacity 5s;
}
.fade-leave-to{
/* 削除されるときの最後の状態 */
opacity: 0;
}


#positionCenter { 
  margin: 200px 500px;
}
table {
  /* border: 5px solid; */
  width:700px;
  table-layout: fixed;
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
#textBox {
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
