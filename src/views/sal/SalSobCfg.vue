<template>
  <div>
    <el-table
        :data="emps"
        border
        stripe>
      <el-table-column
          type="selection"
          align="left"
          width="50">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          align="left"
          fixed
          width="120">
      </el-table-column>
      <el-table-column
          prop="workID"
          label="工号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          align="left"
          width="200">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话号码"
          align="left"
          width="140">
      </el-table-column>
      <el-table-column
          prop="department.name"
          label="所属部门"
          align="center"
          width="200">
      </el-table-column>
      <el-table-column
          label="工资账套"
          align="center">
        <template slot-scope="scope">
          <el-tooltip placement="right" v-if="scope.row.salary">
            <div slot="content">
              <table>
                <tr>
                  <td>基本工资</td>
                  <td>{{scope.row.salary.basicSalary}}</td>
                </tr>
                <tr>
                  <td>交通补助</td>
                  <td>{{scope.row.salary.trafficSalary}}</td>
                </tr>
                <tr>
                  <td>午餐补助</td>
                  <td>{{scope.row.salary.lunchSalary}}</td>
                </tr>
                <tr>
                  <td>奖金</td>
                  <td>{{scope.row.salary.bonus}}</td>
                </tr>
                <tr>
                  <td>养老金比率</td>
                  <td>{{scope.row.salary.pensionPer}}</td>
                </tr>
                <tr>
                  <td>养老金基数</td>
                  <td>{{scope.row.salary.pensionBase}}</td>
                </tr>
                <tr>
                  <td>医疗保险比率</td>
                  <td>{{scope.row.salary.medicalPer}}</td>
                </tr>
                <tr>
                  <td>医疗保险基数</td>
                  <td>{{scope.row.salary.medicalBase}}</td>
                </tr>
                <tr>
                  <td>公积金比率</td>
                  <td>{{scope.row.salary.accumulationFundPer}}</td>
                </tr>
                <tr>
                  <td>公积金基数</td>
                  <td>{{scope.row.salary.accumulationFundBase}}</td>
                </tr>
              </table>
            </div>
            <el-tag type="success">{{scope.row.salary.name}}</el-tag>
          </el-tooltip>
          <el-tag type="success" v-else >暂未设置</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          align="center">
        <template slot-scope="scope">
          <el-popover
              placement="left"
              title="修改工资账套"
              width="200"
              @show="showPopover(scope.row.salary)"
              @hide="hidePopover(scope.row)"
              trigger="click">
            <el-button slot="reference" type="danger" >修改工资账套</el-button>
            <el-select v-model="currensalary" placeholder="请选择" size="mini">
            </el-select>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="salary-pagination">
      <el-pagination
          background
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "salSobCfg",
  data(){
    return{
      emps: [],
      currentPage: 1,
      size: 10,
      total: 0,
      salaries:[],
      currensalary: null,
    }
  },
  created(){
    this.initEmps();
    this.initSalaries();
  },
  methods: {
    hidePopover(data){
      if(this.currensalary&&(data.salary == null || data.salary.id != this.currensalary)){
        this.putRequest('/api/salary/sobcfg/?eid='+data.id+'&sid='+this.currensalary).then(res =>{
          if(res){
            this.initEmps();
          }
        })
      }

    },
    showPopover(data){
      if(data){
        this.currensalary = data.id;
      }else{
        this.currensalary = null;
      }
    },
    initSalaries(){
      this.getRequest('/api/salary/sobcfg/salaries').then( res=> {
        this.salaries = res;
      });
    },
    sizeChange(size) {
      this.size = size
      this.initEmps()
    },
    currentChange(currentPage) {
      this.currentPage = currentPage
      this.initEmps()
    },
    initEmps(){
      this.getRequest('/api/salary/sobcfg/?currentPage='+this.currentPage+ '&size='+this.size).then(res=>{
        this.emps = res.data;
        this.total = res.total;
      })
    }
  }
}
</script>

<style>
.salary-pagination{
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
</style>