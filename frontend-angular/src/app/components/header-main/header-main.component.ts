import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-main',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.css'
})
export class HeaderMainComponent {
  @Input() dataSelect!: any;
  @Input() seriesActivate!: boolean;
}
