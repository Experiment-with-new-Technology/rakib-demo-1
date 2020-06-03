import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AppStatusComponentsPage, AppStatusDeleteDialog, AppStatusUpdatePage } from './app-status.page-object';

const expect = chai.expect;

describe('AppStatus e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appStatusComponentsPage: AppStatusComponentsPage;
  let appStatusUpdatePage: AppStatusUpdatePage;
  let appStatusDeleteDialog: AppStatusDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AppStatuses', async () => {
    await navBarPage.goToEntity('app-status');
    appStatusComponentsPage = new AppStatusComponentsPage();
    await browser.wait(ec.visibilityOf(appStatusComponentsPage.title), 5000);
    expect(await appStatusComponentsPage.getTitle()).to.eq('blogApp.appStatus.home.title');
    await browser.wait(ec.or(ec.visibilityOf(appStatusComponentsPage.entities), ec.visibilityOf(appStatusComponentsPage.noResult)), 1000);
  });

  it('should load create AppStatus page', async () => {
    await appStatusComponentsPage.clickOnCreateButton();
    appStatusUpdatePage = new AppStatusUpdatePage();
    expect(await appStatusUpdatePage.getPageTitle()).to.eq('blogApp.appStatus.home.createOrEditLabel');
    await appStatusUpdatePage.cancel();
  });

  it('should create and save AppStatuses', async () => {
    const nbButtonsBeforeCreate = await appStatusComponentsPage.countDeleteButtons();

    await appStatusComponentsPage.clickOnCreateButton();

    await promise.all([appStatusUpdatePage.setStatusInput('status')]);

    expect(await appStatusUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');

    await appStatusUpdatePage.save();
    expect(await appStatusUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await appStatusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AppStatus', async () => {
    const nbButtonsBeforeDelete = await appStatusComponentsPage.countDeleteButtons();
    await appStatusComponentsPage.clickOnLastDeleteButton();

    appStatusDeleteDialog = new AppStatusDeleteDialog();
    expect(await appStatusDeleteDialog.getDialogTitle()).to.eq('blogApp.appStatus.delete.question');
    await appStatusDeleteDialog.clickOnConfirmButton();

    expect(await appStatusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
