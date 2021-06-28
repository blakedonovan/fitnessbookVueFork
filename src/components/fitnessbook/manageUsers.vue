

<template>
<div>
  {{title}}
    <b-container>
<b-row>

<b-table

 striped 
 
 :items="allUsers"
 :fields="fields"
 table-variant="info"
 >
  <template v-slot:cell(status)="row">
   
   
        <b-button
        v-model="row.item.status"
        :value="row.item.status"
      
         variant="warning"
        
           >
           {{row.item.status}}
           </b-button>
 
    
  
      </template>
 </b-table>

</b-row>
    </b-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
   
  mounted () {
this.getUserList()
  },

  computed:{

  

  }, 
  methods: {

  async  getUserList(){
var getUsers= 'http://192.168.178.65:8000/api/profileList';
      
      await axios.get(getUsers)

                 .then((res) => {
              
              this.allUsers= res.data
            
        
   
   
                 })
                 .catch((error) => {
                   console.log(error)
                 
                 }).finally(() => {
                     
                 });

    }
  },
  props: {

   
  },
  watch: {
    
  },
data(){

return{

    title:'Benutzer Verwaltung',
    allUsers:[],
    fields:[
  
  {key:'cb_userid',label:'Mnummer'},
  {key:'user_name',label:'Name',tdClass: 'widthEl'},
  {key:'email',label:'Email',tdClass: 'widthEl'},
  {key:'birthday',label:'Geburtstag',tdClass: 'widthEl'},
  {key:'size',label:'Größe'},
  {key:'join_date',label:'Beitritt'},
  {key:'status',label:'Status'},
],
activeClass:"variant=danger"
   
}
}
}
</script>

