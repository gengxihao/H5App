<template>
  <div id="scratch">
    <div class="wraper">
      <div class="inner">
          <vue-eraser
            ref="vueEraser"
            :size="25"
            :coverSrc='imgTop'
            :result-text = 'resText'
            :complete-ratio='0.6'
            :complete-function="completeFunction"
            :progress-function="progressFunction"
          ></vue-eraser>
      </div>
      <div class="inner_tip" style="user-select:none">还有{{num}}次机会</div>
    </div>
      <!-- <button class="btn" @click="reset" v-if="isAgain">reset</button> -->
      <button class="btn" @click="reset" v-if="isAgain">再来一次</button>
  </div>
</template>

<script>
import vueEraser from '../../components/Eraser'
import imgUrl from '../../assets/scratch/s_top.png';
export default {
  name: 'scrath',
  components: {   
        vueEraser
    },
  data () {
    return {
        isAgain:false, //是否还有一次机会
        imgTop:imgUrl,//遮盖的图片
        resText:'谢谢惠顾', //中奖信息
        flag:true,//限制多次请求
        num:10, //刮奖次数
        order:'', //订单号，从小程序传过来的
    }
  },
  methods: {
    /**
     * 刮奖完成
     */
    completeFunction (ratio){
      console.log("complete");
      this.num --
      if(this.num>0){
        this.isAgain = true
      }
    },
    /**
     * 刮奖过程
     */
    progressFunction (ratio){
      console.log('过程',this.num);
      if(this.num == 0){
          alert("您的次数已用完！")
          return false
        }
      if(ratio>0.009){
        let flag = this.flag
        if(flag){
           this.flag = false
           
           console.log('过程');
          this.axios.post('/mer/marketing/activy/raffle',{order_no:this.order})
          .then(res=>{
            console.log("中奖",res)
            if(res.data.code === this.$webConfig.httpSuccessStatus){
              // this.num = res.data.data.count
              let id = res.data.data.id  //id为0，没中奖，大于0，中奖
              id == 0? this.resText ="谢谢惠顾" : this.resText = res.data.data.name
            }else {
              Toast(res.data.message);
            }
          })
          .catch(rej=>{
            console.log("失败",rej)
             Toast("网络异常");
          })

        }
      }
    },
    /**
     * 重置
     */
    reset (){
      this.$refs.vueEraser.reset();
      this.isAgain = false
      this.flag = true
    },
    /**
     * 清除
     */
    clear(){
      this.$refs.vueEraser.clear();
    }
  },
  created(){
    this.order = this.$route.query.order
    //获取次数
    this.axios.post('/mer/marketing/activy/selectListMarketingActivyInfo',{order_no:this.order})
    .then(res=>{
      console.log("获取次数",res)
      if(res.data.code === this.$webConfig.httpSuccessStatus){
        this.num = res.data.data.count
      }else {
        Toast(res.data.message);
        }
    })
    .catch(rej=>{
      console.log("获取失败",rej)
       Toast("网络异常");
    })
 
  },

  
}
</script>

<style lang="scss">
@mixin btn($width, $height, $bgc, $color){
  display: inline-block;
  width: $width;
  height: $height;
  background-color: $bgc;
  color: $color;
  font-size: .28rem;
  text-align: center;
  line-height: $height;
  border: none;
  margin-top: 4.50rem;
  touch-action: manipulation;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  border-radius: $height;
}
#scratch{
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/scratch/s_bg.png');
  background-size: cover;
  background-position: center;
  color:#DC3243
}
.wraper{
  width: 5.55rem;
  height: 5.87rem;
  background-image: url('../../assets/scratch/s_box.png');
  background-size: cover;
  background-position: center;
  margin: 0 auto; /*水平居中*/
  position: relative;
  top: 50%; /*偏移*/
  transform: translateY(-45%);
  overflow: hidden;
}
.inner{
  width: 3.97rem;
  height: 2.16rem;
  margin: 1.95rem auto 0;
  font-size: .30rem;
}
.inner_tip{
  text-align: center;
  font-size: .36rem;
  margin-top: .80rem
}
// .btn:nth-of-type(1){
//   margin-top: 10px;
//   @include btn(100px, 40px, #2d8cf0, #fff);
// }
// .btn:nth-of-type(2){
//   margin-top: 10px;
//   @include btn(100px, 40px, #19be6b, #fff);
// }
.btn:nth-of-type(1){
  @include btn(4.00rem,.75rem, #FBE34E, #DC3243)
}
</style>
