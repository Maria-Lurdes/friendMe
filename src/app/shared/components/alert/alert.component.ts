import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit , OnDestroy{
  aSub: Subscription
  constructor(private alertService: AlertService,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.aSub =  this.alertService.alert$.subscribe(alert => {
      this._snackBar.open(alert.text, '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: alert.type
      });
    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}
