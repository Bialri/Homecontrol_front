
import {createRouter,createWebHashHistory} from "vue-router";
import ControlComp from "@/components/ControlComp.vue";
import HomeComp from "@/components/HomeComp.vue";
import SignInComp from "@/components/SignInComp.vue";
import SignUpComp from "@/components/SignUpComp.vue";
import ScriptComp from "@/components/scripts/ScriptComp.vue";

const routes = [
    { path: '/', component: HomeComp },
    { path: '/control', component: ControlComp },
    { path: '/signin',component: SignInComp },
    { path: '/signup',component: SignUpComp},
    { path: '/scripts',component: ScriptComp},
]

export default createRouter({
    history: createWebHashHistory(),
    routes: routes
})