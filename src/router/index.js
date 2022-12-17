import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GalleryView from "../views/GalleryView.vue";
import TextSearchView from "../views/TextSearchView.vue";
import ImageSearchView from "../views/ImageSearchView.vue";
import PeopleView from "../views/PeopleView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/gallery/:category",
      name: "gallery",
      component: GalleryView,
    },
    {
      path: "/text-search",
      name: "textSearch",
      component: TextSearchView,
    },
    {
      path: "/image-search",
      name: "imageSearch",
      component: ImageSearchView,
    },
    {
      path: "/people-album",
      name: "peopleAlbum",
      component: PeopleView,
    },
  ],
});

export default router;
