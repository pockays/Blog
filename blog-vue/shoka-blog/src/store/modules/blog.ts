import { BlogInfo, SiteConfig } from "@/api/blogInfo/types";
import { BlogState } from "../types";

const useBlogStore = defineStore("useBlogStore", {
  state: (): BlogState => ({
    blogInfo: {
      siteConfig: {} as SiteConfig,
    } as BlogInfo,
    isShow:true as boolean,
  }),
  actions: {
    setBlogInfo(blogInfo: BlogInfo) {
      this.blogInfo = blogInfo;
    },
    setIsShow(isShow: boolean){
     this.isShow=!isShow;
    }
  },
  getters: {},
  persist: {
    key: "blog",
    storage: sessionStorage,
  },
});

export default useBlogStore;
