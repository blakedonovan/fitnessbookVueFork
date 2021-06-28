<template>

   <div>

<b-row >
 <b-col cols="2">
   <b-calendar variant="info" v-model="value" :min="min" :max="max" locale="de"></b-calendar>
</b-col>
  <b-col cols="10">
  
      <apexchart width="900" type="area" :options="options" :series="series"></apexchart>
</b-col>
</b-row>
    <b-row>

      
    </b-row>
   </div>
</template>

<script>

import axios from 'axios'


export default {

  name: 'Gewicht',

  data: () => ({
   
    cdata: [],
    dateRange:[],
    memberID :null,

options: {

  xaxis: {
            categories: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August']
          },
          stroke: {
  curve: 'smooth',
},


},
      series: [],


    
      
  }),


 async mounted () {

  this.fetchProfile()
  this.fillData();
   this.fetchBiometrics()
  }
,
methods:{


async fetchBiometrics(){

 try {
const userProgress  = await axios.get('http://192.168.178.65:8000/api/userProgress/'+this.memberID)

      this.cdata = userProgress.data.map(item=>item.Gewicht)
const date = userProgress.data.map(item=>item.Datum)

console.table(date)

 this.series = [{
    data:this.cdata ,
   name:'Gewicht in kg'
   }]


     
      
    } catch (e) {
      console.error(e)
    }

},
 async fetchProfile(){

  this.memberID = this.$store.state.selection.memberSelection
  const response = await axios.get(this.userProfileData+this.memberID)
  this.profile = response.data
  return this.profile
},



async fillData(){

}



},

watch: {

     '$store.state.selection.memberSelection': function() {
         this.fetchProfile()
          this.fetchBiometrics()
         this.fillData()
    
    
  }
  }

 


}
</script>