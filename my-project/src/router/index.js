import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Board from '@/components/Board'
import Post from '@/components/Post'
import Post_new from '@/components/Post_new'
import Post_mine from '@/components/Post_mine'
import Chat from '@/components/Chat'
import Diary from '@/components/Diary'
import Diary_cal from '@/components/Diary_cal'
import Diary_detail from '@/components/Diary_detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'main'
      }
    },
    {
      path:'/login',
      name:'Login',
      component:Login,
      meta:{title:'login'}
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
      meta:{title:'register'}
    },
    {
      path: '/board',
      name: 'Board',
      component: Board,
      meta: {
        title: 'board'
      }
    },
    {
      path: '/post',
      redirect: '/post/post_new',
      name: 'Post',
      component: Post,
      children:[
        {
          path: 'post_new',
          component: Post_new,
          meta: {
            title: 'post',
            sub: 'post_new'
          }
        },
        {
          path: 'post_mine',
          component: Post_mine,
          meta: {
            title: 'post',
            sub: 'post_mine'
          }
        }
      ]
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: {
        title: 'chat'
      }
    },
    {
      path: '/diary',
      redirect: '/diary/diary_cal',
      name: 'Diary',
      component: Diary,
      children:[
        {
          path: 'diary_cal',
          component: Diary_cal,
          meta: {
            title: 'diary',
            sub: 'diary_cal'
          }
        },
        {
          path: 'diary_detail',
          component: Diary_detail,
          meta: {
            title: 'diary',
            sub: 'diary_detail'
          }
        }
      ]
    }
  ]
})
