<template>
    <div class="card">
      <DataTable :value="events" stripedRows paginator showGridlines :rows="2" dataKey="id" :loading="isLoading">
        <Column header="Image">
          <template #body="{ data }">
            <img :src="data.photo" :alt="data.nomHotel" class="shadow-4" width="265" />
          </template>
        </Column>
        <Column field="Titre" header="Title"></Column>
        <Column header="Capacité" :field="{ field: 'CapacitéEvent', header: 'Capacité' }" style="min-width: 12rem;">
          <template #body="{ data }">
            {{ data.CapacitéRestante }} /{{ data.CapacitéEvent }}  
          </template>
        </Column>
        <Column header="Date Debut" field="DateDebut"></Column>
        <Column header="Date Fin" field="DateFin"></Column>
        <Column header="Durée" field="Durée"></Column>
        <Column header="PrixTicket" field="PrixTicket"></Column>
        <Column header="Hotel Name">
          <template #body="{ data }">
            {{ data.hotelName }}
          </template>
        </Column>
        <Column header="Actions" field="id" style="min-width: 12rem;">
          <template #body="val">
            <div class="d-flex">
              <button type="button" @click="redirectStade(val.data)">
                <img src="/images/reserve2.png" style="width: 70px; height: 70px;" alt="My Image" />
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </template>
  
  <script setup>
  import api from "../config/api.js";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import store from '../../store'

  const router = useRouter();
  const events = ref([]);
  const isLoading = ref(true);
  const getevents = async () => {
  try {
    const res = await api.get("/api/events");
    
    const eventPromises = res.data.map(async (event) => {
      const salleRes = await api.get(`/api/salles/${event.salleID}`);
      const hotelRes = await api.get(`/api/hotels/${salleRes.data.hotelID}`);
      event.salleName = salleRes.data.nom_Salle;
      event.hotelName = hotelRes.data.nomHotel;
      return event;
    });

    const updatedEvents = await Promise.all(eventPromises);
    events.value = updatedEvents;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};
  onMounted(() => {
    getevents();
    if (store.state.Userstore.user[0] == null) {
      router.push({ name: 'accueil'});
    }
  });
  
  const redirectStade = async (event) => {
    console.log("event id :"+event.id);
  router.push({ name: 'moreinfo', params: { event: event.id } });
};


  </script>
  
  <style lang="css" scoped></style>
  