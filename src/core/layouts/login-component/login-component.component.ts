import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { HeroComponent } from '../../../features/hero/hero.component';
import { RouterOutlet } from "../../../../node_modules/@angular/router/types/_router_module-chunk";

@Component({
  selector: 'app-login-component',
  imports: [RouterOutlet],
  templateUrl: './login-component.component.html',
})
export class LoginComponentComponent {}
