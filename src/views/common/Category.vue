<template>
  <div>
    <el-tree
        node-key="catId"
        :data="menus"
        :props="defaultProps"
        ref="menuTree"
        @node-click="nodeclick">

    </el-tree>
  </div>
</template>

<script>


/**
 *
 * 向父组件传递信息
 * this.$emit("tree-node-click", data, node, component)
 */
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {getProductCategory} from "@/api";

export default {
  //import引入的组件需要注入到对象中才能使用",
  components: {},
  data() {
    //这里存放数据",
    return {
      menus: [],
      expandedKey: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
    };
  },
  //监听属性 类似于data概念",
  computed: {},
  //监控data中的数据变化",
  watch: {},
  //方法集合",
  methods: {
    getMenus() {
      getProductCategory({params: {}}).then(({data}) => {
        // console.log(data)
        // 打印完整返回str
        // console.log(JSON.stringify(data))
        // 渲染数据
        this.menus = data.data
      })
    },
    nodeclick(data, node, component){
      // console.log("子组件category的节点被点击", data, node, component)
      // 向父组件发送事件
      this.$emit("tree-node-click", data, node, component)
    }
  },
  //生命周期 - 创建之前",数据模型未加载,方法未加载,html模板未加载
  beforeCreate() {
  },

  //生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created() {
    this.getMenus()
  },
  //生命周期 - 挂载之前",html模板未渲染
  beforeMount() {

  },

  //生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
  mounted() {

  },

  //生命周期 - 更新之前",数据模型已更新,html模板未更新
  beforeUpdate() {

  },
  //生命周期 - 更新之后",数据模型已更新,html模板已更新
  updated() {

  },
  //生命周期 - 销毁之前",
  beforeDestroy() {

  },
  destroyed() {

  },
  //生命周期 - 销毁完成",
  //如果页面有keep-alive缓存功能，这个函数会触发",
  activated() {

  },
}


// "http-get请求": {
//   "prefix": "httpget",
//     "body": [
//     "this.\({",
//     "url: this.\\$http.adornUrl(''),",
//     "method: 'get',",
//     "params: this.\\$http.adornParams({})",
//     "}).then(({ data }) => {",
//     "})"
//   ],
//     "description": "httpGET请求"
// },
// "http-post请求": {
//   "prefix": "httppost",
//     "body": [
//     "this.\({",
//     "url: this.\\$http.adornUrl(''),",
//     "method: 'post',",
//     "data: this.\\$http.adornData(data, false)",
//     "}).then(({ data }) => { });"
//   ],
//     "description": "httpPOST请求"
// }
// }

</script>

<style scoped>

</style>
