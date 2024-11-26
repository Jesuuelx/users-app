import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:4200/');
  }

  async verifyTitleContains(substring: string) {
    await expect(this.page).toHaveTitle(new RegExp(substring));
  }
}
