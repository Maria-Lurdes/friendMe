import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FilterPipe } from "./filter.pipe";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

const modules = [MatButtonModule, MatCardModule, MatIconModule];

@NgModule({
  imports: [HttpClientModule, ...modules],
  exports: [HttpClientModule, FilterPipe, ...modules],
  declarations: [FilterPipe],
  providers: [FilterPipe],
})
export class SharedModule {}
