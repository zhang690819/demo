<template>
    <el-container>
        <el-header>
            <el-button text :icon="Back" @click="router.back()"></el-button>
            <p>地址管理</p>
        </el-header>

        <el-main>
            <el-row v-for="item in addressStore.list">
            <el-col :span="24" class="address-name">
                <p>
                    <span class="label">姓名：</span>
                    <span type="info">{{ item.receiveName }}</span>
                </p>
                <p>
                    <span class="label">电话：</span>
                    <span class="phone">{{ item.receivePhone }}</span>
                </p>
            </el-col>
            <el-col :span="24" class="address">
                <span>{{ item.receiveRegion }} &nbsp;</span>
                <span>{{ item.receiveDetail }}</span>
            </el-col>
            <el-col :span="24" class="address-btn">
                <p>
                    <el-button v-if="!item.isDefault" size="small" type="success" @click="setDefault(item.id)">设为默认</el-button>
                    <el-tag v-else type="warning">默认地址</el-tag>
                </p>
                <p>
                    <el-button size="small" type="primary" :icon="Edit" @click="beginEdit(item)">编辑</el-button>
                    <el-button size="small" type="danger" :icon="DeleteFilled" @click="remove(item.id)">删除</el-button>
                </p>
                
            </el-col>
        </el-row>
        </el-main>

        <el-footer>
            <el-button round type="danger" :icon="Plus" @click="isEdit = true">新增地址</el-button>
        </el-footer>

    </el-container>

    <!-- 新增和编辑 -->
    <el-drawer
        v-model="isEdit"
        :title="model.id === 0 ? '新增地址' : '修改地址'"
        direction="btt"
        size="60%"
        :before-close="drawerColse"
    >
        <el-form inline label-width="100px"  ref="formRef" :rules="rules"  :model="model">
            <el-form-item label="姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：" prop="receiveName">
                <el-input v-model="model.receiveName"></el-input>
            </el-form-item>
            <el-form-item label="电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：" prop="receivePhone">
                <el-input v-model="model.receivePhone"></el-input>
            </el-form-item>
            <el-form-item label="地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：" prop="receiveRegion">
                <el-input v-model="model.receiveRegion"></el-input>
            </el-form-item>
            <el-form-item label="详细地址：" prop="receiveDetail">
                <el-input v-model="model.receiveDetail"></el-input>
            </el-form-item>
        </el-form>
        <div class="drawer__footer">
        <el-button @click="drawerColse">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </el-drawer>
</template>

<script setup lang="ts">
    import { Edit, Back, DeleteFilled, Plus } from '@element-plus/icons-vue';
    import { nextTick, onMounted, reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { ElMessage, ElMessageBox} from 'element-plus';
    import { useAddress } from '@/store';
    import type { FormInstance, FormRules } from 'element-plus'

    const addressStore = useAddress()
    const router = useRouter()
    const isEdit = ref(false)
    const model = reactive<HttpPayLoad.addAddress>({
        id: 0,
        receiveName: "",
        receivePhone: "",
        receiveRegion: "",
        receiveDetail: ""
    })
    const formRef = ref<FormInstance | null>(null)
    const rules = reactive<FormRules>({
        receiveName: [
            { required: true, message: '请输入收货人姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '姓名长度在 2 到 5 个字符', trigger: 'blur' },
        ],
        receivePhone: [
            { required: true, message: '请输入收货人联系方式', trigger: 'blur' },
        ],
        receiveRegion: [
            { required: true, message: '请输入收货地址', trigger: 'blur' },
        ],
        receiveDetail: [
            { required: true, message: '请输入收货详细地址', trigger: 'blur' }
        ]
    })

    onMounted(async () => {
        await addressStore.init();
    })

    async function remove(id: number){
        try{
            await  ElMessageBox.confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            });
            await addressStore.remove(id);
            ElMessage({message: '删除成功...', type: 'success',});
        }catch(e){/* */}
    }

    function beginEdit(updateItem: Vm.address){
        model.id = updateItem.id;
        model.receiveName = updateItem.receiveName;
        model.receiveDetail = updateItem.receiveDetail;
        model.receivePhone = updateItem.receivePhone;
        model.receiveRegion = updateItem.receiveRegion;

        nextTick(() => {
            isEdit.value = true
        })
    }
    async function save(){
        try{
            await formRef.value?.validate()
            await addressStore[model.id === 0 ? 'addAddress' : 'updateAddress'](model);
            ElMessage({message: model.id === 0 ? '新增成功...' : '修改成功...', type: 'success',});
            isEdit.value = false;
        }catch(e){/* */}
    }

    function drawerColse(){
        model.id = 0;
        model.receiveName = "";
        model.receiveDetail = "";
        model.receivePhone = "";
        model.receiveRegion = "";
        formRef.value?.resetFields()
        isEdit.value = false;
    }

    async function setDefault(id: number){
        try{
            await addressStore.setDefault(id)
            ElMessage({message: '设置默认地址成功...', type: 'success',});
        }catch(e){/* */}
    }
</script>

<style scoped lang="stylus">
    .el-container
        .el-header
            height: 12vw
            display: flex
            justify-content: space-between
            align-items: center
            p
                flex-grow: 1
                text-align: center
                margin-right: 8vw
        .el-main
            .el-row
                padding: 10px 10px
                margin-bottom: 10px
                border-bottom: 1px solid #eee
                .address-name
                    display: flex
                    justify-content: space-between
                    .label
                        font-size: 12px
                        color: #999
                    .phone
                        font-size: 14px
                .address
                    padding-left: 10px
                    font-size: 14px
                    margin: 10px 0
                .address-btn
                    display: flex
                    justify-content: space-between
        .el-footer
            display: flex
            justify-content: center
            align-items: center
            .el-button
                width: 80vw
                height: 80%
    .drawer__footer
        margin-top: 20px
        text-align: center
        .el-button
            width: 40%
</style>