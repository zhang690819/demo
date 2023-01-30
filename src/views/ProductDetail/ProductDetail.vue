<template>
    <el-container>
        <el-button class="back" circle :icon="Back" @click="router.back()"></el-button>
        <el-main>
            <el-image :src="product?.avatar"></el-image>
            <el-row>
                <el-col :span="24" class="product-price">
                    <span><i>￥</i>{{ product?.price }}</span>
                </el-col>
                <el-col :span="24" class="product-sale" >
                    <div>
                        <el-tag type="success">30元优惠券</el-tag>
                        <el-tag type="success">预计得240米金</el-tag>
                    </div>
                </el-col>
                <el-col :span="24" class="product-name">
                    <p>{{ product?.name }}</p>
                    <p class="brief">{{ product?.brief }}</p>
                </el-col>
                <el-col class="product-count">
                    <p><i>已选：</i><span>{{ product?.name }} x {{count}}</span></p>
                    <p><i>购买数量：</i><MiCount :count="count" @dec="count--" @inc="count++"></MiCount>   </p>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <el-button text :icon="House" @click="router.push({name: 'Home'})"></el-button>
            <el-button text :icon="Service"></el-button>
            <el-button text :icon="ShoppingTrolley" @click="router.push({name: 'Cart'})"></el-button>
            <div>
                 <el-button class="left" type="warning" @click="addCart">加入购物车</el-button>
                 <el-button class="right" type="danger">确认订单</el-button>
            </div>
           
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
    import {onMounted, reactive, ref} from 'vue';
    import { productDetailApi } from '@/api';
    import { useRoute, useRouter } from 'vue-router';
    import { House, Back, Service, ShoppingTrolley } from '@element-plus/icons-vue';
    import MiCount from '@/components/MiCount/MiCount.vue';
    import { ElMessage, ElMessageBox} from 'element-plus';

    const route = useRoute()
    const router = useRouter()
    const product = ref<Vm.Product | null>(null)
    const count = ref<number>(1)

    onMounted(async () => {
        const data = await productDetailApi.getIdList(parseInt(route.query.id as string))
        product.value = data
    })

    async function addCart(){
        try{
            await  ElMessageBox.confirm(
                `确定要要将[ ${product.value?.name} ] x ${count.value} 添加到购物车吗？`, 
                '提示', 
                {confirmButtonText: '确定', cancelButtonText: '取消'}
            );
            await productDetailApi.addCart({pid: product.value?.id as number, count: count.value})
            ElMessage({message: '添加购物车成功...', type: 'success'})
        }catch(e){/* */}
    }
</script>

<style scoped lang="stylus">
    .back
        position: absolute
        top: 3vw
        left: 3vw
        z-index 1
    .el-image
        height: 45vh
        width: 100vw
        border-bottom: 1px solid #eee
    .product-price
        padding: 10px 5px
        font-size: 20px
        color: red
        i
            font-size: 14px
            vertical-align: top
    .product-sale
        padding: 0 5vw
        div
            background-color: #fef0f0
            padding: 10px
            .el-tag
                margin-right: 10px
    .product-name
        p
            font-size: 18px
            margin: 10px
        .brief
            font-size: 14px
            color: #999
            padding: 0 10px
    .product-count
        display: flex
        flex-direction: column
        p 
            margin-left: 5vw
            font-size: 14px
            padding: 10px
            border-bottom: 1px solid #eee
            border-bottom: 1px solid #eee
            display: flex
            span
                color: #666
    .el-footer
        display: flex
        align-items: center
        .el-button
            font-size: 20px
        div
            display: flex
            .el-button
                margin: 0
                font-size: 14px
            .left
                border-radius: 20px 0 0 20px
            .right
                border-radius:  0 20px 20px 0 
</style>