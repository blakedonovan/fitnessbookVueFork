<template>
  <div id="app">
   

  
    <div>
  <!-- Image and text -->
  <b-navbar variant="dark" type="light">
    <b-navbar-brand href="#">
 

      <b-button v-b-toggle.sidebar-variant>
        
     
      <b-icon icon="chevron-bar-down"  variant="warning"></b-icon>

        
        
        </b-button>
    </b-navbar-brand>
  </b-navbar>
</div>
       
      <div>
    
    <b-sidebar id="sidebar-variant" title="Fitnessbook" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-2">
        <b-button-group vertical >

          <router-link to="/" class="mb-1 ml-0">
            <b-button variant="success">FitnessBook</b-button>
          </router-link> 
          <router-link to="/users" class="mb-1 ml-0">
            <b-button variant="success">Benutzer Profile</b-button>
          </router-link> 
          <router-link to="/cookbook" class="mb-1 ml-0">
            <b-button variant="success">Kochbuch</b-button>
          </router-link> 
          
        </b-button-group>
      </div>
    </b-sidebar>

  </div>



    
 
    <router-view/>
  </div>

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
