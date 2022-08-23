import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FilterPipe } from "./filter.pipe";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [HttpClientModule, MatIconModule],
  exports: [
    HttpClientModule,
    FilterPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  declarations: [FilterPipe],
  providers: [FilterPipe],
})
export class SharedModule {}
