import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

interface Task {
  id: number;
  type: string;
  content: string;
  assignedPerson: string;
  status: 'In Process' | 'Approved';
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BaseChartDirective,
  ],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
})
export class TaskManagerComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  displayedColumns: string[] = [
    'id',
    'type',
    'content',
    'assignedPerson',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<Task>([]);

  users = ['John Doe', 'Jane Smith', 'Alice Johnson'];
  taskTypes = ['Low Priority', 'Medium Priority', 'High Priority'];

  newTask: Task = {
    id: 1,
    type: '',
    content: '',
    assignedPerson: '',
    status: 'In Process',
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['In Process', 'Approved'],
    datasets: [{ data: [0, 0] }],
  };
  public pieChartType: ChartType = 'pie';

  ngOnInit() {
    this.updateChart();
  }

  addTask() {
    if (
      this.newTask.type &&
      this.newTask.content &&
      this.newTask.assignedPerson
    ) {
      this.dataSource.data = [...this.dataSource.data, { ...this.newTask }];
      this.newTask = {
        id: this.dataSource.data.length + 1,
        type: '',
        content: '',
        assignedPerson: '',
        status: 'In Process',
      };
      this.updateChart();
    }
  }

  approveTask(task: Task) {
    if (task.status === 'In Process') {
      task.status = 'Approved';
      this.dataSource.data = [...this.dataSource.data];
      this.updateChart();
    }
  }

  updateChart() {
    const inProcess = this.dataSource.data.filter(
      (task) => task.status === 'In Process'
    ).length;
    const approved = this.dataSource.data.filter(
      (task) => task.status === 'Approved'
    ).length;
    this.pieChartData.datasets[0].data = [inProcess, approved];
    this.chart?.update();
  }
}
