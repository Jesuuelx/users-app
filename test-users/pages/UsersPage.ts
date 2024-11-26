import { Page, expect } from '@playwright/test';

export class UsersPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:4200/');
  }

  async waitForUserList() {
    await this.page.locator('h1', { hasText: 'List of users' }).waitFor({
      state: 'visible',
      timeout: 2000,
    });
  }

  async clickUserCardButton(userName: string, buttonIndex: number) {
    await this.page
      .locator('mat-card')
      .filter({ hasText: userName })
      .getByRole('button')
      .nth(buttonIndex)
      .click();
  }

  async verifyUserDetails(email: string, favoriteContact: string) {
    await expect(this.page.getByText(`Email: ${email}`)).toBeVisible();
    await expect(
      this.page.locator('mat-card-content').getByText('Cellphone:')
    ).toBeVisible();
    await expect(
      this.page.getByText(`Favorite Contacts: ${favoriteContact}`)
    ).toBeVisible();
  }

  async verifyLastMessagesSectionVisible() {
    await expect(
      this.page.getByRole('heading', { name: 'Last Messages' })
    ).toBeVisible();
  }

  async verifyUserImageVisible(userName: string) {
    await expect(this.page.getByRole('img', { name: userName })).toBeVisible();
  }

  async goBack() {
    await this.page.getByRole('button', { name: 'Back' }).click();
  }

  async openMenu() {
    await this.page
      .locator('mat-sidenav-content button')
      .filter({ hasText: 'menu' })
      .click();
  }

  async searchUser(userName: string) {
    await this.page.getByText('search Search User').click();
    await this.page
      .getByRole('combobox', { name: 'Search of Users' })
      .fill(userName);
    await this.page.getByRole('option', { name: userName }).click();
  }

  async verifyUserSearchResult(userName: string) {
    await expect(this.page.getByText(userName, { exact: true })).toBeVisible();
  }

  async verifyMessageDetail(message: string, contactName: string) {
    await expect(
      this.page
        .locator('p')
        .filter({ hasText: message })
        .getByRole('strong')
        .nth(1)
    ).toBeVisible();
    await expect(
      this.page.locator('span').filter({ hasText: contactName }).nth(1)
    ).toBeVisible();
  }
}
