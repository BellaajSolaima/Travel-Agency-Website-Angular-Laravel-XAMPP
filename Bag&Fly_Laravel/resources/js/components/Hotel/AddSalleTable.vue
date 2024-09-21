<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container-fluid">
      <button  @click="visible = true">
        <i class="fa-solid fa-square-plus"></i>
        New Salle
      </button>
    </div>
  </nav>
  <form>
    <div class="card flex justify-content-center">
      <Dialog v-model:visible="visible">
        <div class="row">
          <div class="col-md-6">
            <label for="nomSalle" class="form-label">Nom de la Salle</label>
            <input type="text" class="form-control" id="nomSalle" v-model="salle.nom_Salle" />
          </div>
          <div class="col-md-6 ms-auto">
            <label for="capacite" class="form-label">Capacité</label>
            <input type="number" min="1" class="form-control" id="capacite" v-model="salle.capacité" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="etage" class="form-label">Étage</label>
            <input type="number"  class="form-control" id="etage" v-model="salle.etage" />
          </div>
        </div>
        <div v-if="salleNomErrorMessage" class="alert alert-danger">
          {{ salleNomErrorMessage }}
        </div>
        <div v-if="salleCapaciteErrorMessage" class="alert alert-danger">
          {{ salleCapaciteErrorMessage }}
        </div>
        <br />
        <button class="btn btn-outline-primary cool-button" @click="addSalle">
          Enregistrer
        </button>
        <button class="btn btn-outline-secondary cool-button" @click="cancel">
          Annuler
        </button>
      </Dialog>
    </div>
  </form>
</template>

<script setup>
import { ref, watchEffect, defineProps } from "vue";
import api from "../config/api.js";
import Dialog from "primevue/dialog";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

var salleNomErrorMessage = ref('');
var salleCapaciteErrorMessage = ref('');

const props = defineProps(["hotelid"]);
const visible = ref(false);
const salle = ref({
  nom_Salle: "",
  capacité: 1,
  etage: 0,
  hotelID: 0,
});

watchEffect(() => {
  salle.value.hotelID = props.hotelid;
});

const addSalle = async () => {
  salleNomErrorMessage.value = '';
  salleCapaciteErrorMessage.value = '';
  if (salle.value.capacité < 1 || !salle.value.capacité) {
    salleCapaciteErrorMessage.value = 'Capacité doit être supérieure à 1 !';
  }else if (!salle.value.nom_Salle) {
    salleNomErrorMessage.value = 'Ajouter un nom a votre Salle !';
  }
  try {
    await api.post("/api/salles/", salle.value);
    visible.value = false;
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

const cancel = () => {
  visible.value = false;
};
</script>

<style scoped>
button {
  background-color: #e79a3c !important;
  color: #fff !important;
  border-radius: 8px;
  padding: 10px 20px;
  margin-right: 10px;
  font-weight: bold;
}

button:hover {
  background-color: #c0392b !important;
}
</style>


