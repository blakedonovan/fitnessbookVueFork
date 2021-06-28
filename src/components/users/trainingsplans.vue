<template>

  <div  class="accordion" role="tablist">


<b-row>
<b-col cols="6" class="pr-3 pb-3">
  <b-button 
  variant="primary" 
 
  id="createTbutton"
  v-b-toggle.createTrainingPlan
  >Trainingsplan erstellen</b-button>
 

 

  </b-col>
  <b-col >

    <b-collapse cols="2" id="createTrainingPlan">
     <b-form class="pt-0"  inline>

 <b-input v-model="trainingPlanName" placeholder="Trainingsplan Name" width="25px"></b-input>



    <b-button 
    variant="primary" 
    @click="addTrainingPlan(memberID)" 
    class="ml-1"
    
    >Speichern</b-button>
  </b-form>
  </b-collapse>
  </b-col>
  


</b-row>


    <b-card no-body class="mb-1" v-for="trainingPlan in trainingPlans" v-bind:key="trainingPlan">
      <b-card-header header-tag="header" class="p-1" role="tab">
<b-row>
  <b-col cols="11">
        <b-button 
        block 
        v-b-toggle="`accordion-${trainingPlan.id}`" 
        @click="fetchTrainingUnitsbyTPId(trainingPlan.id)" 
        variant="info">
        {{trainingPlan.name}}
        </b-button>
        </b-col>
  <b-col>
     




<b-button :id="`confirm-pop-${trainingPlan.id}`" block>

  <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
</b-button>

  <b-popover 
  :target="`confirm-pop-${trainingPlan.id}`" 
  variant="danger" triggers="focus">
  
    <template #title>Trainingsplan löschen ?</template>
  
    <b-button 
    size="sm" 
    variant="danger" 
    @click="removeTrainingPlan(trainingPlan.id)">
  
        Ja
  
      </b-button>



  </b-popover>

 

</b-col>
</b-row>
      </b-card-header>

      <b-collapse 
      :id="`accordion-${trainingPlan.id}`" 
      accordion="trainingPlan-accordion" 
      role="panel">

        <b-card-body>
          
          <b-card-text lazy>

            <b-form>
              <b-container fluid>
     

                   <b-row>
    <b-col cols="1" class="ml-0 mb-1">
      
      <b-button 
      v-b-toggle.addTrainingUnit 
      variant="primary"
      @click="getTrainingUnitsByCat"
      >Trainingseinheit hinzufügen</b-button>
      
      </b-col>
  <b-collapse id="addTrainingUnit" class="mt-2">
    
    <b-col cols="12" class="ml-0 mb-1">
    
  <b-form class="pt-2"   inline>


  <b-input-group prepend="Kategorie" class="mb-2 mr-sm-2 mb-sm-0">
   
    <b-form-select
      id="inline-form-custom-select-trainingUnits"
      class="mb-2 mr-sm-2 mb-sm-0 "
      
      v-model="trainingCat"
      @change="getTrainingCategorySelection"
      required
      
    >
     <option selected disabled>
      Bitte Kategorie wählen
      </option>
    <option v-for="trainingUnitCat in trainingUnitsbyCat" :key="trainingUnitCat" :value="trainingUnitCat.id" >
      {{trainingUnitCat.type}}
  </option>
    </b-form-select>
</b-input-group>

<b-input-group prepend="Trainingseinheit" class="mb-2 mr-sm-2 mb-sm-0" >
    <b-form-select
      id="inline-form-custom-select-trainingUnits"
      class="mb-2 mr-sm-2 mb-sm-0"
    
     
      v-model="trainingUnit"
      required
      :disabled="isEnabled"
    >
    <option selected disabled>
      Bitte Trainingseinheit wählen
      </option>
    
    <option v-for="trainingCatSelect in trainingCatSelection" :key="trainingCatSelect" :value="trainingCatSelect.id" >
      {{trainingCatSelect.name}}
  </option>
    </b-form-select>

 

</b-input-group>

    <label class="sr-only" for="inline-form-input-rep">Wiederholungen
    
    </label>
    <b-input-group prepend="Wiederholungen" class="mb-2 mr-sm-2 mb-sm-0">
    <b-form-input
      id="inline-form-input-rep"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Beispiel 5/5/5/5"
      v-model="reps"
      required
      trim
     
    ></b-form-input>
    
    </b-input-group>

    <label class="sr-only" for="inline-form-input-weight">Gewicht</label>
    <b-input-group prepend="Gewicht" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input 
   
      required
      id="inline-form-input-weight" 
      placeholder="Beispiel 5/15/25/35"
      trim
      v-model="weight">
      
      </b-form-input>

      
    </b-input-group>
 


    <b-button 
    
    variant="primary"  
    @click="addTrainingUnit(trainingPlan.id),checkAddTrainingUnit()" >
    Speichern
    </b-button>
  </b-form>
  
  <b-list-group v-if="isError" class="pt-1" >
  <b-list-group-item variant="danger" v-for="error in errors" :key="error">{{ error }}</b-list-group-item> 
  </b-list-group>
  
    </b-col>
   
  </b-collapse>
      

  </b-row>


<b-table 
 striped 
 hover 
 :items="trainingUnits" 
 :fields="fields"
 :busy.sync="isBusy"
 show-empty
 table-variant="primary"
 responsive

  lazy
 >

      
  <template v-slot:cell(reps)="row">
   
   
        <b-form-input v-model="row.item.reps"   :disabled="isDisabled"/>
 
    
  
      </template>
<template v-slot:cell(weight)="row">
   
   
        <b-form-input v-model="row.item.weight"   :disabled="isDisabled" />
<b-button-group >

        <b-button
        
        variant="primary"
         v-model="row.item.id"
          @click="editUnit(row.item.id,row.item.reps,row.item.weight)">
          <b-icon 
          icon="pencil-square" 
          aria-hidden="true">
          </b-icon>
          </b-button>
         
          <b-button 
      
         variant="info"
          @click="saveUnitEdit(trainingPlan.id,row.item.id,row.item.reps,row.item.weight)">
         <b-icon 
         icon="check2-circle" 
         aria-hidden="true">
         </b-icon>
          </b-button>
    
  </b-button-group >

      </template>
<template v-slot:cell(description_pic)="row">
<b-img 
 width="350" height="250" 
 alt="kein bild" 
 :src="`${ImageUrl}${row.item.description_pic}`" 
 lazy>

</b-img>

</template>

<template v-slot:cell(id)="row">
   
   
        
        <b-button v-model="removeUnit" variant="dark"
         @click="removeUnit(row.item.id,trainingPlan.id)">
         <b-icon icon="trash-fill" aria-hidden="true">
           </b-icon>
           </b-button>
    
  
      </template>

 </b-table>

  </b-container>
            </b-form>
          
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

   
  </div>
</template>

<script>
import axios from 'axios'

  export default {
 
 computed:{


 },
 methods: {
    
    async fetchTrainingsPlans(){

try {
  
this.isBusy = true
  this.memberID = this.$store.state.selection.memberSelection
  const response = await axios.get('http://192.168.178.65:8000/api/trainingList/'+this.memberID);
  this.isBusy = false
  this.trainingPlans = response.data
 
} catch (error) {
  this.isBusy = false
  console.log('failed to load db table')
  return this.trainingPlans=[]
}
  
  console.table(this.trainingPlans)
},
async fetchTrainingUnitsbyTPId(value){


 try {
   
this.resetTrainingUnitForm()
   this.isDisabled=true
   const response = await axios.get('http://192.168.178.65:8000/api/trainingUnitsbyListID/'+value);
   this.trainingUnits = response.data
   console.table(this.trainingUnits)
 
 } catch (error) {
   console.log('failed to load db table')
 }
  
},

async getTrainingUnitsByCat(){

try {

const response = await axios.get('http://192.168.178.65:8000/api/getTrainingCats');
this.trainingUnitsbyCat = response.data




console.table(this.trainingUnitsbyCat)
} catch (error) {
console.log('db did not load')  
}

},
async getTrainingCategorySelection(value){

try {

let response = await axios.get('http://192.168.178.65:8000/api/getTrainingCatSelection/'+value);

this.trainingCatSelection = response.data

// check if any Category was selected and enable training Unit selection
if(this.trainingCat>0)
  {this.isEnabled=false}

console.table(this.trainingCatSelection) 
} catch (error) {
  console.log('db did not load')
}


},

addTrainingPlan(value){
let trainingPlan={'user':value,'name':this.trainingPlanName}

axios.post('http://192.168.178.65:8000/api/addPlan/', trainingPlan)
                 .then((res) => {
                      console.log(res)
              
              this.fetchTrainingsPlans()
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                    
                 });

this.fetchTrainingsPlans()

  

},

removeTrainingPlan(RtrainingPlan){



axios.post('http://192.168.178.65:8000/api/removeTrainingPlan/'+RtrainingPlan)
                 .then(() => {
                    
              
              this.fetchTrainingsPlans()
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                     
                 });



  

},


async addTrainingUnit(value){

let arr = {
  "training_plans_individual_id":value,
  "trainingplan_unit_id":this.trainingUnit,
  "reps":this.reps,
  "weight":this.weight,
  }

console.table(arr)
var addUnitPlanUrl= 'http://192.168.178.65:8000/api/addTrainingUnit/';
 

if(this.trainingUnit && this.reps && this.weight){
  await axios.post(addUnitPlanUrl,arr)
                  .then(() => {
                
                this.resetTrainingUnitForm()

                this.fetchTrainingUnitsbyTPId(value)

                  })
                  .catch((error) => {
                    console.log(error)
                  
                  }).finally(() => {
                      
                  });

     
}


  
}
 ,
 
async editUnit(){
this.isDisabled=false

},

async saveUnitEdit(tpid,edit,reps,weight){



var editUnitPlanUrl= 'http://192.168.178.65:8000/api/updateTrainingUnit/'+edit+'?reps='+reps+'&weight='+weight;
 
 await axios.put(editUnitPlanUrl)

                 .then((res) => {
              console.table(res.data)
            
               this.fetchTrainingUnitsbyTPId(tpid)
   
   
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                     
                 });



  

},

async removeUnit(remove,tpid){


try {


 await axios.post('http://192.168.178.65:8000/api/removeTrainingUnit/'+remove)
                 .then((res) => {
                      console.log(res)

                        this.fetchTrainingUnitsbyTPId(tpid)
          
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                     //Perform action in always
                 });

} catch (error) {

  console.log('dataset for id did not exist' +error)
}


},

      checkAddTrainingUnit :function(){

      

          this.errors = [];

if (this.trainingCat == 0) {
         this.errors.push("Trainingskategorie wählen");
      }

if (this.trainingUnit == 0) {
         this.errors.push("Trainingseinheit wählen");
      }

 if (this.reps == undefined || this.weight=="") {
         this.errors.push("Wiederholungen eingeben");
      }

      if (this.weight == undefined || this.weight=="") {
         this.errors.push("Gewicht angeben");
      }
      
   

     
  if(this.errors.length==0){
    
    this.isError=false
  
  }else{

    this.isError=true
  }

    },

    resetTrainingUnitForm:function () {

      this.weight=""
      this.reps=""
      this.trainingUnit=""
      this.trainingCat=""      
      this.errors=[]
    },

    onClose() {
        this.popoverShow = false
      }
}
  ,
    
  watch: {

  '$store.state.selection.memberSelection': function() {
         this.fetchTrainingsPlans()
    
  },

  
 
  },
    data() {
      return {
        memberID:null,
        trainingPlanName:'',
        trainingUnitsbyCat:[],
        trainingCatSelection:[],
        trainingPlans:[],
        trainingUnits:[],
     errors: [],
        trainingPlanForm:{
          memberID:null,
          trainingPlanForm:null,
        },

trainingPlandID:null,
fields:[
  
  {key:'name',label:'Name'},
  {key:'reps',label:'Wiederholungen',tdClass: 'widthEl'},
  {key:'weight',label:'Gewicht',tdClass: 'widthEl'},
  {key:'description',label:'Beschreibung',tdClass: 'widthEl'},
  {key:'description_pic',label:'Bild',tdClass: 'widthEl'},
  {key:'id',label:' '},
],

trainingUnit:0,
trainingCat:0,
isEnabled:true,
weight:null,
reps:null,
 isDisabled:false,
isError:false,

 isSet:true,
  ImageUrl:'http://192.168.178.65:8000/storage/TrainingUnits/'
      
      }
    },

    mounted(){
  
    this.fetchTrainingsPlans()
  
    }
  }
</script>

<style scoped>



</style>