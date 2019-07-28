<template>
    <button class="default" :class="classes" @click="e=>$emit('click')" 
        :data-toggle="dataToggle" 
        :data-target="dataTarget">
        {{ label }}
    </button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component({

})
export default class extends Vue {
    @Prop(String) public readonly label;
    @Prop() public readonly classes;
    @Prop() public readonly dataToggle;
    @Prop() public readonly dataTarget;
}
</script>

<style scoped>
    .default{
        background: #388CD0;
        border: 1px solid #388CD0;
        box-sizing: border-box;
        border-radius: 10px;
        height: 42px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
    }
</style>