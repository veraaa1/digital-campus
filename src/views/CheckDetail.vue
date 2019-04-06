<template>
    <div class="check-detail">
        <h1>我发起的</h1>
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
                    <p>{{approve.checkStatus?'已审批':'待审批'}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
name:'checkDetail',
computed:{
    user(){
        return this.$store.state.teacherCollections?this.$store.state.teacherCollections:[]
    }
}
}
</script>

<style lang="scss" scoped>

</style>
