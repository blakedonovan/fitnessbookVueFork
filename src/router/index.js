import Vue from 'vue'
import VueRouter from 'vue-router'





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Fitnessbook',
    component: () => import('../views/FitnessBook.vue'),
    
  
  children:[

    {   
        path: '/fitnessbook/manageTrainingUnits',
        name:'ManageTrainingUnits',
        component: () => import('../components/fitnessbook/manageTrainingUnits.vue') },
      
    { 
        path: '/fitnessbook/manageUsers',
        name:'ManageUsers',
        component: () => import('../components/fitnessbook/manageUsers.vue') 
    },

  ]
    // landing page
  },

  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/users.vue'),
    
    children: [
      { 
        path: '/users/profile',
        component: () => import('../components/users/profile.vue') },
      { path: '/users/trainingsplans',
        component: () => import('../components/users/trainingsplans.vue') },
      { path: '/users/biometrics',
        component: () => import('../components/users/biometrics.vue') },
        { path: '/users/nutrition',
        component: () => import('../components/users/nutrition.vue') }
    ]
  },
  
  
  {
  path: '/cookbook',
  name:'Cookbook',
  component: () => import('../views/cookbook.vue'),
  
  children:[
    { 
      path: '/cookbook/recipes',
      name:'Recipes',
      component: () => import('../components/cookbook/recipes.vue') 
    },

   
      
    {
      path: '/cookbook/recipeDetails/:recipeId',
      name:'RecipeDetails',
      component: () => import('../components/cookbook/recipeDetails.vue') 
    },
    
   
    {
      path: '/cookbook/ingredients',
      component: () => import('../components/cookbook/ingredients.vue')}

  ]
  },

 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
