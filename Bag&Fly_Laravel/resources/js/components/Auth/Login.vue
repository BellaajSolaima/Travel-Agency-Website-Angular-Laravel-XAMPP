<template>
  <div class="container mt-5">
      <div class="d-flex justify-content-center">
          <div class="card" style="width: 50%;">
              <div class="card-body">
                  <h2 class="card-title text-center mb-4">Login</h2>

                  <form @submit.prevent="login" class="text-center">
                      <div class="mb-3 row">
                          <label for="email" class="form-label col-md-3">Email</label>
                          <div class="col-md-9">
                              <input type="email" class="form-control" id="email" v-model="email" required />
                          </div>
                      </div>

                      <div class="mb-3 row">
                          <label for="password" class="form-label col-md-3">Password</label>
                          <div class="col-md-9">
                              <input type="password" class="form-control" id="password" v-model="password" required />
                          </div>
                      </div>

                      <div class="mb-3 row">
                          <label class="form-label col-md-3">Login as:</label>
                          <div class="col-md-6">
                              <div class="form-check form-check-inline">
                                  <input type="radio" id="hotel" value="hotel" v-model="userType" class="form-check-input" required />
                                  <label for="hotel" class="form-check-label">Hotel</label>
                              </div>

                              <div class="form-check form-check-inline">
                                  <input type="radio" id="client" value="client" v-model="userType" class="form-check-input" required />
                                  <label for="client" class="form-check-label pl-2">Client</label>
                              </div>
                          </div>
                      </div>
                      <div v-if="clientEmailErrorMessage" class="alert alert-danger">
                        {{ clientEmailErrorMessage }}
                      </div>
                      <div v-if="hotelEmailErrorMessage" class="alert alert-danger">
                        {{ hotelEmailErrorMessage }}
                      </div>
                      <button type="submit" class="btn btn-outline-primary"><i class="fa-solid fa-floppy-disk"></i>Login</button>
                      <button type="button" class="btn btn-outline-primary" @click="cancel"><i class="fa-solid fa-floppy-disk"></i>Cancel</button>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
  import api from "../config/api.js";
  import { ref, onMounted } from "vue";
  import { MD5 } from "crypto-js";
  import { useRouter } from "vue-router";
  import store from '../../store'

  onMounted(() => {
    store.commit('Userstore/logOut');
  });
  

  const router = useRouter();
  var clientEmailErrorMessage = ref('');
  var hotelEmailErrorMessage = ref('');

          const clients = ref([]);
          const hotels = ref([]);
          var clientVal = ref({});
          var hotelVal = ref({});
          const userType = ref("client"); 

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
                  console.log(error);
              }
          };

          const login = async () => {
          clientEmailErrorMessage.value = '';
          hotelEmailErrorMessage.value = '';
              if (userType.value === "client") {
                  await getclients();
                  const hashedPassword = MD5(password.value).toString();
                  const userExists = clients.value.find((client) => {
                    if(client.Email === email.value && client.Password === hashedPassword){
                        clientVal=client;
                    }
                    return client.Email === email.value && client.Password === hashedPassword;
                  });
                  if (userExists) {
                      console.log("Client login successful");
                      store.commit('Userstore/authentificateUser', clientVal);
                      router.push({ name: "client" });
                  } else {
                      console.log("Invalid client login");
                      clientEmailErrorMessage.value = 'Email ou Password incorrecte !';
                  }
              } else {
                  await gethotels();
                  const hashedPassword = MD5(password.value).toString();
                  const hotelExists = hotels.value.find((hotel) => {
                    if(hotel.Email === email.value && hotel.Password === hashedPassword){
                        hotelVal=hotel;
                    }
                    return hotel.Email === email.value && hotel.Password === hashedPassword;
                  });
                  if (hotelExists) {
                      console.log("Hotel login successful");
                      store.commit('Userstore/authentificateHotel', hotelVal);
                      console.log(store.state.Userstore.user[0].data.id);
                      router.push({ name: "hotel" });
                  } else {
                      console.log("Invalid hotel login");
                      hotelEmailErrorMessage.value = 'Email ou Password incorrecte !';
                  }
              }
          };
</script>

<style scoped></style>
