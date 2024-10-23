import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SpatialReference from '@arcgis/core/geometry/SpatialReference'; // bu kütüphane haritaya SpatialReference interface'ini import etmek için kullanılmıştır.
import { watch } from '@arcgis/core/core/reactiveUtils'; //bu kütüphane feature layer'ın selectedIndex ve pop-up'ın visible değişkenlerini dinlemek için kullanılmıştır.

@Component({
  selector: 'app-map-application',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './map-application.component.html',
  styleUrls: ['./map-application.component.css'],
})
export class MapApplicationComponent implements OnInit, AfterViewInit {
  @ViewChild('viewDiv', { static: true }) private viewDiv!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Tree_ID',
    'Cmn_Name',
    'Sci_Name',
    'Height',
    'GroundArea',
    'Leaf_Area',
    'C_Storage',
    'Crown_Base',
    'Latitude',
    'Longitude',
  ];
  selectedTreeId: number | null = null;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  async ngOnInit() {
    //OnInit fonksiyonunda haritayı ve featureLayer'ı initialize eder.
    try {
      const map = new Map({
        basemap: 'hybrid',
      });

      const view = new MapView({
        container: this.viewDiv.nativeElement,
        map: map,
        extent: {
          xmin: -9177811,
          ymin: 4247000,
          xmax: -9176791,
          ymax: 4247784,
          spatialReference: new SpatialReference({ wkid: 102100 }),
        },
        popup: {
          dockEnabled: true,
          dockOptions: {
            position: 'top-right',
            buttonEnabled: false,
            breakpoint: false,
          },
        },
      });
      const featureLayer = new FeatureLayer({
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0',
        outFields: ['*'],
        popupEnabled: true,
        popupTemplate: {
          title: '{Cmn_Name}',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                { fieldName: 'Tree_ID', label: 'Tree ID' },
                { fieldName: 'Cmn_Name', label: 'Common Name' },
                { fieldName: 'Sci_Name', label: 'Scientific Name' },
                { fieldName: 'Height', label: 'Height' },
                { fieldName: 'Condition', label: 'Condition' },
              ],
            },
            {
              type: 'text',
              text: '{Sci_Name}, popularly known as {Cmn_Name}, is {Height} metres high. It is currently in {Condition} condition.',
            },
          ],
        },
      });

      map.add(featureLayer);
      // bu fonksiyon featureLayer'ın selectedFeatureIndex değişkenini dinleyerek pop-up içinden index değiştirildiğinde
      // veya tıklanan feature'ın id'sine göre tabloda o verinin seçili olmasını sağlar
      watch(
        () => view.popup.selectedFeatureIndex,
        (index) => {
          if (
            index !== -1 &&
            view.popup.features &&
            view.popup.features.length > index
          ) {
            this.updateTableData(view.popup.features[index]);
          }
        }
      );
      // bu fonksiyon ise pop-up kapandığında tabloda seçili olan veriyi güncelleyerek seçimini kaldırır.
      watch(
        () => view.popup.visible,
        (visible) => {
          if (!visible) {
            this.selectedTreeId = null;
          }
        }
      );

      //Uygulamadaki tabloyu doldurmak için rest servisine istek atar. Sadece tabloda görünen kolonları çeker.
      const query = featureLayer.createQuery();
      query.outFields = this.displayedColumns;
      query.where = '1=1';
      query.returnGeometry = false;

      const results = await featureLayer.queryFeatures(query);
      this.dataSource.data = results.features.map(
        (feature: any) => feature.attributes
      );
    } catch (error) {
      console.error('Error loading ArcGIS modules:', error);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Bu fonksiyon seçili olan feature'ı tabloda bularak highlight etmeyi sağlar.
  //Seçili olan feature tablonun en üstüne gelir ve CSS class'ı ile turuncuya boyanır
  updateTableData(feature: any) {
    if (feature) {
      const treeId = feature.attributes.Tree_ID;
      this.selectedTreeId = treeId;
      const data = this.dataSource.data;
      const selectedIndex = data.findIndex((item) => item.Tree_ID === treeId);
      if (selectedIndex > -1) {
        const selectedItem = data.splice(selectedIndex, 1)[0];
        data.unshift(selectedItem); // seçili feature'ı array'in en üstüne çıkartır.
        this.dataSource.data = [...data]; // Angular change detection'ı tetiklemek için datayı update eder.
      }
    }
  }
}
