<template>
<div>
   
    <b-form-select v-model="selected" v-on:change="changeMember" :options="options">

    
    </b-form-select>
   
  
 <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs lazy>

        <b-nav-item to="/fitnessbook/manageUsers" exact exact-active-class="active">Benutzerverwaltung</b-nav-item>
        <b-nav-item :to="{name:'ManageTrainingUnits'}" exact exact-active-class="active">Trainings Einheiten</b-nav-item>

      </b-nav>
    </b-card-header>

    <b-card-body>
     
      <router-view></router-view>

    </b-card-body>
  </b-card>
</div>
   
</template>


<style scoped>

</style>
<script>
//import { ManageTrainingUnits } from '@/components/fitnessbook/manageTrainingUnits.vue'

export default ({
  mounted () {
   
  },
  methods: {

    changeMember:function(){
   
     this.$store.commit("selectMember", this.selected)
  

    }
  },
name: 'Test',
  data (){
    return {
      selected:0,
       memberId:this.$store.state.selection.selected,
      
    
    options: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
        
        ]
    }
  },
  components:{
   // ManageTrainingUnits
  }
})
</script>
