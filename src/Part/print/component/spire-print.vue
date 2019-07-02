<template>
    <div class="spire-box">
        <div class="spire-print">
            <div class="spire-qr">
                <qriously class="qr-code" :value="info.patientId" :size="110"/>
            </div>
            <div class="spire-content">
                <h4>东莞市厚街医院</h4>
                <aside>
                    <span>姓名:&nbsp;{{info.name}}</span>
                    <span>性别:&nbsp;{{info.sex}}</span>
                    <span>年龄:&nbsp;{{info.age}}</span>
                    <span>床号:&nbsp;{{info.bedLabel}}</span>
                </aside>
                <aside>
                    <span>住院号:&nbsp;{{info.inpNo}}</span>
                    <span>科室:&nbsp;{{info.deptName}}</span>
                </aside>
            </div>
            <div class="spire-qr">
                <qriously class="qr-code" :value="info.patientId" :size="110"/>
            </div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
.spire-box
    width 700px
    height 112px
    text-align center
    .spire-qr 
        display inline-block
        vertical-align top
        transform scale(0.5,0.5)  
    .spire-content
        display inline-block 
        margin 30px -30px 0
        h4
            font-size 14px
            color #000
        aside 
            text-align left 
            padding 2px 2px 0 2px
            span 
                font-size 12px
                color #000
                padding-right 10px
                display inline-block
                vertical-align middle
                &:last-child
                    padding-right 0
@media print
    .spire-box 
        width 55px
        height 340px 
        overflow hidden
        text-align center
        position relative
        .spire-print 
            width 110px
            height 670px
            transform scale(0.5,0.5)
            position absolute
            bottom -165px
            left -27px
            .spire-qr:first-child
                transform scale(1,1) 
                position absolute
                top 0
                left 0px
            .spire-qr:last-child
                transform scale(1,1)
                position absolute
                bottom 0
                left 0px
            .spire-content
                width 450px
                height 110px
                position absolute
                margin 0
                top 280px
                left -170px
                transform rotate(90deg)
                h4 
                    padding-top 10px
                    font-size 26px
                    color #000
                aside 
                    text-align left 
                    padding 10px 8px 0 8px
                    span 
                        font-size 20px
                        color #000
                        padding-right 10px
                        display inline-block
                        vertical-align middle
                        &:last-child
                            padding-right 0

</style>
<script>
  export default {
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {},
    computed: {
        info() {
            console.log(this.$route.query);
            return this.$route.query
        }
    }
  }
</script>