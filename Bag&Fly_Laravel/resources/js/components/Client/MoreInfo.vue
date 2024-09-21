<template>
  <Dialog v-model:visible="visible">
    <Card style="width: 25em;">
      <template #header>
        <h2 style="color: #4CAF50;">🎉 Congratulations! 🎉</h2>
      </template>
      <template #content>
        <p>We're thrilled to inform you that your reservation is confirmed! 🌟</p>
        <p>
          Thank you for choosing our services. We look forward to providing you with an amazing experience.
        </p>
      </template>
      <template #footer>
        <button @click="closeDialogAndRedirect"> Return Home ! </button>
      </template>
    </Card>
  </Dialog>

  <Dialog v-model:visible="sorryVisible">
  <Card style="width: 25em;">
    <template #header>
      <h2 style="color: red;">Sorry! 😔</h2>
    </template>
    <template #content>
      <p>Sorry, no more places to book. Please try again later.</p>
    </template>
    <template #footer>
      <button @click="closeDialogAndRedirect"> Return Home! </button>
    </template>
  </Card>
</Dialog>


  <div class="more-info">
    <h1>{{ eventObject.Titre || 'Event Title Not Available' }}</h1>

    <div class="info-section">
      <h2>Event Details</h2>
      <p><strong>Capacity:</strong> {{ `${eventObject.CapacitéRestante} / ${eventObject.CapacitéEvent} ` || 'N/A' }}</p>
      <p><strong>Date Start:</strong> {{ eventObject.DateDebut || 'N/A' }}</p>
      <p><strong>Date End:</strong> {{ eventObject.DateFin || 'N/A' }}</p>
      <p><strong>Duration:</strong> {{ eventObject.Durée || 'N/A' }}</p>
      <p><strong>Ticket Price:</strong> {{ eventObject.PrixTicket + " DT" || 'N/A' }}</p>
    </div>

    <div class="info-section">
      <h2>Salle Information</h2>
      <p><strong>Nom du Salle:</strong> {{ salleObject.nom_Salle || 'N/A' }}</p>
    </div>

    <div class="info-section">
      <h2>Hotel Information</h2>
      <p><strong>Nom d'Hotel:</strong> {{ HotelObject.nomHotel || 'N/A' }}</p>
    </div>

    <p><strong>Total Amount:</strong> {{ calculateTotalAmount() }}</p>
    <input v-model="numTickets" type="number" placeholder="Number of Tickets" />

    <button @click="reserveEvent" :disabled="!eventObject.id">Reserve Now</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../config/api.js';
import Dialog from "primevue/dialog";
import Card from "primevue/card";
import store from '../../store'


const router = useRouter();
var visible = ref(false);
var sorryVisible = ref(false);
const eventId = ref(null);
const eventObject = ref({});
const salleObject = ref({});
const HotelObject = ref({});
const numTickets = ref(1);
var totalAmount=0;
const getThisEvent = async () => {
  try {
    eventObject.value = (await api.get(`/api/events/${eventId.value}`)).data;
    salleObject.value = (await api.get(`/api/salles/${eventObject.value.salleID}`)).data;
    HotelObject.value = (await api.get(`/api/hotels/${salleObject.value.hotelID}`)).data;
  } catch (error) {
    console.error(error);
  }
};

const calculateTotalAmount = () => {
   totalAmount = numTickets.value * eventObject.value.PrixTicket;
  return totalAmount.toFixed(2);
};

onMounted(async () => {
  if (store.state.Userstore.user[0] == null) {
      router.push({ name: 'accueil'});
  }
  eventId.value = useRouter().currentRoute.value.params.event;
  getThisEvent();
});
const modifierEventAjoutRes = async () => {
        api.put(`/api/events/${eventObject.value.id}`, {"CapacitéRestante":eventObject.value.CapacitéRestante-numTickets.value})
            .catch((error) => {
                console.error("There was an error!", error);
            });
            try {
              const reservation = ref({
                nbPlaces: numTickets.value,
                PrixTotal: parseFloat(totalAmount.toFixed(2)),
                eventID: eventObject.value.id,
                clientID: store.state.Userstore.user[0].data.id,
              });
              await api.post("/api/reservations/", reservation.value);
            } catch (error) {}
    };
const reserveEvent = async () => {
  if (window.confirm("Vous allez reserver "+numTickets.value+" Ticket à "+totalAmount.toFixed(2)+"DT")) {
    eventObject.value = (await api.get(`/api/events/${eventId.value}`)).data;
    if (eventObject.value.CapacitéRestante>=numTickets.value){
      visible.value = true;
      modifierEventAjoutRes();
    }else{
      sorryVisible.value=true;
    }
  }
};
const closeDialogAndRedirect = () => {  
  visible.value = false;
  console.log("redirecting home ");
  router.push({ name: "client" });
};
</script>

<style scoped>
.more-info {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.info-section {
  margin-top: 20px;
  
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
