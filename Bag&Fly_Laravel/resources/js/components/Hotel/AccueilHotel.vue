<template>
 <AddaSalletable :hotelid="hotelid" />
  <div class="card">
      <DataTable :value="salles" stripedRows paginator showGridlines :rows="6" dataKey="id" :loading="isLoading">
          <Column header="Nom Salle" field="nom_Salle"></Column>
          <Column header="Capacité" field="capacité" sortable></Column>
          <Column header="Étage" field="etage" sortable></Column>
          <Column field="id" header="Actions" style="min-width: 12rem;">
              <template #body="val">
                  <div class="d-flex">
                      <!-- Your components for salle actions here -->
                      <EditSalleTable :salle="val.data" />
                      <button type="button" class="btn btn-warning rounded-circle" @click="deletesalle(val.data.id)">
                          <img src="/images/delete.png" style="width: 40px; height: 40px;" alt="My Image" />
                      </button>
                      <AddEventTable :salle="val.data"/>
                  </div>
              </template>
          </Column>
      </DataTable>
  </div>
</template>

<script setup>
 
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import { ref, onMounted } from "vue";
  import AddaSalletable from './AddSalleTable.vue';
  import EditSalleTable from './EditSalleTable.vue';
  import AddEventTable from './AddEventTable.vue';
  import { useRouter } from "vue-router";
  import store from '../../store';

  const router = useRouter();
  let hotelid = ref({});
  var salles = ref([]);
  const isLoading = ref(true);
  
  const getSalles = async () => {
      try {
          const response = await api.get("/api/salles");
          const sallesData = response.data;
          salles.value = sallesData.filter(salle => salle.hotelID == hotelid.value);
          isLoading.value = false;
      } catch (error) {
          console.error("Error fetching salles:", error);
      }
  };

  const gethotel = async () => {
      try {
          const response = await api.get("/api/hotels");
          const hotels = response.data;
          const user = store.state.Userstore.user[0].data;
          hotelid.value = hotels.find((hotel) => hotel.Email === user.Email).id;
      } catch (error) {
          console.error("Error fetching hotels:", error);
      }
  };
 
  onMounted(async () => {
    if (store.state.Userstore.user[0] == null) {
      router.push({ name: 'accueil'});
    }
    await gethotel();
    console.log(hotelid.value);
    getSalles();
});


  const deletesalle = async (id) => {
      if (window.confirm("Etes-vous sûr de vouloir supprimer ?")) {
          try {
              await api.delete(`/api/salles/${id}`);
              getSalles();
          } catch (error) {
              console.log(error);
          }
      }
  };
</script>

<style lang="css" scoped></style>
