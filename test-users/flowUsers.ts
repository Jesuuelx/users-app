import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { UsersPage } from './pages/UsersPage';

test.describe('Users Application Tests', () => {
  test('has title', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.verifyTitleContains('UsersApp');
  });

  test('test user interactions', async ({ page }) => {
    const usersPage = new UsersPage(page);

    // Navigate to users page and verify list is visible
    await usersPage.goto();
    await usersPage.waitForUserList();

    // Interact with Batman's card
    await usersPage.clickUserCardButton('BatmanEmail: BruceWayne@', 1);
    await usersPage.verifyUserDetails('BruceWayne@google.com', 'Bruce Wayne');
    await usersPage.verifyLastMessagesSectionVisible();
    await usersPage.verifyUserImageVisible('Batman');
    await usersPage.goBack();

    // Open menu and search for a user
    await usersPage.openMenu();
    await usersPage.searchUser('bat');
    await usersPage.verifyUserSearchResult('Batman');
    await usersPage.goBack();

    // Interact with Black Canary's card
    await usersPage.clickUserCardButton('Black CanaryEmail: DinahDrake', 1);
    await usersPage.goBack();

    // Verify message details
    await usersPage.verifyMessageDetail(
      'Last message Flash Comics #86',
      'Dinah Drake'
    );
    await usersPage.verifyMessageDetail(
      'Last message Flash Comics #86',
      'Dinah Lance'
    );
  });
});
