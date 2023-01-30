import {defineStore} from 'pinia';
import {markRaw, reactive, ref} from 'vue';
import { addressApi } from '@/api';

export default defineStore("address",() => {
    const list = reactive<Array<Vm.address>>([]);
    let isInit = false;

    async function init(){
        if(isInit) return;
        const data = await addressApi.getAddressList()
        list.push(...data)
        isInit = true
    }

    async function addAddress(model: HttpPayLoad.addAddress){
        const newId = await addressApi.addAddress(model);
        list.push({...model, id: newId, isDefault: 0, name: sessionStorage.getItem("userName") as string})
    }

    async function updateAddress(model: HttpPayLoad.addAddress){
        await addressApi.updateAddress(model)
        const isDefault: 0 | 1 = list.find(item => item.id === model.id)?.isDefault as 0 | 1
        list.splice(list.findIndex(item => item.id === model.id), 1, {...model, isDefault, name: sessionStorage.getItem("userName") as string})
    }

    async function remove(id:number){
        await addressApi.remove(id);
        list.splice(list.findIndex(item => item.id === id), 1);
    }

    async function setDefault(id: number){
        await addressApi.setDefault(id);
        const defaultItem = list.find(item => item.isDefault === 1)
        if(defaultItem){
            defaultItem.isDefault = 0
        }
        (list.find(item => item.id === id) as Vm.address).isDefault = 1
    }

    function getDefault(): Vm.address | null{
        return list.find(item => item.isDefault === 1) || null
    }

    return {list, init, addAddress, updateAddress, remove, setDefault, getDefault}
})