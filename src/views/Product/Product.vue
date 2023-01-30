<template>
    <el-container>
        <el-header>
            <div class="search">
                <el-button text :icon="Back" @click="router.back()"></el-button>
                <div>
                    <el-input v-model="search"  placeholder="请输入商品名称"></el-input>
                </div>
                <el-button text :icon="Search" @click="searchName"></el-button>
            </div>
            <div class="sort">
                <el-button text :type="sort.orderCol === 'price' ? 'success' : ''" @click="beginSort('price')">
                    价格 
                    <el-icon v-if="sort.orderCol === 'price' && sort.orderDir === 'asc'" :size="16"><SortUp /></el-icon>
                    <el-icon v-else :size="16"><SortDown /></el-icon>
                </el-button>
                <el-button text :type="sort.orderCol === 'sale' ? 'success' : ''" @click="beginSort('sale')">
                    销量
                    <el-icon v-if="sort.orderCol === 'sale' && sort.orderDir === 'asc'" :size="16"><SortUp /></el-icon>
                    <el-icon v-else :size="16"><SortDown /></el-icon>
                </el-button>
                <el-button text :type="sort.orderCol === 'rate' ? 'success' : ''" @click="beginSort('rate')">
                    评价
                    <el-icon v-if="sort.orderCol === 'rate' && sort.orderDir === 'asc'" :size="16"><SortUp /></el-icon>
                    <el-icon v-else :size="16"><SortDown /></el-icon>
                </el-button>
            </div>
        </el-header>
        <el-main>
            <el-empty v-if="list.length === 0 && isMax" description="暂无相关商品" />
            <div v-else>
                <el-row v-for="item in list" @click="router.push({name: 'ProductDetail',query: {id: item.id}})">
                    <el-col :span="8"><el-image :src="item.avatar"></el-image></el-col>
                    <el-col :span="16">
                        <p class="product-name">{{ item.name }}</p>
                        <p class="product-brief">{{ item.brief }}</p>
                        <p class="product-price">
                            <span class="price">￥{{ item.price }}起</span> 
                            <span class="rate">{{ item.rate }}条评论</span>   
                        </p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <span class="product-bottom" ref="productBottomRef">{{ tip }}</span>
                    </el-col>
                </el-row>
            </div>
            
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
    import { reactive, ref, watch } from 'vue';
    import { productApi } from '@/api';
    import { Search, Back, SortUp, SortDown } from '@element-plus/icons-vue';
    import { useIntersectionObserver } from '@vueuse/core';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
    const list = reactive<Array<Vm.Product>>([]);
    const search = ref<string>("")
    const tip = ref("下拉加载更多");
    const productBottomRef = ref(null);
    const sort = reactive<{orderCol: string; orderDir: 'asc' | 'desc'}>({
        orderCol: "price",
        orderDir: "desc"
    })
    const isMax = ref<boolean>(false);

    watch(sort,async (newValue) => {
        list.splice(0, list.length);
        isMax.value = false;
        const data = await getList();
        list.push(...data);
    })

    async function getList(): Promise<Array<Vm.Product>>{
        return await productApi.getList({
                name: search.value,
                cid: parseInt(route.query.id as string),
                ...sort,
                begin: list.length, 
                pageSize: 6
            });
    }

    useIntersectionObserver(productBottomRef, async ([{isIntersecting}]) => {
        if(isIntersecting && !isMax.value){
            const data = await getList();
            tip.value = '加载中...';
            await new Promise(resolve => setTimeout(() => resolve(resolve), 500));
            list.push(...data);
            if(data.length === 6){
                tip.value = '上拉加载更多';
            }else{
                tip.value = '已经到底啦~';
                isMax.value = true;
            }
        }
    },{threshold: 1})

    function beginSort(sortName: string){
        if(sortName !== sort.orderCol){
            sort.orderCol = sortName;
        } else {
            sort.orderDir = sort.orderDir === 'asc' ? 'desc' : 'asc';
        }
    };

    async function searchName(){
        list.splice(0);
        isMax.value = false;
        const data = await getList();
        list.push(...data);
    }
    
    
    
</script>

<style scoped lang="stylus">
    .el-container
        .el-header 
            height: 20vw
            .search
                padding: 0 10px
                height: 13vw
                display: flex
                align-items: center
                .logo
                    width: 8vw
                    height: 8vw
                div
                    flex-grow: 1
                    text-align: center
                    .el-input
                        width: 70vw
                        /deep/.el-input__wrapper
                            border-radius: 20px
                .el-button
                    font-size: 20px
                    width: 5vw
            .sort
                display: flex
                align-items: center
                justify-content: space-around
                border-bottom: 1px solid #eee
        .el-main
            .el-row
                padding: 5px
                .el-col
                    display: flex
                    flex-direction: column
                    justify-content: center
                    .product-name
                        font-size: 16px
                    .product-brief
                        font-size: 12px
                        margin: 5px 0
                    .product-price
                        span
                            margin: 0 10px
                        .price
                            color: red
                            font-size: 16px
                        .rate
                            color: #999
                            font-size: 12px
                .product-bottom
                    text-align: center
                    padding: 25px 0
                    font-size: 14px
                    color: #aaa
                    margin-bottom: 5px     
                        


</style>