import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";

import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserPage from "../pages/UserPage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。


const routes = [
    {path: '/', component: Index},
    {path: '/team', title: '找队伍', component: Team},
    {path: '/user', title:'用户信息',component: UserPage},
    {path: '/search',title:'找伙伴', component: SearchPage},
    {path: '/user/edit', component: UserEditPage},
    {path: '/user/list', component: SearchResultPage},
    {path: '/user/login', component: UserLoginPage},
    {path: '/user/update', component: UserUpdatePage},
    {path: '/user/team/join', component: UserTeamJoinPage},
    {path: '/user/team/create', component: UserTeamCreatePage},
    {path: '/team/add', component: TeamAddPage},
    {path: '/team/update', component: TeamUpdatePage}
]
export default routes;
