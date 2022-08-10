<template>

  <div>
    <div style = "display: flex;justify-content: space-between">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddSalaryView()">添加工资账套</el-button>
      <el-button type="success" size="mini" icon="el-icon-refresh" @click="initSalaries()"></el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table
          :data="salaries"
          border
          stripe>
        <el-table-column
            type="selection"
            width="50">
        </el-table-column>
        <el-table-column
            prop="name"
            label="账套名称"
            width="130">
        </el-table-column>
        <el-table-column
            prop="basicSalary"
            label="基本工资"
            width="100">
        </el-table-column>
        <el-table-column
            prop="trafficSalary"
            label="交通补助"
            width="100">
        </el-table-column>
        <el-table-column
            prop="lunchSalary"
            label="午餐补助"
            width="100">
        </el-table-column>
        <el-table-column
            prop="bonus"
            label="奖金"
            width="100">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="启用时间"
            width="130">
        </el-table-column>
        <el-table-column
            label="养老金"
            align="center">
          <el-table-column
              prop="pensionPer"
              label="比率"
              width="90">
          </el-table-column>
          <el-table-column
              prop="pensionBase"
              label="基数"
              width="90">
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="医疗保险"
            align="center">
          <el-table-column
              prop="medicalPer"
              label="比率"
              width="90">
          </el-table-column>
          <el-table-column
              prop="medicalBase"
              label="基数"
              width="90">
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="公积金"
            align="center">
          <el-table-column
              prop="accumulationFundPer"
              label="比率"
              width="90">
          </el-table-column>
          <el-table-column
              prop="accumulationFundBase"
              label="基数"
              width="90">
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scoped">
            <el-button type="primary" size="mini" @click="showEditSalary(scoped.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteSalary(scoped.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        :title="salaryTitle"
        :visible.sync="dialogVisible"
        width="40%">
      <div style="display: flex;justify-content: space-around; align-items: center">
        <el-steps direction="vertical" :active="activeIndex">
          <el-step :title="item" v-for="(item,index) in salariesTitle" :key="index"></el-step>
        </el-steps>
        <el-input v-for="(value,title,index) in salary" :key="index" v-model="salary[title]"
                  :placeholder="'请输入'+salariesTitle[index]+'...'" v-show="activeIndex==index" style="width: 250px"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="preStep">{{activeIndex == 10 ?'取 消': '上一步'}}</el-button>
          <el-button type="primary" @click="nextStep">{{activeIndex == 10 ? '确 定': '下一步'}}</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "salSob",
  data(){
    return{
      salaryTitle: '',
      salaries: [],
      dialogVisible: false,
      salariesTitle:[
        '账套名称',
        '基本工资',
        '交通补助',
        '午餐补助',
        '奖金',
        '养老金比率',
        '养老金基数',
        '医疗保险比率',
        '医疗保险基数',
        '公积金比率',
        '公积金基数',
      ],
      activeIndex: 0,
      salary: {
        name: '',
        basicSalary: 0,
        trafficSalary: 0,
        lunchSalary: 0,
        bonus: 0,
        pensionPer: 0,
        pensionBase: 0,
        medicalPer: 0,
        medicalBase: 0,
        accumulationFundPer: 0,
        accumulationFundBase: 0,
      }
    }
  },
  created(){
    this.initSalaries();
  },
  methods:{
    showEditSalary(data){
      this.salaryTitle = "编辑工资账套";
      this.salary.id  = data.id;
      this.salary.name  = data.name;
      this.salary.basicSalary  = data.basicSalary;
      this.salary.trafficSalary  = data.trafficSalary;
      this.salary.lunchSalary  = data.lunchSalary;
      this.salary.bonus  = data.bonus;
      this.salary.pensionPer  = data.pensionPer;
      this.salary.pensionBase  = data.pensionBase;
      this.salary.medicalPer  = data.medicalPer;
      this.salary.medicalBase  = data.medicalBase;
      this.salary.accumulationFundPer  = data.accumulationFundPer;
      this.salary.accumulationFundBase  = data.accumulationFundBase;
      this.activeIndex = 0;
      this.dialogVisible = true;
    },
    deleteSalary(data){
      this.$confirm(
          "此操作将永久删除该[" + data.name + "], 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
      )
          .then(() => {
            this.deleteRequest("/api/salary/sob/"+data.id).then(res => {
              if(res){
                this.initSalaries();
              }
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },
    preStep(){
      if(this.activeIndex == 0){
        return;
      }else if(this.activeIndex == 10){
        this.dialogVisible = false;
        return;
      }
      this.activeIndex--;
    },
    nextStep(){
      if(this.activeIndex == 10){
        if(this.salary.id){
          this.putRequest('/api/salary/sob/',this.salary).then(res => {
            if(res){
              this.initSalaries();
              this.dialogVisible = false;
            }
          })
          return;
        }else{
          this.postRequest('/api/salary/sob/',this.salary).then(res => {
            if(res){
              this.initSalaries();
              this.dialogVisible = false;

            }
          })

          return;
        }
      }
      this.activeIndex++;
    },
    showAddSalaryView(){
      this.salary = {
        name: '',
        basicSalary: 0,
        trafficSalary: 0,
        lunchSalary: 0,
        bonus: 0,
        pensionPer: 0,
        pensionBase: 0,
        medicalPer: 0,
        medicalBase: 0,
        accumulationFundPer: 0,
        accumulationFundBase: 0,
      }
      this.salaryTitle = '添加工资账套';
      this.activeIndex = 0;
      this.dialogVisible = true;
    },
    initSalaries(){
      this.getRequest('/api/salary/sob/').then(res => {
        if(res){
          this.salaries = res;
        }
      })
    }
  }
}
</script>

<style>

</style>