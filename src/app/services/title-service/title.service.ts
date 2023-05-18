import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private title: Title) {}

  public favIcon: any = document.getElementById('appIcon');

  public changeTitle(newTitle: string, localPath?: string): number {
    this.title.setTitle('| ' + this.capitalizeTitle(newTitle));
    if (localPath) {
      this.favIcon.href = `../../../assets/${localPath}`;
      return 0;
    }
    return 1;
  }

  public changeFaviconUrl(url: string | null): number {
    if (this.favIcon && url) {
      this.favIcon.href = url;
      return 0;
    } else if (this.favIcon) {
      this.favIcon.href =
        'https://i.pinimg.com/474x/59/50/b4/5950b4d9b80e08a8efe51c80cf28845d.jpg';
      return 1;
    }
    return 2;
  }

  public capitalizeTitle(text: string): string {
    return text
      .split(' ')
      .map((word: string) => {
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
      })
      .join(' ');
  }
}
