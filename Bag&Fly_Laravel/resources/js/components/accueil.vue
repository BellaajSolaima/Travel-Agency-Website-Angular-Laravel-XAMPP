<template>
   <div class="creative-welcome">
     <div class="container">
       <div class="row">
         <div class="col-md-8 offset-md-2 text-center">
           <div class="welcome-header">
             <h1 class="display-3 mb-4">Bienvenue sur notre site</h1>
             <p class="lead">
               Découvrez une expérience unique en explorant notre site coloré et dynamique.
             </p>
           </div>
           <div class="welcome-animation">
             <img src="/images/welcome.png" alt="Welcome Animation" />
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 <script>
 export default {
   mounted() {
     console.log('Component mounted.')
   }
 }
 </script>
 
 <style>
 body {
   margin: 0;
   font-family: 'Arial', sans-serif;
   background: linear-gradient(45deg, #ff8c00 0%, #ff0080 100%); /* Single color stop for a smooth transition */
   color: #fff; /* White text color */
   height: 100vh; /* Set the height to 100% of the viewport */
   overflow: hidden; /* Hide overflow to prevent scrollbar */
 }
 
 .creative-welcome {
   padding: 60px 0; /* Add padding for better spacing */
 }
 
 .welcome-header {
   animation: fadeInUp 1s ease-in-out; /* Fade-in animation for the header */
 }
 
 .display-3 {
   font-size: 3rem; /* Larger font size for the heading */
 }
 
 .lead {
   font-size: 1.5rem; /* Larger font size for lead text */
   margin-bottom: 20px;
 }
 
 .welcome-animation img {
   width: 100%;
   max-width: 400px; /* Set a maximum width for the animation */
   margin-top: 30px; /* Add some spacing between text and animation */
   animation: bounce 2s infinite; /* Bouncing animation for the image */
 }
 
 @keyframes fadeInUp {
   from {
     opacity: 0;
     transform: translateY(20px);
   }
   to {
     opacity: 1;
     transform: translateY(0);
   }
 }
 
 @keyframes bounce {
   0%, 20%, 50%, 80%, 100% {
     transform: translateY(0);
   }
   40% {
     transform: translateY(-20px);
   }
   60% {
     transform: translateY(-10px);
   }
 }
 </style>
 