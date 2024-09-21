<template>
    <div class="container mt-5">
      <div class="d-flex justify-content-center">
        <div class="card" style="width: 50%;">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Register</h2>
  
            <div class="text-center mb-3">
              <button class="btn btn-outline-primary" @click="showForm('client')">Client</button>
              <button class="btn btn-outline-primary" @click="showForm('hotel')">Hotel</button>
            </div>
  
            <!-- Client Registration Form -->
            <form v-if="registrationType == 'client'" @submit.prevent="registerClient" class="text-center">
              <div class="mb-3 row">
                <label for="emailClient" class="form-label col-md-3">Email</label>
                <div class="col-md-9">
                  <input type="email" class="form-control" id="emailClient" v-model="emailClient" required />
                </div>
              </div>
              <div v-if="clientEmailErrorMessage" class="alert alert-danger">
                {{ clientEmailErrorMessage }}
              </div>
              <div class="mb-3 row">
                <label for="passwordClient" class="form-label col-md-3">Password</label>
                <div class="col-md-9">
                  <input type="password" class="form-control" id="passwordClient" v-model="passwordClient" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="cin" class="form-label col-md-3">Cin</label>
                <div class="col-md-9">
                  <input type="number" class="form-control" id="cin" v-model="cin" required />
                </div>
              </div>
              <div v-if="clientCinErrorMessage" class="alert alert-danger">
                {{ clientCinErrorMessage }}
              </div>
              <div class="mb-3 row">
                <label for="nomClient" class="form-label col-md-3">Nom Client</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="nomClient" v-model="nomClient" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="adressClient" class="form-label col-md-3">Adresse Client</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="adressClient" v-model="adressClient" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="DateNais" class="form-label col-md-3">Date de Naissance</label>
                <div class="col-md-9">
                  <input type="date" class="form-control" id="DateNais" v-model="dateNais" required />
                </div>
              </div>
              <button type="submit" class="btn btn-outline-primary">Register Client</button>
            </form>
  
            <!-- Hotel Registration Form -->
            <form v-else-if="registrationType == 'hotel'" @submit.prevent="registerHotel" class="text-center">
              <div class="mb-3 row">
                <label for="emailHotel" class="form-label col-md-3">Email</label>
                <div class="col-md-9">
                  <input type="email" class="form-control" id="emailHotel" v-model="emailHotel" required />
                </div>
              </div>
              <div v-if="hotelEmailErrorMessage" class="alert alert-danger">
                {{ hotelEmailErrorMessage }}
              </div>
              <div class="mb-3 row">
                <label for="passwordHotel" class="form-label col-md-3">Password</label>
                <div class="col-md-9">
                  <input type="password" class="form-control" id="passwordHotel" v-model="passwordHotel" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="nomHotel" class="form-label col-md-3">Nom Hotel</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="nomHotel" v-model="nomHotel" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="adressHotel" class="form-label col-md-3">Adresse Hotel</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="adressHotel" v-model="adressHotel" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="nbEtoile" class="form-label col-md-3">Nombre d'étoiles</label>
                <div class="col-md-9">
                  <input type="number" class="form-control" id="nbEtoile" v-model="nbEtoile" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="matriculeFiscale" class="form-label col-md-3">Matricule Fiscale</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" id="matriculeFiscale" v-model="matriculeFiscale" required />
                </div>
              </div>
              
              <div v-if="hotelMatErrorMessage" class="alert alert-danger">
                {{ hotelMatErrorMessage }}
              </div>
              <div class="mb-3 row">
                <label for="villeID" class="form-label col-md-3">Ville ID</label>
                <div class="col-md-9">
                  <input type="number" class="form-control" id="villeID" v-model="villeID" required />
                </div>
              </div>
  
              <button type="submit" class="btn btn-outline-primary">Register Hotel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import api from "../config/api.js";
    import { ref, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import store from '../../store'


    onMounted(() => {
    store.commit('Userstore/logOut');
  });

    const router = useRouter();

  var clientEmailErrorMessage = ref('');
  var hotelEmailErrorMessage = ref('');
  var clientCinErrorMessage = ref('');
  var hotelMatErrorMessage = ref('');

  const registrationType = ref('client');

  const emailClient = ref('');
  const passwordClient = ref('');
  const cin = ref('');
  const nomClient = ref('');
  const adressClient = ref('');
  const dateNais = ref('');

  const emailHotel = ref('');
  const passwordHotel = ref('');
  const nomHotel = ref('');
  const adressHotel = ref('');
  const nbEtoile = ref('');
  const matriculeFiscale = ref('');
  const photo = ref('aa');

  const clients = ref([]);
  const hotels = ref([]);

  var client = ref({});
  var hotel = ref({});

  const getclients = async () => {
    try {
      const res = await api.get("/api/clients");
      clients.value = res.data;
    } catch (error) {
      console.error("Error in getclients:", error);
    }
  };
  const gethotels = async () => {
    try {
      const res = await api.get("/api/hotels");
      hotels.value = res.data;
    } catch (error) {
      console.error("Error in gethotels:", error);
    }
  };

  const addClient = async () => {
    try {
          client = {
            Cin: cin.value,
            nomClient: nomClient.value,
            adressClient: adressClient.value,
            DateNais: dateNais.value,
            Email: emailClient.value,
            Password: passwordClient.value,
        };
        await api.post("/api/clients/", client);
    } catch (error) {
        console.error("Error adding client:", error);
    }
};

    const addHotel = async () => {
        try {
            hotel = {
                Email: emailHotel.value,
                Password: passwordHotel.value,
                nomHotel: nomHotel.value,
                adress: adressHotel.value,
                nbEtoile: nbEtoile.value,
                MatriculeFiscale: matriculeFiscale.value,
                villeID: villeID.value,
                photo: 'aa'
            };
            await api.post("/api/hotels/", hotel);
        } catch (error) {
            console.error("Error adding hotel:", error);
        }
   };

  const showForm = (type) => {
    registrationType.value = type;
  };
  
  const registerClient = async () => {
    clientEmailErrorMessage.value = '';
    clientCinErrorMessage.value='';
    await getclients();
    const userExists = clients.value.find((client) => {
      if (client.Email == emailClient.value){
        clientEmailErrorMessage.value="Email deja existant !";
      }
      if(client.Cin == cin.value){
        clientCinErrorMessage.value="Cin deja existant !";
      }
      return client.Email == emailClient.value || client.Cin == cin.value;
    });
    if (!userExists) {
        console.log("Client register successful");
        addClient();
        store.commit('Userstore/authentificateUser', client);
        router.push({ name: "client" });
    } else {
        console.log("Invalid client register");
    }
  };
  
  const registerHotel = async () => {
    hotelEmailErrorMessage.value = '';
    hotelMatErrorMessage.value ='';
    await gethotels();
    const userExists = hotels.value.find((hotel) => {
      if(hotel.Email == emailHotel.value){
        hotelEmailErrorMessage.value="Hotel deja existant !";
      }
      if(hotel.MatriculeFiscale == matriculeFiscale.value){
        hotelMatErrorMessage.value="Hotel deja existant !";
      }
      return hotel.Email == emailHotel.value || hotel.MatriculeFiscale == matriculeFiscale.value;
    });
    if (!userExists) {
        console.log("hotel register successful");
        addHotel();
        store.commit('Userstore/authentificateHotel', hotel);
        router.push({ name: "hotel" });
    } else {
        console.log("Invalid hotel register");
    }
  };
  </script>
  