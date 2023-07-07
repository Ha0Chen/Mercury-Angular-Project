import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit{
  constructor(
    public auth:AuthService
  ) {
  }

  ngOnInit(): void {
  }
}
