<template>
    <form 
    @submit.prevent="handleSubmit"
    class="flex flex-col"
    >
        <label for="value">Degrees</label>
        <input name="value" type="number" v-model="value">
        <label for="types">Type</label>
        <select name="types" v-model="type">
            <option value="f">Fahrenheit</option>
            <option value="k">Kelvin</option>
        </select>
        <input type="submit" value="Convert">
    </form>
    <label for="result">Result</label>
    <p name="result">{{ result }}</p>

</template>
<script>
export default{
    data() {
        return {
            type:'f',
            value: 0,
            result: '',
        };
    },
    methods: {
        handleSubmit() {
            if(this.type === 'f'){
                this.result = this.convertFtoC().toFixed(2)+' °C'
            } else if (this.type === 'k'){
                this.result = this.convertKtoC().toFixed(2)+' °C'
            }
        },
        convertFtoC() {
            return (this.value-32)*5/9;
        },
        convertKtoC(){
            return this.value-273.15;
        }
    },
    watch: {
        value(val){
            if(this.type === 'k'){
                if (val<0){
                    this.value = 0
                }else if (val>10e32){
                    this.value = 10e32
                }
            }
        }
    }
};
</script>
<style></style>