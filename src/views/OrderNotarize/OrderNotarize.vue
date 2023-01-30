<template>
    <el-container>
        <el-header>订单确认</el-header>
        <el-main>
            <el-row v-for="item in productList">
                <el-col :span="8">
                    <el-image :src="item.avatar"></el-image>
                </el-col>
                <el-col :span="16" class="price">
                    <p>{{ item.name }}</p>
                    <p class="total">￥{{ item.price }} * {{ item.count }}</p>
                </el-col>
            </el-row>
            
            <div class="address">
                <p class="address-title">确认地址</p>
                <el-row v-if="defaultAddress !== null">
                    <el-col class="name" :span="12">收货人：{{ defaultAddress?.receiveName }}</el-col>
                    <el-col class="phone" :span="12">电话：{{ defaultAddress?.receivePhone }}</el-col>
                    <el-col :span="24" class="address-region">收货地址：{{ defaultAddress?.receiveRegion }} {{ defaultAddress?.receiveDetail }}</el-col>
                    <el-col :span="24" class="btn">
                        <el-button size="small" text type="primary" @click="isEdit = true">更换地址</el-button>
                    </el-col>
                </el-row>
                <el-row v-else>
                    <el-col :span="24">
                        <p>还没有默认地址，请选择地址~</p>
                        <el-button @click="isEdit = true" size="small" type="success">选择地址</el-button>
                    </el-col>
                  
                </el-row>
            </div>
        </el-main>
        <el-footer>
            <el-button type="danger" round @click="confirmOrder">确认订单</el-button>
        </el-footer>
    </el-container>
    <el-drawer
        v-model="isEdit"
        :title=" '选择收货地址'"
        direction="btt"
        size="60%"
    >
        <el-row v-for="item in addressStore.list">
            <el-col :span="24">{{ item.receiveName }} - {{ item.receivePhone }}</el-col>
            <el-col class="select-address" :span="16">
                <p>{{ item.receiveRegion }}</p>
                <p>{{ item.receiveDetail }}</p>
            </el-col>
            <el-col :span="8" class="address-btn">
                <el-button size="small">取消</el-button>
                <el-button size="small" type="primary" @click="changeAddress(item.id)">确定</el-button>
            </el-col>
        </el-row>
    </el-drawer>
</template>

<script setup lang="ts">
    import { onMounted, ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { cartApi, orderApi } from '@/api';
    import { useAddress } from '@/store';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const addressStore = useAddress()
    const route = useRoute();
    const productList = ref<Array<Vm.cartList>>([])
    const defaultAddress = ref<Vm.address | null>(null)
    const isEdit = ref<boolean>(false)

    const total = computed(() => {
        return productList.value.reduce((result, item) => {
            return result + (item.count * item.price)
        }, 0)
    })

    onMounted(async () => {
        addressStore.init()
        defaultAddress.value = addressStore.getDefault()
        let ids = route.query.ids
        if(typeof(ids) === 'string'){
            ids = ids.split(',');
        }
        const newIds: Array<number> = []
        ids?.forEach(item => {
            newIds.push(parseInt(item as string))
        })
        try{ 
            productList.value = await cartApi.getIdsList({ids: newIds})
        }catch(e){/** */}
    })

    function changeAddress (id: number){
        defaultAddress.value = addressStore.list.find(item => item.id === id) as Vm.address
        isEdit.value = false
    }

    async function confirmOrder(){
        const data: HttpPayLoad.confirmOrder = {
            ids: productList.value.reduce((result: Array<number>,item) => {
                result.push(item.id)
                return result
            }, []),
            account: total.value,
            addressId: (defaultAddress.value as Vm.address).id
        }
        try{
             await orderApi.confirmOrder(data)
             router.replace({name: 'Order'})
        }catch(e){/** */}
       
    }
</script>

<style scoped lang="stylus">
    .el-header
        display: flex
        justify-content: center
        align-items: center
        background-color: #E6A23C
        color: #fff
        font-size: 18px
    .el-main
        .el-row
            padding: 0 20px
            .price
                display: flex
                flex-direction: column
                justify-content: center
                .total
                    text-align: right
                    margin-top: 15px
                    color: red
        .address
            padding:0 20px 10px
            border: 1px solid #E6A23C
            margin: 0 5px 5px
            border-radius: 10px
            background-color:  #f89898
            .name
                font-size: 14px
            .address-title
                color: #fff
                text-align: center
                margin: 10px 0
            .phone
                text-align: right
                font-size: 14px
            .address-region
                margin: 10px 0
                font-size: 14px
            .btn
                text-align: right
            .el-row .el-col
                text-align: center
                p
                    margin: 15px 0
                    color: #606266
    .el-footer
        display: flex
        justify-content: center
        align-items: center
        .el-button
            width: 70vw
            height: 12vw
    .el-drawer
        .el-row 
            margin: 10px 0
            border-bottom: 1px solid #999
            padding: 5px 0
            .el-col
                font-size: 14px
            .el-col.select-address
                padding-left: 10px
                margin-top: 5px
            .address-btn
                text-align: right
        
</style>