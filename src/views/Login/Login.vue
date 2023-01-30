<template>
    <div class="container">
        <el-row>
            <el-col :span="24">
                <h3>小米账号登录</h3>
            </el-col>
            <el-col :span="24">
                <div class="logo">
                    <img src="../../assets/images/icon-header-logo3.ddf2a1c313.png" alt="">
                    <p>让每个人都能享受科技的乐趣</p>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="login">
                    <el-form>
                        <el-form-item>
                            <el-input v-model="loginData.name" placeholder="请输入小米账号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="loginData.pwd" show-password placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col>
                    <el-radio v-model="isConsent"  :label="true" size="large">已阅读并同意小米账号 用户协议 和 隐私政策</el-radio>
            </el-col>
            <el-col :span="24">
                <el-button :disabled="!isConsent" type="primary" @click="login">登 录</el-button>
            </el-col>
            <el-col>
                <p>
                    <el-link>手机号登录</el-link> / 
                    <el-link>注册账号</el-link> /
                    <el-link>忘记密码</el-link>
                </p>
            </el-col>
        </el-row>
    </div>
   
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import {userApi} from '@/api'
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const loginData = reactive<httpPayLoad.UserData>({name: "", pwd: ""});
    const isConsent = ref<boolean>(false)

    async function login(){
        try{
            const token = await userApi.login(loginData)
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userName", loginData.name);
            router.back()
        }catch(e){/* */}
    }
</script>

<style scoped lang="stylus">
    .container
        padding-top: 20px 
        width: 100vw
        .el-row
            text-align: center
            h3
                margin-bottom: 8vh
            .logo 
                img
                    witdh: 15vw
                    height: 15vw
                p
                    color: #aaa
                    margin: 10px 0 15vw 0
                    font-size: 14px
            .login .el-form
                display: flex;
                flex-direction: column
                align-items: center
                .el-input
                    width: 90vw
                    height: 7vh
                    /deep/.el-input__wrapper
                        border-radius: 20px
                    /deep/.el-input-group__append
                        border-radius: 20px
            .el-button
                margin-top: 5vw
                margin-bottom: 5vw
                width: 80vw
                height: 12vw
                border-radius: 10vw
                font-size: 5vw
</style>