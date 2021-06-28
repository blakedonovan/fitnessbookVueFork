<template>
<div>

 <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs lazy>

          
        <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
        <b-nav-item to="/cookbook/recipes" exact exact-active-class="active">Rezepte</b-nav-item>
        <b-nav-item to="/cookbook/ingredients" exact exact-active-class="active">Zutaten</b-nav-item>
        
      </b-nav>
    </b-card-header>

    <b-card-body>
     
      <router-view></router-view>

    </b-card-body>
  </b-card>
</div>
   
</template>