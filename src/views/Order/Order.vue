<template>
    <el-container>
        <el-header>
            <div class="title">
                <el-button text :icon="Back" @click="router.back()"></el-button>
                <p>订单管理</p>
            </div>
           <div class="nav">
                <el-row>
                    <el-col :span="8" :class="{active: activeMenu === 0}" @click="activeMenu = 0">
                        <span>全部订单</span>
                    </el-col>
                    <el-col :span="8" :class="{active: activeMenu === 1}" @click="activeMenu = 1">
                        <span>待付款</span>
                    </el-col>
                    <el-col :span="8" :class="{active: activeMenu === 2}" @click="activeMenu = 2">
                        <span>待收货</span>
                    </el-col>
                </el-row>
           </div>
        </el-header>

        <el-main>
            <el-empty v-if="list.length === 0" description="暂无相关订单" />
            <el-card v-else v-for="item in list">
                <div class="order-title">
                    <span>有品精选</span>
                    <span>{{ item.pay === 0? '待支付' : '待收货' }}</span>
                </div>
                <el-row v-for="product in item.details" class="order-content">
                    <el-col :span="8">
                        <el-image :src="product.avatar"></el-image>
                    </el-col>
                    <el-col :span="10" class="product-name">
                        <span>{{ product.name }}</span>
                    </el-col>
                    <el-col :span="6" class="product-price">
                        <p> ￥{{ product.price }}</p>
                        <p>x {{ product.count }}</p>
                    </el-col>
                </el-row>
                <p class="order-footer">
                    <span>共 {{ item.details.reduce((result, item) => result + item.count,0) }} 件商品,</span>
                    <span>共 ￥{{ item.account }} </span>
                </p>
                <el-row class="order-btn">
                    <el-button text type="danger" @click="removeOrder(item.orderId)">删除</el-button>
                    <el-button v-if="item.pay === 0" type="danger" 
                        round size="small" @click="orderPay(item)">去支付</el-button>
                    <el-button v-else type="danger" round size="small">查看详情</el-button>
                </el-row>
            </el-card>
        </el-main>
    </el-container>    
</template>

<script setup lang="ts">
    import { Edit, Back, DeleteFilled, Plus } from '@element-plus/icons-vue';
    import { reactive, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { orderApi } from '@/api';
    import { ElMessage, ElMessageBox} from 'element-plus';

    const router = useRouter();
    const activeMenu = ref<0 | 1 | 2>(0);
    const list = reactive<Array<Vm.order>>([])

    watch(activeMenu,async (newValue) => {
        list.splice(0)
        if(newValue === 0){
            list.push(...await orderApi.getAllOrder())
        }else if(newValue === 1){
            list.push(...await orderApi.getUnpayOrder())
        }else if(newValue === 2){
            list.push(...await orderApi.getPayOrder())
        }
    },{immediate: true})

    async function orderPay(order: Vm.order){
        await  ElMessageBox.confirm(`确定要支付￥${order.account}元吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        });
        await orderApi.pay(order.orderId)
        order.pay = 1
        ElMessage({message: '支付成功...', type: 'success',});
    }

    async function removeOrder(id: string){
        await  ElMessageBox.confirm(`确定要删除吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        });
        await orderApi.remove(id);
        list.splice(list.findIndex(item => item.orderId ===  id), 1)
        ElMessage({message: '删除成功...', type: 'success',});
    }
</script>

<style scoped lang="stylus">
    .el-header
        border-bottom: 1px solid #eee
        height: 20vw
        .title
            height: 10vw
            display: flex
            justify-content: space-between
            align-items: center
            p
                flex-grow: 1
                text-align: center
                padding-right: 10vw
        .nav 
            margin-top: 10px
            .el-row .el-col
                text-align: center
                font-size: 14px
            .active span
                background-color: red
                color: #fff
                padding: 2px 8px
                border-radius: 10px
    .el-main
        .el-card
            margin: 10px 1px
            .order-title
                display: flex
                justify-content: space-between
                font-size: 14px
            .order-content 
                .product-name
                    font-size: 14px
                    display: flex
                    align-items: flex-start
                    padding-top: 20px
                .product-price
                    text-align: right
                    font-size: 14px
                    display: flex
                    flex-direction: column
                    justify-content: center
            .order-footer
                text-align: right
                font-size: 14px
                color: #666
            .order-btn
                display: flex
                justify-content: space-between
                margin-top: 10px
</style>