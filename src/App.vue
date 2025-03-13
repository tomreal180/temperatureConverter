<template>
  <div class="border rounded m-5 p-4">
    <div class="grid grid-cols-4 gap-6 mb-5">
      <label for="temperature">
        <span class="inline-block text-gray-500 text-sm pb-1">Degree</span>
        <input 
        name="temperature" 
        type="number" 
        class="border-2 w-full p-1 rounded focus:border-blue-500 hover:border-blue-300 outline-none"
        v-model="temperature">
      </label>
      <label for="types">
        <span class="inline-block text-gray-500 text-sm pb-1">From</span>
        <select 
        name="types"
        type="number"
        class=" border-2 w-full p-1 rounded focus:border-blue-500 hover:border-blue-300 outline-none"
        v-model="types">
            <option disabled value="choose">Please choose type</option>
            <option value="celcius" v-if="this.converted !== 'celcius'">Celcius</option>
            <option value="fahrenheit" v-if="this.converted !== 'fahrenheit'">Fahrenheit</option>
            <option value="kelvin" v-if="this.converted !== 'kelvin'">Kelvin</option>
        </select>
      </label>
      <label for="converted">
        <span class="inline-block text-gray-500 text-sm pb-1">To</span>
        <select 
        name="converted"
        type="number"
        class=" border-2 w-full p-1 rounded focus:border-blue-500 hover:border-blue-300 outline-none"
        v-model="converted">
            <option disabled value="choose">Please choose type</option>
            <option value="celcius" v-if="this.types !== 'celcius'">Celcius</option>
            <option value="fahrenheit" v-if="this.types !== 'fahrenheit'">Fahrenheit</option>
            <option value="kelvin" v-if="this.types !== 'kelvin'">Kelvin</option>
        </select>
      </label>
      <div class="flex flex-col justify-end items-starts">
        <button
          @click.prevent="handleSubmit"
          class="rounded bg-green-600 py-1 px-4 text-white hover:bg-green-700">
        Convert
      </button>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-6">
      <div v-if="this.converted==='celcius' && Object.keys(this.result).length !== 0">
        <h4 class="inline-block text-gray-500 text-sm pb-1">Result</h4>
      <p class="text-xl font-bold">{{ this.result.celcius }} &deg;C</p>
      </div>
      <div v-if="this.converted==='fahrenheit' && Object.keys(this.result).length !==0">
        <h4 class="inline-block text-gray-500 text-sm pb-1">Result</h4>
      <p class="text-xl font-bold">{{ this.result.fahrenheit }} &deg;F</p>
      </div>
      <div v-if="this.converted==='kelvin' && Object.keys(this.result).length !== 0">
        <h4 class="inline-block text-gray-500 text-sm pb-1">Result</h4>
      <p class="text-xl font-bold">{{ this.result.kelvin }} &deg;K</p>
      </div>
      <div id="error" v-if="Object.keys(this.error).length !== 0">
        <h3 class="inline-block text-red-300 text-sm pb-1">Error:</h3>
        <p class="text-xl font-bold text-red-500" v-for="x in error">{{ x }}</p>        
      </div>
    </div>
  </div>
</template>
<script>
import {
  CtoF,
  CtoK,
  FtoC,
  FtoK,
  KtoC,
  KtoF
} from "./utils.js"
const UNIT_TYPES = {
  CELCIUS: "celcius",
  FAHRENHEIT: "fahrenheit",
  KELVIN: "kelvin",
};
export default{
  data(){
    return {
      temperature: 0,
      types: "choose",
      converted: "choose",
      result: {},
      error: []
    };
  },
  methods: {
    validateTemperature(){
      let check= this.temperature
      if (this.types === UNIT_TYPES.FAHRENHEIT){
        check = FtoK(check)
      }else if(this.types === UNIT_TYPES.CELCIUS){
        check = CtoK(check)
      }

      if(check< 0 || check>10e32){
        this.error.push("The temperture is out of limit")
      }
    },
    validateType() {
      if(this.types === 'choose'){
        this.error.push("Please choose type of input")
      }
      if (this.converted === 'choose'){
        this.error.push("Please choose type of output")
      }
    },
    ErrorCheck() {
      this.error = []
      this.validateTemperature()
      this.validateType()
    },
    handleSubmit(){
      this.ErrorCheck()
      if(Object.keys(this.error).length === 0){
        if(this.types === UNIT_TYPES.CELCIUS){
          this.result = {
            [UNIT_TYPES.CELCIUS]: this.temperature,
            [UNIT_TYPES.FAHRENHEIT]: CtoF(this.temperature),
            [UNIT_TYPES.KELVIN]:CtoK(this.temperature),
          };
        } else if (this.types === UNIT_TYPES.FAHRENHEIT){
          this.result = {
            [UNIT_TYPES.CELCIUS]: FtoC(this.temperature),
            [UNIT_TYPES.FAHRENHEIT]: this.temperature,
            [UNIT_TYPES.KELVIN]: FtoK(this.temperature),
          };
        } else if (this.types === UNIT_TYPES.KELVIN){
          this.result = {
            [UNIT_TYPES.CELCIUS]: KtoC(this.temperature),
            [UNIT_TYPES.FAHRENHEIT]: KtoF(this.temperature),
            [UNIT_TYPES.KELVIN]: this.temperature,
          };
        }
      }

    },
    
  }
};
</script>
<style></style>
