import Accueil from "./components/accueil.vue";
import Login from "./components/Auth/Login.vue";
import Register from "./components/Auth/Register.vue";
import AccueilClient from "./components/Client/AccueilClient.vue";
import AccueilHotel from "./components/Hotel/AccueilHotel.vue";
import Moreinfo from "./components/Client/MoreInfo.vue";

export const routes = [
    {
        name: "accueil",
        path: "/",
        component: Accueil,
    },
    {
        name: "login",
        path: "/login",
        component:Login,
    },
    {
        name: "register",
        path: "/register",
        component: Register,
    },
    {
        name: "client",
        path: "/client",
        component: AccueilClient,
    },
    {
        name: "moreinfo",
        path: "/moreinfo/:event",
        component: Moreinfo,
    },
    {
        name: "hotel",
        path: "/hotel",
        component: AccueilHotel,
    },
    
];
