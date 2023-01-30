<template>
    <el-container>
        <el-header>
            <!-- <el-input v-model="search" placeholder="请输入商品名称">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input> -->
            <span>商品分类</span>
        </el-header>
        <el-container class="container">
            <el-aside class="scroll-none">
                <el-row v-for="item in menuList" :key="item.id" 
                    @click="activeId = item.id" 
                    :class="{active: activeId === item.id}">
                    <el-col :span="24">
                        <span>{{ item.name }}</span>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main class="scroll-none">
                <el-row class="submenu-baner">
                    <el-col :span="24" >
                        <el-image :src="menuList.find(item => item.id === activeId)?.avatar"></el-image>
                    </el-col>
                </el-row>
                <el-row class="sub-menu" v-if="subMenuList.length > 0">
                    <el-col :span="8" v-for="item in subMenuList" :key="item.id" :gutter="20">
                        <div class="sub-menu-item">
                            <router-link :to="{name: 'Product', query: {id: item.id}}">
                                <el-image style="width: 15vw; height: 15vw;" :src="item.avatar" />
                                <span>{{ item.name }}</span>
                            </router-link>
                        </div>
                    </el-col>
                </el-row>
                <el-row v-else>
                    <el-col>
                        <el-empty description="暂无相关分类，敬请期待..." />
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <el-footer>
            <MiNav></MiNav>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
    import MiNav from '@/components/MiNav/MiNav.vue';
    import { reactive, ref, watch } from 'vue';
    import { categoryApi } from '@/api'

    const menuList = reactive<Array<Vm.CategoryList>>([])
    const subMenuList = ref<Array<Vm.CategoryList>>([])
    const activeId = ref<number>(0)

    watch( activeId, async (newValue) => {
        const list = await categoryApi.getCategory(newValue)
        if(newValue === 0){
            menuList.push(...list)
            activeId.value = list[0].id
        }else{
            subMenuList.value = list
        }
    },{immediate: true})
</script>

<style scoped lang="stylus">
    .el-container
        flex-direction: wrap
        overflow: hidden
        .el-header
            padding: 0
            display: flex
            align-items: center
            justify-content: center
            height: 13vw
            border-bottom: 2px solid #f5f5f5
            .el-input
                width: 70vw
                /deep/.el-input__wrapper
                    border-radius: 20px 0 0 20px
                /deep/.el-input-group__append
                    border-radius: 0 20px 20px 0
        .el-aside
            width: 30vw
            padding-top: 3vw
            .el-row
                margin-bottom: 5vh
                .el-col
                    text-align: center
                    font-size: 14px
            .active
                border-left: 4px solid #eebe77
        .el-main
            background-color: #f5f5f5
            padding: 0 5px
            .submenu-baner
                /deep/.el-image
                    border-radius: 10px
            .sub-menu
                background-color: #fff
                border-radius: 5px
                .el-col
                    margin: 5px 0
                    padding: 5px
                .sub-menu-item a
                    display: flex
                    flex-direction: column
                    align-items: center
                    font-size: 12px
                    span
                        margin: 10px 0
</style>