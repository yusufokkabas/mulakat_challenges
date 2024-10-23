import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

interface Tree {
  Tree_ID: number;
  Sci_Name: string;
  Cmn_Name: string;
  Condition: string;
  Height: number;
  Leaf_Area: number;
}

interface QueryCriteria {
  Sci_Name: string;
  Cmn_Name: string;
  Condition: string;
  HeightRange: [number, number];
  LeafAreaRange: [number, number];
}

@Component({
  selector: 'app-query-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './query-panel.component.html',
  styleUrls: ['./query-panel.component.css'],
})
export class QueryPanelComponent {
  dataSource: MatTableDataSource<Tree>;
  displayedColumns: string[] = [
    'Tree_ID',
    'Sci_Name',
    'Cmn_Name',
    'Condition',
    'Height',
    'Leaf_Area',
  ];

  criteria: QueryCriteria = {
    Sci_Name: '',
    Cmn_Name: '',
    Condition: '',
    HeightRange: [0, 1000],
    LeafAreaRange: [0, 10000],
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource<Tree>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters() {
    const whereClause = this.buildWhereClause();
    this.fetchFilteredData(whereClause);
  }

  buildWhereClause(): string {
    const conditions: string[] = [];

    if (this.criteria.Sci_Name) {
      conditions.push(`Sci_Name LIKE '%${this.criteria.Sci_Name}%'`);
    }
    if (this.criteria.Cmn_Name) {
      conditions.push(`Cmn_Name LIKE '%${this.criteria.Cmn_Name}%'`);
    }
    if (this.criteria.Condition) {
      conditions.push(`Condition LIKE '%${this.criteria.Condition}%'`);
    }
    conditions.push(
      `Height BETWEEN ${
        this.criteria.HeightRange[0] ? this.criteria.HeightRange[0] : 0
      } AND ${
        this.criteria.HeightRange[1] ? this.criteria.HeightRange[1] : 1000
      }`
    );
    conditions.push(
      `Leaf_Area BETWEEN ${
        this.criteria.LeafAreaRange[0] ? this.criteria.LeafAreaRange[0] : 0
      } AND ${
        this.criteria.LeafAreaRange[1] ? this.criteria.LeafAreaRange[1] : 10000
      }`
    );

    return conditions.join(' AND ');
  }

  async fetchFilteredData(whereClause: string) {
    const params = new URLSearchParams({
      where: whereClause,
      outFields: this.displayedColumns.join(','),
      returnGeometry: 'false',
      f: 'json',
    });

    const url = `https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Landscape_Trees/FeatureServer/0/query?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const trees: Tree[] = data.features.map(
        (feature: any) => feature.attributes
      );
      this.dataSource.data = trees;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
