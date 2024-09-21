<template>
  <button type="button" class="btn btn-warning rounded-circle" @click="visible = true">
    <img src="/images/edit.png" style="width: 40px; height: 40px;" alt="Edit Image" />
  </button>
  <form>
    <div class="card flex justify-content-center">
      <Dialog v-model:visible="visible">
        <div class="row">
          <div class="col-md-6">
            <label for="nomSalle" class="form-label">Nom de la Salle</label>
            <input type="text" class="form-control" id="nomSalle" v-model="salleCopy.nom_Salle" />
          </div>
          <div class="col-md-6 ms-auto">
            <label for="capacite" class="form-label">Capacité</label>
            <input type="text" class="form-control" id="capacite" v-model="salleCopy.capacité" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="etage" class="form-label">Étage</label>
            <input type="text" class="form-control" id="etage" v-model="salleCopy.etage" />
          </div>
        </div>
        <br />
        <button type="submit" class="btn btn-outline-primary" @click="modifierSalle">
          <i class="fa-solid fa-floppy-disk"></i>Enregistrer
        </button>
        <button type="button" class="btn btn-outline-primary" @click="cancel">
          <i class="fa-solid fa-floppy-disk"></i>Annuler
        </button>
      </Dialog>
    </div>
  </form>
</template>

<script setup>
import api from "../config/api.js";
import { ref, onMounted, defineProps } from "vue";
import "filepond/dist/filepond.min.css";
import Dialog from "primevue/dialog";

const props = defineProps(["salle"]);
const visible = ref(false);
const salleCopy = ref({});

const loadSalle = () => {
  salleCopy.value = {
    id: props.salle.id,
    nom_Salle: props.salle.nom_Salle,
    capacité: props.salle.capacité,
    etage: props.salle.etage
  };
};

onMounted(() => {
  loadSalle();
});

const modifierSalle = () => {
  api.put(`/api/salles/${salleCopy.value.id}`, salleCopy.value)
    .then(() => {
      visible.value = false;
      window.location.reload();
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

const cancel = () => {
  visible.value = false;
};
</script>

<style scoped>
</style>
