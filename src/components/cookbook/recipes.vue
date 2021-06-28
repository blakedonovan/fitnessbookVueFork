<template>
    <b-container fluid>



      
<div>
  <b-navbar type="light" variant="light" id="recipe_bar" class="recipe_bar">
    <b-nav-form inline>

       <b-form-group id="foodCat"  label-for="input-3" class="mr-sm-2">
  
 <b-form-select v-model="catSelection"  @change="getRecipesById" aria-describedby="recipe_cat_selection">
 
<option disabled value="">Rezept Kategorie wählen</option>
<option v-for="cat in recipeCategories" v-bind:key="cat" :value="cat.category_id" lazy>

 {{cat.name}}
  </option>
  </b-form-select>

  <b-form-input class="mr-sm-2 ml-2" placeholder="Rezept Suche" v-model="findRecipe"></b-form-input>
      </b-form-group>
      
      
    
    </b-nav-form>
<b-pagination 
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

  </b-navbar>
</div>



      


   <div>
   
    <b-table 
     borderless
    :filter="findRecipe"
    :items="recipes" 
    :fields="fields"
    :per-page="perPage"
    :current-page="currentPage"
    lazy
    >


 
 <template v-slot:cell(recipe_id)="row" lazy>

          <b-row class="mb-2">
            <b-col>
              <b-card 
              style="max-width: 40rem;"
              >
         {{ row.item.recipe_name}} 

         <p>{{row.item.recipe_image_url}}</p>
      
      <b-img src="https://www.edeka.de/media/01-rezeptbilder/rezeptbilder-i-p/rez-edeka-pizza-funghi-rezept-i-p.jpg?imwidth=960&imdensity=1" 
      fluid alt="Fluid image">
      </b-img>
      
     
      <router-link :to="{name:'RecipeDetails',
                    params: { recipeId: row.item.recipe_id }
                  ,query:{ RecipeName: row.item.recipe_name}}
                    ">
                    Rezept {{row.item.recipe_id}}
      </router-link>
            </b-card>
            </b-col>

           
          </b-row>

   </template>

    </b-table>
  </div>



</b-container>


</template>



<script>
import axios from 'axios'
  export default {
  
    data() {
      return {
perPage: 3,
        currentPage: 1,
fields: [

 

  { key: 'recipe_id', label: ' ' },

        
    ],

        findRecipe:'',
        recipeCategories:[],
        recipes:[],
        recipeIngredients:[],
        filteredRecipes:[],
        recipe_id:'',
        catSelection:null,
        errors:[]
      }
    },

async mounted(){
// fetch category selector , load recipes without selection   
      try{


      const recipeCat= await axios.get('http://192.168.178.65:8000/api/recipeCategories')
      this.recipeCategories = recipeCat.data
      console.log(this.recipeCategories)



      const recipes = await axios.get('http://192.168.178.65:8000/api/recipes')
      this.recipes = recipes.data

      
      console.log(this.recipes)
      
      }catch(e){
    
    this.errors.push(e)

      }

   
      },

      created () {
        
  },
  watch: {
   

  },
      methods:{

       async getRecipesById(){
          
          this.filteredRecipes = await axios.get('http://192.168.178.65:8000/api/recipeId/'+this.catSelection)
          this.recipes = this.filteredRecipes.data
        
          console.log(this.filteredRecipes.data)
        },

        info:function(recipe_id){alert("hi"+recipe_id) ; console.log(recipe_id)}
      }



  }
</script>

<style scoped>
.recipe_bar {
  color: rgb(37, 13, 104);
}
.card {
    min-height: 200px;
}
.foodCat{
  color: rgb(0, 204, 255);
}
</style>