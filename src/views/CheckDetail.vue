<template>
    <div class="check-detail">
        <mt-header title="我发起的" fixed>
            <router-link to="/oa/check" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <ul v-if="user">
            <li v-for="approve in user.myapprove" :key="approve.reason">
                <div>
                    <p>{{approve.reason}}</p>
                    <p>{{approve.deadDate}}</p>
                    <p>{{approve.pName}}</p>
                    <p>{{approve.pNum}}</p>
                    <p>{{approve.pPart}}</p>
                    <p>{{approve.pPrice}}</p>
                    <p>{{approve.pSize}}</p>
                    <p>{{approve.pType}}</p>
                    <p>{{approve.payType}}</p>
                    <div>
                        <span>审批人：</span>
                        <p v-for="items in approve.checkMen" :key="items">{{approve.checkMen.indexOf(items)+1}}级审批人：{{items}}</p>
                    </div>
                    <p>{{approve.checkStatus?'已审批':'待审批'}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
name:'checkDetail',
data:()=>({
    lists:[]
}),
watch:{
    user(){
        this.lists = this.$store.state.teacherCollections
    }
},
computed:{
    user(){
        return this.$store.state.teacherCollections
    }
},
created(){
    this.$store.dispatch('getTCollections')
}
}
</script>

<style lang="scss" scoped>
ul{
    height: calc(100vh - 66px - 40px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 40px;
    li{
        border-bottom: 1px solid #ccc
    }
}
</style>
