<template>
  <div class="page-human">
    <div class="col s12 functionalities">
      <ul id="breadcrumb" class="breadcrumb">
        <li></li>
        <li>
          授信管理
        </li>
        <li>授信列表</li>
      </ul>				
    </div>

    <el-card>
      <el-form :model="searchform" ref="searchform" label-width="130px">
        <el-row type="flex" class="human-form">
          <el-col :span="8">
            <el-form-item label="姓名" prop="usrIdName">
              <el-input size="mini" v-model.trim="searchform.usrIdName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件状态" prop="status">
              <el-select size="mini" v-model="searchform.status" placeholder="请选择案件状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信生效日期" prop="effDt">
              <el-date-picker
                size="mini"
                v-model="searchform.effDt"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="授信失效日期" prop="expDt">
              <el-date-picker
                size="mini"
                v-model="searchform.expDt"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信到期时间" prop="creditLockTm">
              <el-date-picker
                size="mini"
                v-model="searchform.creditLockTm"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button size="mini" type="primary" @click="submitForm()">搜索</el-button>
              <el-button size="mini" @click="resetForm('searchform')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="human-table">
      <el-table
        :data="tableData"
        border
        size="mini"
        stripe
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="extSerialNumber" label="授信流水" align="center"></el-table-column>
        <el-table-column prop="processNo" label="案件号" align="center"></el-table-column>
        <el-table-column prop="usrIdName" label="姓名" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="godetail(scope.row.processNo,scope.row.status)"
            >{{scope.row.usrIdName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="hbUsrNo" label="和包贷用户号" align="center"></el-table-column>
        <el-table-column prop="status" label="案件状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 'U'">审核中</span>
            <span v-if="scope.row.status == 'R'">申请拒绝</span>
            <span v-if="scope.row.status == 'P'">申请通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="creditAmt" label="授信额度" align="center"></el-table-column>
        <el-table-column prop="effDt" label="授信额度生效日期" align="center"></el-table-column>
        <el-table-column prop="expDt" label="授信额度失效日期" align="center"></el-table-column>
        <el-table-column prop="creditLockTm" label="授信锁定到期时间" align="center"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="human-pagination">
        <el-pagination
          background
          style="text-align:center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.searchform.pageIndex"
          :page-sizes="[20,50,100]"
          :page-size="this.searchform.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="count"
        >
          <!--这是显示总共有多少数据-->
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      options: [
        {
          value: "U",
          label: "审核中"
        },
        {
          value: "R",
          label: "申请拒绝"
        },
        {
          value: "P",
          label: "申请通过"
        }
      ],
      searchform: {
        usrIdName: "",
        effDt: "", //授信额度生效日期
        expDt: "", //授信额度失效日期
        creditLockTm: "", //授信锁定到期时间
        status: "",
        pageIndex: 1, //初始页
        pageSize: 50 //显示当前行的条数
      },
      tableData: []
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    var data = {};
    this.load(data);
  },

  methods: {
    submitForm() {
      this.load(this.searchform);
    },
    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.getlist();
    },
    handleSizeChange(psize) {
      // 改变每页显示的条数
      this.searchform.pageSize = psize;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.searchform.pageIndex = 1;
      this.load(this.searchform);
    },

    // 初始页currentPage
    handleCurrentChange(pindex) {
      this.searchform.pageIndex = pindex;
      this.load(this.searchform);
    },
    //表单操作
    handleClick() {},
    godetail(processNo, status) {
      var text = "";
      switch (status) {
        case "U":
          text = "审核中";
          break;
        case "R":
          text = "申请拒绝";
          break;
        default:
          text = "申请通过";
          break;
      }
      this.$router.push({
        path: "/details/creditDetail",
        query: {
          processNo: processNo,
          status: text
        }
      });
    },
    //初始化
    load(data) {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/hbCreditList",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            if(res.detail.result.pageList){
            this.tableData = res.detail.result.pageList;
            this.count = res.detail.result.count;
            this.searchform.pageIndex = res.detail.result.pageIndex;
            this.searchform.pageSize = res.detail.result.pageSize;
            }else{
              this.tableData =[]
             this.$notify({
                    message: '搜索失败，无此数据，请重新搜索。',
                    type: 'warning',
                    duration:"2000"//持续时间
                  });
            }
          }else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        error => {
          this.$message({
              message: '您的账号无此菜单查看权限，谢谢合作',
              type: "error"
            });
        }
      );
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
/deep/ .el-card {
  // background: rgba(255, 255, 255, 0.1);
  /deep/ .el-table tr,
  .el-table th {
    background: rgba(174, 228, 240, 0.822);
    color: rgb(116, 104, 104);
    font-family: "苹方";
  }
  /deep/ .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid #fff;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
}
.page-human {
  .human-table {
    margin-top: 20px;
  }
  .human-pagination {
    margin-top: 30px;
  }
}
</style>