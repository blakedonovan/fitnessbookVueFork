
<template>
<b-container fluid>
 <div>
   <div>

<div class="col-1">
  <b-button v-b-toggle.collapse-1 variant="success" size="sm">Zutat hinzufügen</b-button>
</div>
  <b-collapse id="collapse-1" class="mt-2 mb-3">
  <div>


 

  <b-form inline @submit.prevent="checkForm" method="post" id="handleIngredient" class="">
    <label class="sr-only" for="inline-form-input-Zutat">Zutat</label>
    <b-form-input
      id="inline-form-input-Zutat"
      class="ml-3 mb-2 mr-sm-2 mb-sm-0 sm"
      placeholder="Zutat"
      v-model="form.Zutat"
      ref="ingredient"
    ></b-form-input>

    <label class="sr-only" for="inline-form-input-Fett">Fett</label>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input 
      id="inline-form-input-Fett" 
      placeholder="Fett"
      v-model="form.Fett"
      ></b-form-input>
    
    </b-input-group>

   <label class="sr-only" for="inline-form-input-Kohlenhydrate">Kohlenhydrate</label>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input 
      id="inline-form-input-Kohlenhydrate" 
      placeholder="Kohlenhydrate"
      v-model="form.Kohlenhydrate"
      ></b-form-input>
    </b-input-group>

    <label class="sr-only" for="inline-form-input-Protein">Protein</label>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input 
      id="inline-form-input-Protein"
       placeholder="Protein"
       v-model="form.Protein"
       ></b-form-input>
    </b-input-group>


 <label class="sr-only" for="inline-form-input-Protein">Kalorien</label>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input 
      id="inline-form-input-Kalorien"
       placeholder="Kalorien"
       v-model="form.kcal"
       ></b-form-input>
    </b-input-group>

<label class="sr-only" for="inline-form-input-Protein">EAN</label>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0" hidden>
      <b-form-input 
      id="inline-form-input-Kalorien"
       placeholder="EAN"
       v-model="form.ean"
       disabled
       ></b-form-input>
    </b-input-group >

    <b-button variant="primary" v-b-toggle.collapse-1  v-on:click="checkForm" class="xs" >Speichern</b-button>
  </b-form>

</div>

  </b-collapse>
</div>


<div class="col-6 pl-0">
 <b-input-group  class="w-25 mt-2 mb-2 pl-1 " >
<b-input-group-prepend is-text>
        <b-icon icon="search" variant="success"></b-icon>
      </b-input-group-prepend>
    <b-form-input  v-model="search" placeholder="Zutat suchen" >

    </b-form-input>
   </b-input-group>


  </div>

  
<b-table  class="col-auto pl-0"
 

 sticky-header
:items="ingridients" 
:fields="nutritionCat"
:sort-by.sync="sortBy"
:sort-desc.sync="sortDesc"
 sort-icon-right
 dark="true"
:filter=search
 lazy
>

</b-table>

  
   </div>
 
  </b-container>

</template>

<script>
import axios from 'axios'
  export default {
    data() {
      
      return {

  //table handling
  search:'',   // search string for table 
  errors:[],
 sortBy: 'Zutat',
 sortDesc: false,
//table handling

form:{
Zutat:'',
Fett:null,
Kohlenhydrate:null,
Protein:null,
kcal:null,
ean:0

},
IngredientHandler:'',


    ingridients:[],

    nutritionCat: [
      {key:'id',sortable:false},
      { key: 'Zutat' , sortable: true },
      { key: 'Fett', sortable: true },
      { key: 'Kohlenhydrate', sortable: true },
      { key: 'Protein', sortable: true },
      { key: 'kcal', sortable: true }
        ],

      }
    },

computed:{

},

    async mounted(){
// fetch table data      
      try{


      const response = await axios.get('http://192.168.178.65:8000/api/ingredient')
      this.ingridients = response.data
      

      }catch(e){
    
    this.errors.push(e)

      }
      },

   methods:{



//post ingredient data
        checkForm: function() { 



//console.log(JSON.stringify(this.form))

if(this.form.Zutat && this.form.Fett && this.form.Kohlenhydrate && this.form.Protein && this.form.kcal && this.form.kcal){

axios.post('http://192.168.178.65:8000/api/ingredient', this.form)
                 .then((res) => {

                   this.ingridients = res.data;
              
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                     //Perform action in always
                 });



    }else{
        alert("sth is missing")

    } 
    }
    
    ,
       
      }

}
      
  

  
</script>


