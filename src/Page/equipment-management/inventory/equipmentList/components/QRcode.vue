<template>
  <div class="information" :style="sizeStyle">
    {{allSize}}
    <div class="item info">设备信息</div>
    <img src="./card.jpg" alt="">
    <div class="item">{{information.name}} <span>（{{information.id}}）</span> </div>
  </div>
</template>

<script>

  export default {
    props: {
      allSize: {
        default: '5*8',
        type: String
      },
      information: {
        default: {},
        type: Object
      },
      printAll: {
        default: '',
        type: String
      }
    },
    data() {
      return {
        // information: {
        //   name: '',
        //   id: '',
        //   size: '',
        // }
      };
    },
    computed: {
      sizeStyle() {
        return this.getSizeStyle(this.printAll ? this.allSize : this.information.size)
      },
    },

    methods: {
      getSizeStyle(size) {
        if (size) {
          let w = size.split('*')[0];
          let h = size.split('*')[1] - 0.01;
          return { width: `${w}cm`, height: `${h}cm`}
        } else {
          return { width: '5cm', height: '7.99cm'}
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
/* .content{
  display: flex;
  flex-direction: column;
  align-items: center;
} */
.information {
  text-align: center;
  img{
    width: 100%;
  }
  .item{
    padding: 10px 0;
  }
  .info {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>