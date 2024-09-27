import { createApp, defineAsyncComponent } from 'vue';
import './assets/tailwind.css';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

// import TheLayout from "@/components/layout/TheLayout.vue";
// import BaseCard from "@/components/base/BaseCard.vue";
// import BaseButton from "@/components/base/BaseButton.vue";
// import BaseBadge from "@/components/base/BaseBadge.vue";
// import BaseInput from "@/components/base/BaseInput.vue";
// import BaseSpinner from "@/components/base/BaseSpinner.vue";
// import BaseModal from "@/components/base/BaseModal.vue";
// import BaseModalSpinner from "@/components/base/BaseModalSpinner.vue";

const TheLayout = defineAsyncComponent(() => import('@/components/layout/TheLayout.vue'));
const BaseCard = defineAsyncComponent(() => import('@/components/base/BaseCard.vue'));
const BaseButton = defineAsyncComponent(() => import('@/components/base/BaseButton.vue'));
const BaseBadge = defineAsyncComponent(() => import('@/components/base/BaseBadge.vue'));
const BaseInput = defineAsyncComponent(() => import('@/components/base/BaseInput.vue'));
const BaseSpinner = defineAsyncComponent(() => import('@/components/base/BaseSpinner.vue'));
const BaseModal = defineAsyncComponent(() => import('@/components/base/BaseModal.vue'));
const BaseModalSpinner = defineAsyncComponent(() => import('@/components/base/BaseModalSpinner.vue'));



const app = createApp(App);

app.use(router);
app.use(store);

app.component('the-layout', TheLayout);
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-input', BaseInput);
app.component('base-spinner', BaseSpinner);
app.component('base-modal', BaseModal);
app.component('base-modal-spinner', BaseModalSpinner);


app.mount('#app');