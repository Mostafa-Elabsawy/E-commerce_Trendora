import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-kpi',
  imports: [CommonModule],
  templateUrl: './kpi.component.html',
  styleUrl: './kpi.component.css',
})
export class KpiComponent {
  icon = input.required<string>();
  label = input.required<string>();
  value = input.required<string | number>();
  cardClick = output<void>();
}
