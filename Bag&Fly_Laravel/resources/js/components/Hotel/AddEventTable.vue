<template>
    <div class="container-fluid">
      <button  @click="visible = true">
        <i class="fa-solid fa-square-plus"></i>
            <img src="/images/event.png" style="width: 50px; height: 40px;" alt="Edit Image" />
      </button>
    </div>
  <Dialog v-model:visible="visible">
    <div class="row">
      <div class="col-md-6">
        <label for="photo" class="form-label">Photo</label>
        <file-pond name="test" ref="pond" class-name="my-pond" label-idle="Drop files here..." allow-multiple="false" accepted-file-types="image/jpeg, image/png" v-bind:files="myFiles" :server="serverOptions()" />
      </div>
      <div class="col-md-6 ms-auto">
        <label for="Titre" class="form-label">Titre</label>
        <input type="text" class="form-control" id="Titre" v-model="eventRef.Titre" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="CapacitéEvent" class="form-label">Capacité Event</label>
        <input type="number" min="1" class="form-control" id="CapacitéEvent" v-model="eventRef.CapacitéEvent" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="DateDebut" class="form-label">Date Début</label>
        <input type="datetime-local" class="form-control" id="DateDebut" v-model="eventRef.DateDebut" />
      </div>
      <div class="col-md-6 ms-auto">
        <label for="DateFin" class="form-label">Date Fin</label>
        <input type="datetime-local" class="form-control" id="DateFin" v-model="eventRef.DateFin" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="Durée" class="form-label">Durée</label>
        <input type="text" class="form-control" id="Durée" v-model="eventRef.Durée" />
      </div>
      <div class="col-md-6 ms-auto">
        <label for="PrixTicket" class="form-label">Prix Ticket</label>
        <input type="number" min="0" class="form-control" id="PrixTicket" v-model="eventRef.PrixTicket" />
      </div>
    </div>
    <div v-if="eventDateErrorMessage" class="alert alert-danger">
      {{ eventDateErrorMessage }}
    </div>
    <div v-if="eventCapaciteErrorMessage" class="alert alert-danger">
      {{ eventCapaciteErrorMessage }}
    </div>
    <div v-if="eventPrixErrorMessage" class="alert alert-danger">
      {{ eventPrixErrorMessage }}
    </div>
    <div v-if="eventPhotoErrorMessage" class="alert alert-danger">
      {{ eventPhotoErrorMessage }}
    </div>
    <div v-if="eventTitreErrorMessage" class="alert alert-danger">
      {{ eventTitreErrorMessage }}
    </div>
    <div v-if="eventCompareErrorMessage" class="alert alert-danger">
      {{ eventCompareErrorMessage }}
    </div>
    <br />
    <button class="btn btn-outline-primary cool-button" @click="addEvent">
      Enregistrer
    </button>
    <button class="btn btn-outline-secondary cool-button" @click="cancel">
      Annuler
    </button>
  </Dialog>
</template>

<script setup>
   import { ref, onMounted } from "vue";
   import api from "../config/api.js";
   import vueFilePond from "vue-filepond";
   import "filepond/dist/filepond.min.css";
   import Dialog from "primevue/dialog";
   import FilePondPluginImagePreview from "filepond-plugin-image-preview";
   import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
   import axios from "axios";

   var eventDateErrorMessage = ref('');
   var eventCapaciteErrorMessage = ref('');
   var eventPrixErrorMessage = ref('');
   var eventPhotoErrorMessage = ref('');
   var eventTitreErrorMessage = ref('');
   var eventCompareErrorMessage = ref('');
   const FilePond = vueFilePond(FilePondPluginImagePreview);
   const myFiles = ref([]);

const props = defineProps(["salle"]);
const salleCopy = ref({});

const visible = ref(false);
const eventRef = ref({
  photo: "",
  Titre: "",
  CapacitéEvent: 0,
  CapacitéRestante: 0,
  DateDebut: "",
  DateFin: "",
  Durée: "",
  PrixTicket: 0,
  salleID: 0,
});

const addEvent = async () => {
  eventDateErrorMessage.value = '';
  eventCapaciteErrorMessage.value = '';
  eventPrixErrorMessage.value = '';
  eventPhotoErrorMessage.value = '';
  eventTitreErrorMessage.value = '';
  eventCompareErrorMessage.value = '';

  if (new Date(eventRef.value.DateDebut) >= new Date(eventRef.value.DateFin) || !eventRef.value.DateFin || !eventRef.value.DateDebut) {
    eventDateErrorMessage.value = 'Date fin doit être après Date Début !';
  } else if (eventRef.value.CapacitéEvent < 1 || !eventRef.value.CapacitéEvent) {
    eventCapaciteErrorMessage.value = 'Capacité doit être supérieure à 1 !';
  } else if (eventRef.value.PrixTicket < 1 || !eventRef.value.PrixTicket) {
    eventPrixErrorMessage.value = 'Prix Ticket doit être supérieur à 1 !';
  } else if (!eventRef.value.photo ) {
    eventPhotoErrorMessage.value = 'Il faut ajouter une photo a ton Event !';
  } else if (!eventRef.value.Titre ) {
    eventTitreErrorMessage.value = 'Il faut ajouter un titre a ton Event !';
  } else if (!eventRef.value.CapacitéEvent < props.salle.capacité) {
    eventTitreErrorMessage.value = 'La capacité doit etre inferieur a celle de la salle '+props.salle.capacité+" !";
  } else {
    try {
      eventRef.value.salleID = props.salle.id;
      console.log(eventRef.value);
      await api.post("/api/events/", eventRef.value);

      visible.value = false;
    } catch (error) {
      console.error("Error adding event:", error);
    }
  }
};


const cancel = () => {
  visible.value = false;
};

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

const serverOptions = () => {
        console.log("server pond");
        return {
            process: (fieldName, file, metadata, load, error, progress, abort) => {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "GLID5IIT");
                data.append("cloud_name", "esps");
                data.append("public_id", file.name);
                axios
                    .post("https://api.cloudinary.com/v1_1/esps/upload", data)
                    .then((response) => response.data)
                    .then((data) => {
                        console.log(data);
                        eventRef.value.photo = data.url;
                        load(data);
                    })
                    .catch((error) => {
                        console.error("Error uploading file:", error);
                        error("Upload failed");
                        abort();
                    });
            },
        };
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