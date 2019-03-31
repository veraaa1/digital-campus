<template>
    <ul>
        <li v-for="item in filterMember" :key="item.Tid">
            <router-link :to="`/contact/orgnization/${item.Tid}`"><p><span>{{item.Tname}}</span><span>{{item.TeachCareer}}</span></p></router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name:'orgnization',
    data:()=>({
        all:null
    }),
    computed:{
        user(){
            return JSON.parse(sessionStorage.getItem('userInfo'))
    },
    filterMember(){
        return this.all.filter(e=>e.TeachDepartMent == this.$route.params.org)
    }
    },
    created(){
        this.$store.dispatch('getAll')
        this.all = this.$store.state.all
    }
    
}
</script>
<style lang="scss" scoped>

</style>

