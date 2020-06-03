import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BusinessCategoryComponentsPage, BusinessCategoryDeleteDialog, BusinessCategoryUpdatePage } from './business-category.page-object';

const expect = chai.expect;

describe('BusinessCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let businessCategoryComponentsPage: BusinessCategoryComponentsPage;
  let businessCategoryUpdatePage: BusinessCategoryUpdatePage;
  let businessCategoryDeleteDialog: BusinessCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BusinessCategories', async () => {
    await navBarPage.goToEntity('business-category');
    businessCategoryComponentsPage = new BusinessCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(businessCategoryComponentsPage.title), 5000);
    expect(await businessCategoryComponentsPage.getTitle()).to.eq('blogApp.businessCategory.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(businessCategoryComponentsPage.entities), ec.visibilityOf(businessCategoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create BusinessCategory page', async () => {
    await businessCategoryComponentsPage.clickOnCreateButton();
    businessCategoryUpdatePage = new BusinessCategoryUpdatePage();
    expect(await businessCategoryUpdatePage.getPageTitle()).to.eq('blogApp.businessCategory.home.createOrEditLabel');
    await businessCategoryUpdatePage.cancel();
  });

  it('should create and save BusinessCategories', async () => {
    const nbButtonsBeforeCreate = await businessCategoryComponentsPage.countDeleteButtons();

    await businessCategoryComponentsPage.clickOnCreateButton();

    await promise.all([businessCategoryUpdatePage.setNameInput('name'), businessCategoryUpdatePage.parentCategorySelectLastOption()]);

    expect(await businessCategoryUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await businessCategoryUpdatePage.save();
    expect(await businessCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await businessCategoryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last BusinessCategory', async () => {
    const nbButtonsBeforeDelete = await businessCategoryComponentsPage.countDeleteButtons();
    await businessCategoryComponentsPage.clickOnLastDeleteButton();

    businessCategoryDeleteDialog = new BusinessCategoryDeleteDialog();
    expect(await businessCategoryDeleteDialog.getDialogTitle()).to.eq('blogApp.businessCategory.delete.question');
    await businessCategoryDeleteDialog.clickOnConfirmButton();

    expect(await businessCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
