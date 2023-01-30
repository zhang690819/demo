<template>
    <div class="conter">
        <el-button 
            :icon="Minus" 
            size="small" 
            class="left" 
            @click="emits('dec')"
            :disabled="props.count === 1"></el-button>
        <span>{{ props.count }}</span>
        <el-button 
            :icon="Plus" 
            size="small" 
            class="right" 
            @click="emits('inc')"
            :disabled="count === props.maxCount"></el-button>
    </div>
</template>

<script setup lang="ts">
    import { useCounter } from '@vueuse/core'
    import { ref } from 'vue'
    import { Plus, Minus } from '@element-plus/icons-vue';

    
    interface Props {
        count: number;
        maxCount?: number;
    }
    const props = withDefaults(
        defineProps<Props>(),
        {maxCount: 5}
    )

    interface Emits {
        (eventName: "dec"): void;
        (eventName: "inc"): void;
    }
    const emits = defineEmits<Emits>()

</script>

<style scoped lang="stylus">
.conter
    display: flex
    .el-button
        width: 5vw
        border: 1px solid #f5f5f5
    .left
        border-radius: 15px 0 0 15px
        border-right: 0
    .right
        border-radius: 0 15px 15px 0
        border-left: 0
    span
        width: 7vw
        text-align: center
        border: 1px solid #f5f5f5

</style>