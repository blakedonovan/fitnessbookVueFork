<template>
  <div>
    <h1>Trainingseinheiten verwalten</h1>
  <b-container fluid>
    <b-row>
      <b-col cols="1">

 
        </b-col>
<b-col cols="11">

<b-card v-for="trainingCategory in trainingCategories" :key="trainingCategory">


  <b-button   
  block 
  v-b-toggle="`accordion-${trainingCategory.id}`"

  @click="fetchTrainingUnitsByCatID(trainingCategory.id)"
  :value="trainingCategory.id"
  variant="info">  {{trainingCategory.type}} 
  </b-button>
  
  <b-collapse  :accordion="trainingUnits"   :id="`accordion-${trainingCategory.id}`"  class="mt-1" >
<b-row>

<!-- add Unit Modal-->
 <b-button 
 class="addUnit"
 v-b-modal="`m-${trainingCategory.id}`"
 
 >+</b-button>

  <b-modal
  
   :id="`m-${trainingCategory.id}`"
   :title="`${trainingCategory.type}`"
   size="xl"
   centered
   >
   
  
  <b-form enctype="multipart/form-data">
  
<b-form-group>
    <label class="sr-only" for="inline-form-input-trainingUnitName">Trainingseinheit Bezeichnung</label>
    <b-form-input
      id="inline-form-input-trainingUnitName"
     autofocus
      v-model="unitName"
      placeholder="Bezeichnung der Trainingseinheit eingeben"
    ></b-form-input>



   
    <b-form-textarea
    class="mt-2"
      rows="9"
     
      no-resize
     v-model="unitDescription"
    placeholder="Beschreibung der Trainingseinheit eingeben"
    >


    </b-form-textarea>
     


  
 <input type="file" @change="onFileChange" >
  
 </b-form-group>

 
    <b-button 
    variant="outline-primary"
    @click="addUnit(trainingCategory.id)"
    >
    <b-icon 
         icon="check2-circle" 
         aria-hidden="true">
         </b-icon>
    </b-button>
  </b-form>


  </b-modal>
<!-- add Unit Modal-->

   </b-row>
   
    <b-table
    :items="trainingUnits" 
    :fields="fields"
     show-empty
     
 table-variant="info"
 responsive
 sticky-header
 lazy
    >

<template v-slot:cell(description_pic)="row">
<b-img width="350" height="250" alt="kein bild" :src="`${ImageUrl}${row.item.description_pic}`" lazy>

</b-img>
</template>
    

     <template v-slot:cell(name)="row">
   
   
        <b-form-input v-model="row.item.name" size="20"  />
 
    
  
      </template>


     <template v-slot:cell(description)="row">
   
   
        <b-form-textarea
        rows="3"
        max-rows="8"
         v-model="row.item.description"   />
 
    
  
      </template>


<template v-slot:cell(id)="row">
   
   
        <b-button
        :id="row.item.id"
        @click="saveUnitEdit(trainingCategory.id,row.item.id,row.item.name,row.item.description)"
       variant="info"
         >
        <b-icon 
         icon="check2-circle" 
         aria-hidden="true">
         </b-icon>
        </b-button>

         
    
   <b-button 
   :id="`confirm-pop-${row.item.id}${trainingCategory.id}`" 
  
   tabindex="0"
   variant="danger"
   >
     <b-icon icon="trash-fill" aria-hidden="true">
       </b-icon>
       </b-button>
  <b-popover 
  :target="`confirm-pop-${row.item.id}${trainingCategory.id}`" 
  variant="danger" 
  triggers="focus">
  
    <template #title>Löschen ?</template>
    <b-button
          :value="row.item.id"
        :id="row.item.id"
        @click="removeUnit(row.item.id,trainingCategory.id)"
       variant="danger"
            >
        
        Ja
        </b-button>
  </b-popover>
      </template>

    
    </b-table>


  </b-collapse>

</b-card>

 
 


    </b-col>
   
    </b-row>
  </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  
  data() {
      return {
    trainingCategories:[],
    trainingUnits:[],
     trainingUnitDetails:[],
   
          unitName: '',
          unitDescription: '',
          mediaUpload:'',
          mediaFileName:'',
          ImageUrl:'http://192.168.178.65:8000/storage/TrainingUnits/',
         
        

     fields:[
  
  {key:'name',label:'Name'},

  {key:'description',label:'Beschreibung'},
  {key:'description_pic',label:'Bild'},
  
  {key:'id',label:' '},
],
   
      }
    },
  
  methods: {

  async  fetchTrainingCategories(){

      const response = await axios.get('http://192.168.178.65:8000/api/getTrainingCats');
this.trainingCategories = response.data
console.table(this.trainingCategories)
    },

    async  fetchTrainingUnitsByCatID(value){
try {

let trainingUnits = await axios.get('http://192.168.178.65:8000/api/getTrainingCatSelection/'+value);

this.trainingUnits = trainingUnits.data



console.table(this.trainingUnits) 
} catch (error) {
  console.log('db did not load')
}
    },

      async  fetchTrainingUnitDetails(value){

          var trainingUnitDetail = await axios.get('http://192.168.178.65:8000/api/getTrainingCatSelection/'+value);
          this.trainingUnitDetails = trainingUnitDetail.data
  },

async saveUnitEdit(catID,unitID,unitName,unitDescription){



var editUnitUrl= 'http://192.168.178.65:8000/api/updateUnit/'+unitID+'?name='+unitName+'&description='+unitDescription;
 console.log(editUnitUrl)
 
 await axios.put(editUnitUrl).then((res) => {
              console.table(res.data)
            
              this.fetchTrainingUnitsByCatID(catID)
   
   
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                     
                 });



  

},

async onFileChange(e){

  var addUnitUrl= 'http://192.168.178.65:8000/api/uploadFile/';

  var files = e.target.files || e.dataTransfer.files;

      if (!files.length)
        return;

       this.mediaUpload=files[0]
 this.mediaFileName=files[0].name

const upfile = new FormData();

upfile.append('mediaUpload',this.mediaUpload)


    await axios.post(addUnitUrl,upfile,{headers: { 'Content-Type': 'multipart/form-data'}})
 .then((res) => {
              
            this.mediaFileName=res.data
            // console.log(this.mediaFileName)
   
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                     
                 });

  },
   
     

async addUnit(catID){

const addUnit = new FormData();

addUnit.append('name' , this.unitName)
addUnit.append('description' , this.unitDescription)
addUnit.append('mediaFilename',this.mediaFileName)
addUnit.append('unitCat' , catID)


//console.log(this.mediaFileName)
console.table(addUnit)

var addUnitUrl= 'http://192.168.178.65:8000/api/addUnit/';
 
 await axios.post(addUnitUrl,addUnit )
 .then((res) => {
              console.log(res.data)
        
              this.fetchTrainingUnitsByCatID(catID)
              this.unitName= '',
              this.unitDescription= '',
              this.mediaUpload='',
              this.mediaFileName=''
   
   
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                     
                 });



  

},

async removeUnit(remove,category){


try {


 await axios.post('http://192.168.178.65:8000/api/removeUnit/'+remove)
                 .then((res) => {
                      console.log(res)

                       this.fetchTrainingUnitsByCatID(category)
          
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                    
                 });

} catch (error) {

  console.log('dataset for id did not exist' +error)
}


}
  },
  watch: {
   
    
  },
  name: 'manageTrainingUnits',

  mounted () {
      
 
  this.fetchTrainingCategories()
},
  
    computed(){


    },

}


</script>



<style scoped>

.addUnit{
  position: relative;
  margin-left: 15px;
  margin-top: 2px;
  margin-bottom: 7px;
}

</style>