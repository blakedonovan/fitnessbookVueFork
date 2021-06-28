<template>

<div>
  
 <b-row class="mb-1 pl-1 pt-1">
    <b-col cols="2">
<b-form-group id="memberListing"  label-for="memberListing" class="mr-sm-2">
  
 <b-form-select v-model="memberSelection" :title="memberSelection" @change="changeMember"  aria-describedby="memberListing">
 
<option disabled value="" memberSelection>Mitglied auswählen</option>

<option v-for="member in memberList" v-bind:key="member" :value="member.cb_userid" lazy>

 {{member.user_name}}
  </option>
  </b-form-select>



      </b-form-group>


    

    </b-col>
    
 <b-col cols="1" class="pt-2">
   
   

    </b-col>
  
 </b-row>



    

  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>

        <b-nav-item to="/users/profile" exact exact-active-class="active">Profil</b-nav-item>
        <b-nav-item to="/users/trainingsplans" exact exact-active-class="active">Trainingspläne</b-nav-item>
        <b-nav-item to="/users/nutrition" exact exact-active-class="active">Ernährung</b-nav-item>
        <b-nav-item to="/users/biometrics" exact exact-active-class="active">Biometrie</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body>
     
      <router-view></router-view>

    </b-card-body>
  </b-card>
</div>
   

      
      
     

</template>

<script>
import axios from 'axios'

  export default {
  
 

    
    data:()=> {
      return {
     

      profileList:'http://192.168.178.65:8000/api/profileList',
      memberList:[],  
      
      }
    },

    props:{



    },

    components:{

 
    },
   async mounted(){

      try{


      let memberListData= await axios.get(this.profileList)
      this.memberList = memberListData.data
      console.log(this.memberList)




      

      
      }catch(e){
    
    this.errors.push(e)

      }

   
      },
    methods: {
   
   changeMember:function(){
   
     this.$store.commit("selectMember", this.memberSelection)
  console.log(this.memberSelection)

    }
    
      },
      
     
    }
  
</script>

