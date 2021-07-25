<template>
    <div>
        <div class="bg_box">
            <img class="bg_img" src="../../assets/dialActivity/bg@2x.png" alt="">
            <div class="wheel_wrapper">
                <p class="wheel-pointer" @click="onClickRotate">立即<br>抽奖</p>
                <div class="wheel-bg" :class="{freeze: freeze}" :style="`transform: rotate(${wheelDeg}deg)`">
                    <div class="prize-list">
                        <div class="prize-item-wrapper" v-for="(item,index) in prizeList" :key="index">
                            <div class="prize-item" :style="`transform: rotate(${(360/ prizeList.length) * index}deg)`">
                                <div class="prize-name" :class="{thank:item.sign}">{{ item.grade }}</div>
                                <!--<div class="prize-icon">
                                    <img :src="item.icon">
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hint_box">您还有{{prizeInfo.count}}次抽奖机会</div>

            <div class="prize_box" v-if="prizeStatus">
                <img src="../../assets/dialActivity/guanbi@2x.png" alt="" @click="prizeStatus = !prizeStatus">
                <div class="prize">
                    <h1>{{prizeInfo.id ? '恭喜抽中' : '谢谢参与'}}</h1>
                    <h2>{{prizeInfo.id ? prizeInfo.grade : '您还有' + `${prizeInfo.count}` + '次'}}</h2>
                    <!-- <h3>{{prizeInfo.id ? prizeInfo.name : '抽奖机会'}}</h3> -->
                </div>
                <div class="btn_box" v-if="prizeInfo.count" @click="prizeStatus = !prizeStatus">再来一次</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "dialActivity",
        data() {
            return {
                prizeStatus: false,//弹窗状态
                order_no:'', //订单号，传递过来的
                prizeInfo: {
                    grade: '$10000',
                    name: '苹果11',
                    id: 0,
                    count: 5,//抽奖次数
                },
                freeze: false,//冻结
                rolling: false,//旋转中
                wheelDeg: 0,//转动角度
                prizeNumber: 6,//转盘平均数量
                prizeListOrigin: [
                    {
                        icon: "https://picsum.photos/40?random=1",
                        grade: "10积分",
                        name: '10积分',
                        id: 0
                    },
                    {
                        icon: "https://picsum.photos/40?random=1",
                        grade: "8积分",
                        name: '8积分',
                        id: 1
                    },
                    {
                        icon: "https://picsum.photos/40?random=2",
                        grade: "6积分",
                        name: '6积分',
                        id: 2
                    },
                    {
                        icon: "https://picsum.photos/40?random=6",
                        grade: "4积分",
                        name: '4积分',
                        id: 3
                    },
                    {
                        icon: "https://picsum.photos/40?random=5",
                        grade: "2积分",
                        name: '2积分',
                        id: 4
                    },
                    {
                        icon: "https://picsum.photos/40?random=6",
                        grade: "0积分",
                        name: '谢谢参与，下次努力',
                        id: 5
                    }
                ]
            }
        },
        computed: {
            prizeList() {
                return this.prizeListOrigin.slice(0, this.prizeNumber)
            }
        },
        methods: {
            onClickRotate() {
                if (this.rolling) {
                    return;
                }
                if (this.prizeInfo.count == 0) {
                    Toast('您的抽奖机会已用完');
                    return;
                }
                this.rolling = true;
                this.prizeInfo.count --;
                let res = this.prizeListOrigin[this.prizeInfo.count];
                this.prizeInfo.id  = res.id;
                this.prizeInfo.name  = res.name;
                this.prizeInfo.grade  = res.grade;
                setTimeout(() => {
                    this.prizeList.forEach((ele,i)=>{
                        if(ele.id == this.prizeInfo.id){
                            const {wheelDeg, prizeList} = this;
                            console.log(this);
                            const random = i;
                            console.log(random);
                            this.wheelDeg =
                                wheelDeg -
                                wheelDeg % 360 +
                                6 * 360 +
                                (360 - 360 / prizeList.length * random);
                        }
                    });
                }, 200)

                setTimeout(() => {
                    this.prizeStatus = true;
                    this.rolling = false;
                }, 3500);
                // this.axios.post('/mer/marketing/activy/raffle',postData).then(res=>{
                //     console.log(res);
                //     if(res.data.code === this.$webConfig.httpSuccessStatus){
                //         this.prizeInfo = res.data.data;
                //         if(this.prizeInfo.id){
                //             console.log('已中奖')
                //             //已中奖
                //             this.prizeList.forEach((ele,i)=>{
                //                 if(ele.id == this.prizeInfo.id){
                //                     const {wheelDeg, prizeList} = this;
                //                     console.log(this);
                //                     const random = i;
                //                     console.log(random);
                //                     this.wheelDeg =
                //                         wheelDeg -
                //                         wheelDeg % 360 +
                //                         6 * 360 +
                //                         (360 - 360 / prizeList.length * random);
                //                 }
                //             });
                //         }else {
                //             console.log('未中奖');
                //             //未中奖
                //             this.prizeList.some((ele,i)=>{
                //                 if(!ele.id){
                //                     const {wheelDeg, prizeList} = this;
                //                     console.log(this);
                //                     const random = i;
                //                     console.log(random);
                //                     this.wheelDeg =
                //                         wheelDeg -
                //                         wheelDeg % 360 +
                //                         6 * 360 +
                //                         (360 - 360 / prizeList.length * random);
                //                     return false
                //                 }
                //             });
                //         }
                //         setTimeout(() => {
                //             this.prizeStatus = true;
                //             this.rolling = false;
                //         }, 3500);
                //     }else {
                //         Toast(res.data.message);
                //     }
                // });

                /*const {wheelDeg, prizeList} = this;
                console.log(this);
                const random = Math.floor(Math.random() * (prizeList.length));
                console.log(random);
                this.wheelDeg =
                    wheelDeg -
                    wheelDeg % 360 +
                    6 * 360 +
                    (360 - 360 / prizeList.length * random);
                setTimeout(() => {
                    this.rolling = false;
                    alert("Result：" + prizeList[random].grade);
                }, 2500);*/
            }
        },
        watch: {
            prizeNumber() {
                this.freeze = true
                this.wheelDeg = 0

                setTimeout(() => {
                    this.freeze = false
                }, 0)
            }
        },
     
        mounted(){
            this.order_no = this.$route.query.order;
        }
    }
</script>

<style scoped>
    .bg_box {
        min-height: 108vh;
        height: 12.8rem;
        position: relative;
        background: #DC3243;
        overflow: hidden;
        overflow-y: auto;
    }

    .bg_img {
        width: 99vw;
    }

    .wheel_wrapper {
        left: 50%;
        top: 140px;
        margin-left: -150px;
        width: 310px;
        height: 310px;
        position: absolute;
        background: url("../../assets/dialActivity/circleb@2x.png");
        background-size: 100% 100%;
    }

    .wheel-pointer {
        width: 98px;
        height: 72px;
        position: absolute;
        top: 70px;
        left: 50%;
        text-align: center;
        background: url("../../assets/dialActivity/pointer@2x.png");
        background-size: 100% 100%;
        font-size: 18px;
        font-weight: bold;
        color: rgba(250, 68, 69, 1);
        line-height: 22px;
        padding-top: 46px;
        margin-left: -48px;
        z-index: 99;
    }

    .wheel-bg {
        width: 100%;
        height: 100%;
        border-radius: 1000px;
        overflow: hidden;
        /*transition: transform 4s ease-in-out;*/
        transition: transform 3s cubic-bezier(0, 0.08, 0, 0.96);
        /*background: #7EEF97;*/
        background: url("../../assets/dialActivity/circleb@2x.png");
        background-size: 100% 100%;
    }

    .freeze {
        transition: none;
        background: red;
    }

    .prize-list {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .prize-item-wrapper {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        height: 50%;
    }

    .prize-item {
        width: 100%;
        height: 100%;
        line-height: 122px;
        transform-origin: bottom;
    }

    .prize-name {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: rgba(255, 48, 45, 1);
    }

    .prize-name.thank {
        font-size: .3rem;
        font-weight: 400;
        color: rgba(181, 117, 64, 1);
    }

    .prize-icon {

    }

    .hint_box {
        width: 276px;
        height: 36px;
        background: url("../../assets/dialActivity/chancea@2x.png");
        background-size: 100% 100%;
        position: absolute;
        top: 458px;
        left: 50%;
        text-align: center;
        transform: translateX(-50%);
        font-size: 16px;
        font-weight: 600;
        color: rgba(220, 50, 67, 1);
        line-height: 30px;
    }

    .explain_box {
        max-width: 184rem;
        text-align: left;
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        font-size: .3rem;
        font-weight: bold;
        color: rgba(251, 227, 78, 1);
        line-height: .42rem;
        white-space: nowrap;
    }
    .explain_box h1 {
        margin-bottom: .04rem;
    }
    .explain_item {
        display: flex;
        align-items: baseline;
    }
    .explain_item p {
        /*white-space: normal;*/
    }

    .prize_box {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: 0;
        z-index: 999;
        background: rgba(0,0,0,0.6);
        color: rgba(220,50,67,1);
    }
    .prize_box img {
        width: 22.5px;
        height: 22.5px;
        margin: 120px 52px 9px 300px;
    }
    .prize {
        width: 272px;
        height: 152px;
        background: url("../../assets/dialActivity/packet@2x.png");
        background-size: 100% 100%;
        margin: 0 auto;
        text-align: center;
        padding: 73px 0 52px;
    }
    .prize h1 {
        font-size: 14px;
        margin-bottom: 5px;
    }
    .prize h2, .prize h3{
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
    }
    .btn_box {
        width: 188px;
        height: 26px;
        font-size: 14px;
        text-align: center;
        font-weight: bold;
        padding: 6px 0;
        margin: 0 auto;
        line-height: 26px;
        background: url("../../assets/dialActivity/btn@2x.png");
        background-size: 100% 100%;
    }
</style>