import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  device:Device

  constructor(private rute: ActivatedRoute) { }

  ngOnInit(): void {
    this.device = JSON.parse(this.rute.snapshot.params.device);
  }

}
