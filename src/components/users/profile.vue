
<template>
 
  <div>
 
  <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <button @click="reset">Reset</button>
    <p>{{elapsedMin}}:{{elapsedSec}}</p>
   <b-card v-for="pf in profile" :key="pf"
    :title="pf.user_name"
  
  
    style="max-width: 20rem;"
    class="mb-2"
  >

    </b-card>

  <b-form inline v-for="pf in profile" :key="pf">
  

   

    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-form-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      type="date"
      placeholder='ID'
     :value="pf.birthday"
    ></b-form-input>

    <label class="sr-only" for="inline-form-input-username">Username</label>
    <b-input-group  class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input 
      id="inline-form-input-username" 
      placeholder="Gewicht"
      style="max-width: 11rem;"
      :value="pf.size"
      ></b-form-input>
    </b-input-group>

   

    <b-button variant="primary">Speichern</b-button>

  </b-form>

</div>





</template>

<script>
import axios from 'axios'

//import { mapGetters } from 'vuex'
  export default {

   
    data () {

    return {
      memberID: null,
      apiIP:this.$store.state.static.apiIP,
      userProfileData:'http://192.168.178.65:8000/api/profile/',
      profile:[],
      bmi:null,
      
     Interval:null,
     sTime:null,
     eTime:null,
     stoppedTime:'',
     elapsedSec: 0,
     elapsedMin:0,
      timer: undefined,

     
    }
  },
 computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
   
  },
watch: {

     '$store.state.selection.memberSelection': function() {
         this.fetchProfile()
    
    
  }
  
  },
 

  methods:{
     async fetchProfile(){

  this.memberID = this.$store.state.selection.memberSelection
  const response = await axios.get(this.userProfileData+this.memberID)
  this.profile = response.data
  return this.profile
},
  
async startWatch(){
  
  
this.sTime = new Date()
   this.sTime=this.sTime.getTime()

},


  start() {
      this.timer = setInterval(() => {
        this.elapsedSec += 1;
        if(this.elapsedSec>59){
          this.elapsedMin+=1
          this.elapsedSec==0
        }

      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    }
  }

 




  ,
mounted(){

   this.fetchProfile()
  
   
   
  

  }
  }
 
</script>


<style scoped>
</style>