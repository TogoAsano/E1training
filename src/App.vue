<template>
  <div> <!-- radioボタンによってリストに表示するものを限定する -->
    <h1>お昼ごはんリスト</h1>
    <lavel v-for="(option,index) in options" :key="index">
      <input 
      type="radio"
      :value="option.value"
      v-model="displayNumber"
      >{{option.list}}
    </lavel> <!-- ({{number}}件を表示) -->

    <table border="1" id="targetTable"> <!--食事リストを表示するテーブル -->
      <thead>
        <tr>
          <th id="numberHeader">ID</th>
          <th class="foodName">食事名</th>
          <th>状態</th>
          <th>ー</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <!-- v-for-->
          <th>{{item.id}}</th>
          <td class="foodName">{{item.food}}</td>
          <td class="changeButton">
            <button @click="changeState(item)">
             {{item.state}}
            </button>
          </td>
          <td class="changeButton">
            <button @click.ctrl="remove(item)">
              削除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- キー修飾子を使用することでコントロールキーを押しながらでないと削除できない -->
    <p>※削除ボタンはコントロールキーを押しながらクリックしてください</p>
    <h2>新しい食事リストを追加</h2>
    <!-- 食事の追加 -->
    <div>
      食事名:
      <input type="text" id="textBox" v-model="food">
      <button @click="foodAdd" type="submit" class="changeButton">追加</button>
    </div>
  </div>
</template>

<script>


export default {
  data(){
    return{
        options : [
          {value:-1 , list:"すべて"},
          {value:0, list: "食事中"},
          {value:1, list:"完食"}
        ],
        displayNumber:-1,
        foodLists:[],
        food:'',  
      }
    },  

  methods:{
      //foodListの追加処理
      foodAdd(){
        //追加する食事名のfoodを参照
        //入力がない場合は何もしない
        if(!this.food){
          alert("食事名を追加してください")
          return
        }
        this.foodLists.push({          //{ID,食事名、状態}オブジェクトをfoodListsに追加
          id:this.$store.foodListStorage.uid++,       
          food:this.food,            
          state:0                      //デフォルトは食事中なので0
        })
          this.food.value=''                //form要素を空にする
      },
      changeState(item){      //状態の変更処理   
        item.state = item.state ? 0 : 1
      },
      remove(item){
        const index = this.foodLists.indexOf(item)  //itemの中の何番目をindexとする
        this.foodLists.splice(index,1)            //上記で指定した番号の要素を削除
      }

  },
  watch:{                             //ローカルストレージ内では保存されていない。
    foodLists:{                       //foodListsのデータの内容が変わると自動的に保存してくれる    
      handler(foodLists){
        this.$store.foodListStorage.save(foodLists)
      },
      deep: true
    }
  },
  created(){
    this.foodLists = this.$store.foodListStorage.fetch()
  }
}
</script>

<style scoped>
div{
  margin:200px 500px;
}
table {
  border: 1px solid /* transparent */;
}

th {
  color: #0099e4;
  padding-top: 5px;
  padding-bottom: 5px;
}
/* #numberHeader {
} */
td {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.foodName {
  padding-right: 600px;
}
#textBox {
  border : 1px solid #a9a9a9;
}
.changeButton {
  color: whitesmoke;
  background-color: #0099e4;
  border-radius: 15px;
  border: 1px solid #0099e4;
  margin-left: 5px;
}
</style>
