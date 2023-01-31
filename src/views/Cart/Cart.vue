<template>
    <el-container>
        <el-header>
            <el-icon :size="18" @click="back()">
                <ArrowLeft />
            </el-icon> 
            <span>购物车</span>
            <el-button text @click="isEdit = !isEdit">{{isEdit? '完成' : '编辑'}}</el-button>
        </el-header>
        <el-main v-if="isLogin">
            <div v-if="list.length > 0">
                <el-row v-for="item in list" :key="item.id">
                    <el-col :span="2" class="check" @click="checkItem(item.id)">
                        <img src="../../assets/images/icon_checkbox_uncheck.png" v-if="check[isEdit? 'editCheck': 'usualCheck'].findIndex(id => id === item.id) === -1"/>
                        <img src="../../assets/images/icon_checkbox_check.png" v-else/>
                    </el-col>
                    <el-col :span="6" class="image">
                        <el-image :src="item.avatar"></el-image>
                    </el-col>
                    <el-col :span="16" class="info">
                        <p class="title">{{ item.name }}</p>
                        <p class="brief">{{ item.brief }}</p>
                        <p class="count">
                            <span>￥{{ item.price }}</span>
                            <MiCount :count="item.count" @dec="dec(item)" @inc="inc(item)"></MiCount>
                        </p>
                    </el-col>
                </el-row>
            </div>
            <div v-else>
                <el-empty description="购物车还没有商品，去首页看看吧~">
                    <router-link :to="{name: 'Home'}">去首页</router-link>  
                </el-empty>
            </div>
            
        </el-main>
        <el-main v-else>
            <el-empty description="您还未登录，请登录后查看~~">
               <router-link :to="{name: 'Login'}">去登录</router-link>  
            </el-empty>
        </el-main>
        <el-footer>
            <el-row>
                <el-col :span="6" @click="checkAll = !checkAll" class="checkAll">
                    <img src="../../assets/images/icon_checkbox_check.png" v-show="checkAll"/>
                    <img src="../../assets/images/icon_checkbox_uncheck.png" v-show="!checkAll"/>
                    <span>全选</span>
                </el-col>
                <el-col :span="10" class="price" v-show="!isEdit">
                    <p>数量：<span>{{countAll}}</span></p>
                    <p>总金额：￥<span>{{ total }}</span></p>
                </el-col>
                <el-col :span="8" class="footer-btn" v-show="!isEdit">
                    <el-button type="danger" round :disabled="check.usualCheck.length === 0" 
                        @click="push({name: 'OrderNotarize', query: {ids: check.usualCheck}})">
                        下单
                    </el-button>
                </el-col>
                <el-col :span="10" v-show="isEdit"></el-col>
                <el-col :span="8" class="footer-btn" v-show="isEdit">
                    <el-button type="danger" round :disabled="check.editCheck.length === 0" @click="remove">删除</el-button>
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
    import { ArrowLeft } from '@element-plus/icons-vue';
    import { computed, onMounted, reactive, ref } from 'vue';
    import { cartApi } from '@/api'
    import MiCount from '@/components/MiCount/MiCount.vue';
    import { useRouter } from 'vue-router';
    import { ElMessage, ElMessageBox} from 'element-plus';

    const {back, push} = useRouter()
    const isLogin = sessionStorage.getItem("token") ? true : false;
    const list = reactive<Array<Vm.cartList>>([]);
    const check = reactive<{editCheck: Array<number>; usualCheck: Array<number>}>({
        editCheck: [],
        usualCheck: []
    })
    const isEdit = ref<boolean>(false);

    const checkAll = computed({
        get: () => {
            if(isEdit.value) return check.editCheck.length === list.length;
            else return check.usualCheck.length === list.length;
        },
        set:(newValue) => {
            const checkStatus = isEdit.value ? 'editCheck' : 'usualCheck';
            if(newValue){
                check[checkStatus] = [];
                list.forEach(item => check[checkStatus].push(item.id));
            }else{
                check[checkStatus] = [];
            }
        }
    })
    const countAll = computed(() => {
        return list.reduce((result, item) => {
            if(check.usualCheck.indexOf(item.id) !== -1){
                result += item.count
            }
            return result
        }, 0)
    })
    const total = computed(() => {
        return list.reduce((result, item) => {
            if(check.usualCheck.indexOf(item.id) !== -1){
                result += item.count * item.price
            }
            return result
        }, 0)
    })

    onMounted(async () => {
        if(isLogin){
            list.push(...await cartApi.getAllList())  
        }
    })
    function checkItem(id: number){
        const property = isEdit.value ? 'editCheck' : 'usualCheck'
        const i = check[property].findIndex(item => item === id)
        i !== -1 ? check[property].splice(i, 1) : check[property].push(id)
    }
    async function dec(item: Vm.cartList){
        await cartApi.decrease(item.id)
        item.count--
    }
    async function inc(item: Vm.cartList){
        await cartApi.increase(item.id)
        item.count++
    }
    async function remove(){
        try{
            await  ElMessageBox.confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
            await cartApi.remove({ids: check.editCheck})
            check.editCheck.forEach(item => {
                list.splice(list.findIndex(product => product.id === item),1)
            })
            ElMessage({
                message: '删除成功...',
                type: 'success',
            })
        }catch(e){/* */}
    }

</script>

<style scoped lang="stylus">
    .el-container
        background-color: #f5f5f5
        .el-header
            padding-left: 10px
            height: 12vw
            display: flex
            justify-content: space-between
            align-items: center
            span
                flex-grow: 1
                text-align: center
        .el-main .el-row
            background-color: #fff
            padding: 10px 0
            .image
                background-color: #f5f5f5
            .check
                display: flex
                align-items: center
                justify-content: center  
                img
                    width: 5vw
                    height: 5vw
            .info
                font-size: 12px
                display: flex
                flex-direction: column
                justify-content: center
                p
                    padding-left: 5px 
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin: 5px 0
                .title
                    font-size: 16px
                .brief
                    color: #666
                .count
                    display: flex
                    justify-content: space-between
                    padding-right: 10px
                    span
                        font-size: 16px
        .el-footer
            background-color: #fff
            height: 15vw
            .el-row
                height: 100%
                .checkAll
                    display: flex
                    align-items: center
                    justify-content: center
                    font-size: 14px
                    img
                        width: 6vw
                        height: 6vw
                        margin-right: 5px
                .price
                    display: flex
                    flex-direction: column
                    justify-content: center
                    text-align: right 
                    font-size: 14px
                .footer-btn
                    display: flex
                    justify-content: center
                    align-items: center
                    .el-button
                        width: 24vw
</style>