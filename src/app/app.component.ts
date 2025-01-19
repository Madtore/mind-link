import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatBotComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-chat-bot />
    <app-footer />
  `
})
export class AppComponent {}