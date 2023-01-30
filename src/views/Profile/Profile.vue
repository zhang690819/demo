<template>
    <el-container>
        
        <el-header>
                <div class="user-info">
                <p class="user-avatar"><img src="@/assets/images/avatar.76a75b8f17.png" alt=""></p>
                <p v-if="userName === '' " class="user-name" @click="goLogin">登录 / 注册</p>
                <p v-else class="user-name">{{ userName }}</p>
            </div>
        </el-header>
        <el-main class="scroll-none">
            <div class="profile-menu">
                <el-row>
                    <el-col :span="24" class="older">
                        <p>我的订单</p>
                        <router-link :to="{name: 'Order'}">
                            全部订单 
                            <el-icon :size="14">
                                <ArrowRight />
                            </el-icon>
                        </router-link>
                    </el-col>
                    <el-col class="older-icon">
                        <div>
                            <el-icon :size="26" color="#666" >
                                <Wallet />
                            </el-icon>
                            <p>待付款</p>
                        </div>
                        <div>
                            <el-icon :size="26" color="#666">
                                <Box />
                            </el-icon>
                            <p>待收货</p>
                        </div>
                        <div>
                            <el-icon :size="26" color="#666">
                                <Refresh />
                            </el-icon>
                            <p>退换修</p>
                        </div>
                    </el-col>
                    <el-col class="menu-item">
                        <router-link to="">
                            <img src="@/assets/images/profile/ucenter_icon_myassets.png" alt="">
                            <p>我的资产</p>
                            <el-icon :size="18">
                                <ArrowRight />
                            </el-icon>
                        </router-link>
                    </el-col>
                    <el-col :span="24" class="menu-item">
                        <router-link to="">
                            <img src="@/assets/images/profile/ucenter_icon_coupon_new.png" alt="">
                            <p>优惠券</p>
                            <el-icon :size="18">
                                <ArrowRight />
                            </el-icon>
                        </router-link>
                    </el-col>
                    <el-col :span="24" class="menu-item">
                        <router-link to="">
                            <img src="@/assets/images/profile/ucenter_icon_collection.png" alt="">
                            <p>我的收藏</p>
                            <el-icon :size="18">
                                <ArrowRight />
                            </el-icon>
                        </router-link>
                    </el-col>
                    <el-col :span="24" class="menu-item">
                        <router-link :to="{name: 'Address'}">
                            <img src="@/assets/images/profile/ucenter_icon_address.png" alt="">
                            <p>地址管理</p>
                            <el-icon :size="18">
                                <ArrowRight />
                            </el-icon>
                        </router-link>
                    </el-col>
                    <el-col :span="24" class="menu-item">
                        <router-link to="">
                            <img src="@/assets/images/profile/img.png" alt="">
                            <p>资质执照</p>
                            <el-icon :size="18">
                                <ArrowRight />
                            </el-icon>
                        </router-link>
                    </el-col>
                    <el-col :span="24" class="menu-item">
                        <router-link to="">
                            <img src="@/assets/images/profile/ucenter_icon_feedback.png" alt="">
                            <p>协议规则</p>
                            <el-icon :size="18">
                                <ArrowRight />
                            </el-icon>
                        </router-link>
                    </el-col>
                    <el-col :span="24" class="menu-item">
                        <router-link to="">
                            <img src="@/assets/images/profile/img2.png" alt="">
                            <p>帮助与反馈</p>
                            <el-icon :size="18">
                                <ArrowRight />
                            </el-icon>
                        </router-link>
                    </el-col>
                    <el-col :span="24" class="quit" v-if="userName !== ''">
                        <el-button type="danger" @click="quit">退出登录</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-main>
        <el-footer>
            <MiNav></MiNav>
        </el-footer>
    </el-container>
</template>

<script setup lang="ts">
    import MiNav from '@/components/MiNav/MiNav.vue';
    import { ArrowRight, Wallet, Box, Refresh } from '@element-plus/icons-vue';
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const userName = ref<string>('');
    const {push} = useRouter();

    onMounted(() => {
        userName.value = sessionStorage.getItem("userName") || ''
    })

    function goLogin(){
        if(userName.value === ''){
            push({name: "Login"});
        }
    }
    function quit(){
        userName.value = '';
        sessionStorage.clear()
    }
</script>

<style scoped lang="stylus">
    .el-container
        background-color: #f5f5f5
        .el-header
            height: 22vw
            .user-info
                width: 100vw
                height: 100%
                padding: 0 10px
                box-sizing: border-box
                background-color: #f37d0f
                background-image: url("@/assets/images/bg.63c8e19851.png")
                background-size: cover
                display: flex
                justify-content: center
                align-items: center
                .user-avatar img
                    width: 18vw
                    height: 18vw
                    border-radius: 50%
                .user-name
                    flex-grow: 1
                    padding: 10px
                    font-size: 14px
                    color: #fff
        .profile-menu
            font-size: 14px
            .el-col
                background-color: #fff
            .older
                padding: 10px
                display: flex
                justify-content: space-between
                align-items: center
                border-bottom: 1px solid #eee
                a
                    font-size: 12px
                    display: flex
                    color: #666
                    .el-icon
                        vertical-align: middle
            .older-icon
                padding: 10px
                display: flex
                justify-content: space-around
                margin-bottom: 10px
                div
                    text-align: center
            .menu-item
                border-bottom: 1px solid #f5f5f5
                a
                    display: flex
                    align-items: center
                    padding: 8px 15px 7px 0
                    img
                        width: 12vw
                        height: 12vw
                    p
                        flex-grow: 1
            .quit
                background-color: #f5f5f5
                padding: 20px 0
                text-align: center
                .el-button
                    width: 40vw
                    height: 12vw
                
</style>