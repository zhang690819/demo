<template>
    <el-container>
        <el-header>
            <img class="logo" src="../../assets/images/icon-header-logo3.ddf2a1c313.png"/>
            <div>
                <el-input :prefix-icon="Search" placeholder="请输入商品名称"></el-input>
            </div>
                <el-button text :icon="Avatar" @click="push({name: 'Profile'})"></el-button>
        </el-header>
        <el-main>
            <div class="banner">
                <img  src="../../assets/images/4a696456243957ed5739d787d9f7eaff.png" />
                <ul>
                    <li>
                        <router-link to="">
                            <img src="../../assets/images/e8bc849a-0a3b-21a0-6810-7da3a3903dee.png" alt="">
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <img src="../../assets/images/0434594382110f3bd15c90f040d5d542.png" alt="">
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <img src="../../assets/images/eb5024fe-dfe3-6e53-3e18-675bef5fa06e.png" alt="">
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <img src="../../assets/images/96c780016ea196743905dc93f9249c39.png" alt="">
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <img src="../../assets/images/b1749080cf5bbc4dfebff83013bbebaf.png" alt="">
                        </router-link>
                    </li>
                </ul>
            </div>
            <el-row class="product">
                <el-col :span="12" v-for="item in list">
                    <div class="product-item" :gutter="20">
                        <el-image :src="item.avatar"></el-image>
                        <p class="product-name">{{ item.name }}</p>
                    </div>
                </el-col>
                <el-col class="product-bottom" ref="productBottomRef">
                    <span>{{tip}}</span>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <MiNav></MiNav>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
    import MiNav from '@/components/MiNav/MiNav.vue';
    import { Search, Avatar } from '@element-plus/icons-vue';
    import { homeApi } from '@/api';
    import { onMounted, reactive, ref } from 'vue';
    import { useIntersectionObserver } from '@vueuse/core';
    import { useRouter } from 'vue-router';

    const {push} = useRouter()
    const list = reactive<Array<Vm.Product>>([])
    const productBottomRef = ref(null)
    const tip = ref<String>('上拉加载更多')
    let isMax = false

    useIntersectionObserver(productBottomRef, async ([{isIntersecting}]) => {
        if(isIntersecting && !isMax){
            const data = await homeApi.getList({name: "", cid: 17, orderCol: "rate", orderDir: "asc", begin: list.length, pageSize: 6});
            if(data.length > 0){
                tip.value = '加载中...'
                await new Promise(resolve => setTimeout(() => resolve(resolve), 500));
                list.push(...data)
                tip.value = '上拉加载更多'
            }else{
                tip.value = '已经到底啦~'
                isMax = true
            }
        }
    },{threshold: 1})
</script>
<style scoped lang="stylus">
    .el-header
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
        .el-button
            font-size: 20px
            width: 5vw
    .el-main
        .banner
            img
                width: 100vw
                height: 50vw
                padding: 0
            ul
                display: flex
                justify-content: center
                flex-direction: warp
                img
                    width: 18vw
                    height: 18vw
        .product 
            .product-item
                display: flex
                flex-direction: column
                justify-content: center
                align-items: center
                font-size: 14px
                .el-image
                    width: 35vw
                    height: 35vw
                .product-name
                    width: 35vw
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
            .product-bottom
                text-align: center
                padding: 25px 0
                font-size: 14px
                color: #aaa
                margin-bottom: 5px
                
</style>