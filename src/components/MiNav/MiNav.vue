<template>
    <el-row class="row">
        <el-col :span="6">
            <router-link :to="{ name: 'Home'}">
                <span class="home"></span>
                <p>首页</p>
            </router-link>
        </el-col>
        <el-col :span="6">
            <router-link :to="{ name: 'Category'}">
                <span class="category"></span>
                <p>分类</p>
            </router-link>
        </el-col>
        <el-col :span="6">
            <router-link :to="{ name: 'Cart'}">
                <span class="cart"></span>
                <p>购物车</p>
            </router-link>
        </el-col>
        <el-col :span="6">
            <router-link :to="{ name: 'Profile'}">
                <span class="person"></span>
                <p>个人中心</p>
            </router-link>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    
</script>

<style scoped lang="stylus">
    .row
        height: 100%
        .el-col
            a
                display: flex
                justify-content: center
                align-items: center
                height: 100%
                width: 100%
                flex-direction: column
                font-size: 12px
                span
                    height: 6vw
                    width: 6vw
                    background-image: url("@/assets/images/nav_bg.png")
                    background-repeat: no-repeat
                    background-size: cover
                .home
                    background-position: 0 0
                .category
                    background-position: 0 22%
                .cart
                    background-position: 0 67%
                .person
                    background-position: 0 89%
            a.router-link-active 
                p
                    color: #ff6700
                .home
                    background-position: 0 11%
                .category
                    background-position: 0 33%
                .cart
                    background-position: 0 66%
                .person
                    background-position: 0 100.5%

</style>